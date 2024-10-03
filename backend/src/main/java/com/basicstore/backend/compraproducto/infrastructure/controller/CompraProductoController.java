package com.basicstore.backend.compraproducto.infrastructure.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basicstore.backend.compraproducto.application.service.CompraProductoService;
import com.basicstore.backend.compraproducto.domain.entity.CompraProducto;
import com.basicstore.backend.compraproducto.domain.entity.CompraProductoPK;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/compraproducto")
public class CompraProductoController {
    @Autowired
    private CompraProductoService compraProductoService;

    @GetMapping("/{idCompra}")
    public List<CompraProducto> getByCompraId(@PathVariable Long idCompra) {
        return compraProductoService.findByCompraId(idCompra);
    }

    @PostMapping    
    public ResponseEntity<?> save(@RequestBody CompraProducto compraProducto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(compraProductoService.save(compraProducto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> putMethodName(@PathVariable CompraProductoPK id, @RequestBody CompraProducto compraProducto) {
        Optional<CompraProducto> compraProductoUpdate = compraProductoService.update(id, compraProducto);
        if (compraProductoUpdate.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(compraProductoUpdate.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    
}
