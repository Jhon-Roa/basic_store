package com.basicstore.backend.producto.application.service;

import java.util.List;
import java.util.Optional;

import com.basicstore.backend.producto.domain.entity.Producto;

public interface ProductoService {
    Optional<Producto> findById(Long id);

    List<Producto> findAll();

    Producto save(Producto producto);

    Optional<Producto> update(Long id, Producto producto);

    Optional<Producto> delete(Long id);
}
