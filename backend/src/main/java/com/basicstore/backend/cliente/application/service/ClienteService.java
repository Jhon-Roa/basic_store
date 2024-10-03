package com.basicstore.backend.cliente.application.service;

import java.util.List;
import java.util.Optional;

import com.basicstore.backend.cliente.domain.entity.Cliente;

public interface ClienteService {
    Optional<Cliente> findById(String id);

    List<Cliente> findAll();

    Cliente save(Cliente cliente);

    Optional<Cliente> update(String id, Cliente cliente);

    Optional<Cliente> delete(String id);
}
