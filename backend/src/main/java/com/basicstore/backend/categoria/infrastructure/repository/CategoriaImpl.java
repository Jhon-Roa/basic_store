package com.basicstore.backend.categoria.infrastructure.repository;

import java.util.List;
import java.util.Optional;
import jakarta.persistence.EntityNotFoundException; 

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basicstore.backend.categoria.application.service.CategoriaService;
import com.basicstore.backend.categoria.domain.entity.Categoria;


@Service
public class CategoriaImpl implements CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Transactional(readOnly = true)
    @Override
    public Optional<Categoria> findById(Long id) {
        return categoriaRepository.findById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }

    @Transactional
    @Override
    public Categoria save(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    @Transactional
    @Override
    public Optional<Categoria> update(Long id, Categoria categoria) {
        Optional<Categoria> categoriaOld = categoriaRepository.findById(id);
        if (categoriaOld.isPresent()) {
            Categoria categoriaDb = categoriaOld.orElseThrow(() -> new EntityNotFoundException("Categoria con " + id + "no encontrada"));
            BeanUtils.copyProperties(categoria, categoriaDb, "categoriaId");
            return Optional.of(categoriaRepository.save(categoriaDb));
        }
        return Optional.empty();
    }

    @Transactional
    @Override
    public Optional<Categoria> delete(Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        categoria.ifPresent(categoriaDb -> {
            categoriaRepository.delete(categoriaDb);
        });
        return categoria;
    }
    
}
