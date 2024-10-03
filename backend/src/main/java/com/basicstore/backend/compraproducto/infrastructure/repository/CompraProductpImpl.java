package com.basicstore.backend.compraproducto.infrastructure.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basicstore.backend.compraproducto.application.service.CompraProductoService;
import com.basicstore.backend.compraproducto.domain.entity.CompraProducto;
import com.basicstore.backend.compraproducto.domain.entity.CompraProductoPK;
import com.basicstore.backend.producto.application.service.ProductoService;
import com.basicstore.backend.producto.domain.entity.Producto;


@Service
public class CompraProductpImpl implements CompraProductoService {
    @Autowired
    CompraProductoRepository compraProductoRepository;

    @Autowired
    ProductoService productoService;

    @Override
    @Transactional(readOnly = true)
    public List<CompraProducto> findByCompraId(Long compraId) {
        return compraProductoRepository.findByCompraId(compraId);
    }

    @Override
    @Transactional
    public CompraProducto save(CompraProducto compraProducto) {
        Producto producto = productoService.findById(compraProducto.getProductoId()).orElseThrow();
        compraProducto.setTotal(new BigDecimal(compraProducto.getCantidad()).multiply(producto.getPrecioVenta()));

        return compraProductoRepository.save(compraProducto);
    }

    @Transactional
    @Override
    public Optional<CompraProducto> update(CompraProductoPK id, CompraProducto compraProducto) {
        Optional<CompraProducto> compraProductoOld = compraProductoRepository.findById(id);
        if (compraProductoOld.isPresent()) {
            CompraProducto compraProductoDb = compraProductoOld.orElseThrow();
            BeanUtils.copyProperties(compraProducto, compraProductoDb, "compraId", "productoId");
            return Optional.of(this.save(compraProductoDb));
        }
        return Optional.empty();
    }
}
