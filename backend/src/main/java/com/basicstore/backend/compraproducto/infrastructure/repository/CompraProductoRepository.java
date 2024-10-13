package com.basicstore.backend.compraproducto.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.basicstore.backend.compraproducto.domain.entity.CompraProducto;
import com.basicstore.backend.compraproducto.domain.entity.CompraProductoPK;
import java.util.List;

@Repository
public interface CompraProductoRepository extends JpaRepository<CompraProducto, CompraProductoPK> {
    List<CompraProducto> findByCompraCompraId(Long compraId);
}
