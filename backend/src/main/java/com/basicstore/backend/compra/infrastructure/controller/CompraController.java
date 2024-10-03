package com.basicstore.backend.compra.infrastructure.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basicstore.backend.compra.application.service.CompraService;
import com.basicstore.backend.compra.domain.entity.Compra;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("api/compra")
public class CompraController {
    @Autowired
    private CompraService compraService;
    
    @GetMapping()
    public List<Compra> getAll() {
        return compraService.findAll();
    }
        
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<Compra> compra = compraService.findById(id);
        if (compra.isPresent()) {
            return ResponseEntity.ok(compra.orElseThrow());
        } 
        return ResponseEntity.notFound().build();
    }

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Compra compra) {
        return ResponseEntity.status(HttpStatus.CREATED).body(compraService.save(compra));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Compra compra) {
        Optional<Compra> compraUpdate = compraService.update(id, compra);
        if (compraUpdate.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(compraUpdate.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Compra> compraDelete = compraService.delete(id);
        if (compraDelete.isPresent()) {
            return ResponseEntity.ok(compraDelete.orElseThrow());
        } 
        return ResponseEntity.notFound().build();
    }
}