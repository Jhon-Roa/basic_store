package com.basicstore.backend.categoria.infrastructure.repository;

import com.basicstore.backend.categoria.domain.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
}

