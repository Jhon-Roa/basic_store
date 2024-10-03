package com.basicstore.backend.compra.application.service;

import java.util.List;
import java.util.Optional;

import com.basicstore.backend.compra.domain.entity.Compra;

public interface CompraService {
    Optional<Compra> findById(Long id);

    List<Compra> findAll();

    Compra save(Compra compra);

    Optional<Compra> update(Long id, Compra compra);

    Optional<Compra> delete(Long id);
}
