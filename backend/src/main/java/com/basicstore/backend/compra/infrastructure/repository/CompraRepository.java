package com.basicstore.backend.compra.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.basicstore.backend.compra.domain.entity.Compra;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Long> {

}
