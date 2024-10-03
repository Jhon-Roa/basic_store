package com.basicstore.backend.categoria.application.service;

import java.util.List;
import java.util.Optional;

import com.basicstore.backend.categoria.domain.entity.Categoria;

public interface CategoriaService {
    Optional<Categoria> findById(Long id);

    List<Categoria> findAll();

    Categoria save(Categoria categoria);

    Optional<Categoria> update(Long id, Categoria categoria);

    Optional<Categoria> delete(Long id);
}
