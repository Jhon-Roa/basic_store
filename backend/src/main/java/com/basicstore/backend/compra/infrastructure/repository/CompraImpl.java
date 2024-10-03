package com.basicstore.backend.compra.infrastructure.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basicstore.backend.compra.application.service.CompraService;
import com.basicstore.backend.compra.domain.entity.Compra;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CompraImpl implements CompraService{
    @Autowired
    private CompraRepository compraRepository;

    @Transactional(readOnly = true)
    @Override
    public Optional<Compra> findById(Long id) {
        return compraRepository.findById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public List<Compra> findAll() {
        return compraRepository.findAll();
    }

    @Transactional
    @Override
    public Compra save(Compra compra) {
        return compraRepository.save(compra);
    }

    @Transactional
    @Override
    public Optional<Compra> update(Long id, Compra compra) {
        Optional<Compra> compraOld = compraRepository.findById(id);
        if (compraOld.isPresent()) {
            Compra compraDb = compraOld.orElseThrow(() -> new EntityNotFoundException("Compra con " + id + "no encontrada"));
            BeanUtils.copyProperties(compra, compraDb, "compraId");
            return Optional.of(compraRepository.save(compraDb));
        }
        return Optional.empty();
    }

    @Transactional
    @Override
    public Optional<Compra> delete(Long id) {
        Optional<Compra> compra = compraRepository.findById(id);
        compra.ifPresent(compraDb -> {
            compraRepository.delete(compraDb);
        });
        return compra;
    }    
}
