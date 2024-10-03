package com.basicstore.backend.producto.infrastructure.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basicstore.backend.producto.application.service.ProductoService;
import com.basicstore.backend.producto.domain.entity.Producto;

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
@RequestMapping("api/producto")
public class ProductoController {
    @Autowired
    ProductoService productoService;
    
    @GetMapping()
    public List<Producto> getAll() {
        return productoService.findAll();
    }
        
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<Producto> producto = productoService.findById(id);
        if (producto.isPresent()) {
            return ResponseEntity.ok(producto.orElseThrow());
        } 
        return ResponseEntity.notFound().build();
    }

    @PostMapping()
    public ResponseEntity<?> save(@RequestBody Producto producto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productoService.save(producto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Producto producto) {
        Optional<Producto> productoUpdate = productoService.update(id, producto);
        if (productoUpdate.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(productoUpdate.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Producto> productoDelete = productoService.delete(id);
        if (productoDelete.isPresent()) {
            return ResponseEntity.ok(productoDelete.orElseThrow());
        } 
        return ResponseEntity.notFound().build();
    }
}