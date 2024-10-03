package com.basicstore.backend.categoria.infrastructure.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.basicstore.backend.categoria.application.service.CategoriaService;
import com.basicstore.backend.categoria.domain.entity.Categoria;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController()
@CrossOrigin(origins = "*")
@RequestMapping("api/categoria")
public class CategoriaController {
    @Autowired
    CategoriaService categoriaService;
    
    @GetMapping()
    public List<Categoria> getAll() {
        return categoriaService.findAll();
    }
        
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaService.findById(id);
        if (categoria.isPresent()) {
            return ResponseEntity.ok(categoria.orElseThrow());
        } 

        String notFoundImageUrl = "https://http.cat/404";
        RestTemplate restTemplate = new RestTemplate();

        byte[] imageBytes = restTemplate.getForObject(notFoundImageUrl, byte[].class);
        
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .contentType(MediaType.IMAGE_JPEG)
                .body(new ByteArrayResource(imageBytes));
    }

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Categoria categoria) {
        return ResponseEntity.status(HttpStatus.CREATED).body(categoriaService.save(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Categoria categoria) {
        Optional<Categoria> categoriaUpdate = categoriaService.update(id, categoria);
        if (categoriaUpdate.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(categoriaUpdate.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Categoria> categoriaDelete = categoriaService.delete(id);
        if (categoriaDelete.isPresent()) {
            return ResponseEntity.ok(categoriaDelete.orElseThrow());
        } 
        return ResponseEntity.notFound().build();
    }
}
