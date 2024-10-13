package com.basicstore.backend.compra.domain.entity;

import java.time.Instant;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.basicstore.backend.cliente.domain.entity.Cliente;
import com.basicstore.backend.compraproducto.domain.entity.CompraProducto;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Compra {
    @Id
    @Column(name = "compra_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long compraId;

    @CreationTimestamp
    private Instant fecha;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private CompraStatus compraStatus = CompraStatus.PENDIENTE;

    @Enumerated(EnumType.STRING)
    @Column(name = "medio_pago")
    private CompraMedioPago compraMedioPago;

    @ManyToOne
    private Cliente cliente;

    @JsonIgnore
    @OneToMany(mappedBy = "compra", cascade = CascadeType.ALL)
    private List<CompraProducto> comprasProductos;
}
