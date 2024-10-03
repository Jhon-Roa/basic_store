package com.basicstore.backend.producto.infrastructure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basicstore.backend.producto.domain.entity.Producto;
import com.basicstore.backend.producto.application.service.ProductoService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProductoImpl implements ProductoService {
    @Autowired
    private ProductoRepository productoRepository;

    @Transactional(readOnly = true)
    @Override
    public Optional<Producto> findById(Long id) {
        return productoRepository.findById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public List<Producto> findAll() {
        return productoRepository.findAll();
    }

    @Transactional
    @Override
    public Producto save(Producto producto) {
        return productoRepository.save(producto);
    }

    @Transactional
    @Override
    public Optional<Producto> update(Long id, Producto producto) {
        Optional<Producto> productoOld = productoRepository.findById(id);
        if (productoOld.isPresent()) {
            Producto productoDb = productoOld.orElseThrow(() -> new EntityNotFoundException("Producto con " + id + "no encontrada"));
            BeanUtils.copyProperties(producto, productoDb, "productoId");
            return Optional.of(productoRepository.save(productoDb));
        }
        return Optional.empty();
    }

    @Transactional
    @Override
    public Optional<Producto> delete(Long id) {
        Optional<Producto> producto = productoRepository.findById(id);
        producto.ifPresent(productoDb -> {
            productoRepository.delete(productoDb);
        });
        return producto;
    }    
}
