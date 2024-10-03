package com.basicstore.backend.compraproducto.application.service;

import java.util.List;
import java.util.Optional;

import com.basicstore.backend.compraproducto.domain.entity.CompraProducto;
import com.basicstore.backend.compraproducto.domain.entity.CompraProductoPK;

public interface CompraProductoService {
    List<CompraProducto> findByCompraId(Long compraId);

    CompraProducto save(CompraProducto compraProducto);

    Optional<CompraProducto> update(CompraProductoPK id, CompraProducto compraProducto);
}
