package com.basicstore.backend.cliente.infrastructure.repository;

import java.util.List;
import java.util.Optional;
import jakarta.persistence.EntityNotFoundException; 

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basicstore.backend.cliente.application.service.ClienteService;
import com.basicstore.backend.cliente.domain.entity.Cliente;


@Service
public class ClienteImpl implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Transactional(readOnly = true)
    @Override
    public Optional<Cliente> findById(String id) {
        return clienteRepository.findById(id);
    }

    @Transactional(readOnly = true)
    @Override
    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    @Transactional
    @Override
    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    @Transactional
    @Override
    public Optional<Cliente> update(String id, Cliente cliente) {
        Optional<Cliente> clienteOld = clienteRepository.findById(id);
        if (clienteOld.isPresent()) {
            Cliente clienteDb = clienteOld.orElseThrow(() -> new EntityNotFoundException("Cliente con " + id + "no encontrada"));
            BeanUtils.copyProperties(cliente, clienteDb, "clienteId");
            return Optional.of(clienteRepository.save(clienteDb));
        }
        return Optional.empty();
    }

    @Transactional
    @Override
    public Optional<Cliente> delete(String id) {
        Optional<Cliente> cliente = clienteRepository.findById(id);
        cliente.ifPresent(clienteDb -> {
            clienteRepository.delete(clienteDb);
        });
        return cliente;
    }
    
}
