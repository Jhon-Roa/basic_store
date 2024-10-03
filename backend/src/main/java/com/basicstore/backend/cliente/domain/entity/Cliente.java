package com.basicstore.backend.cliente.domain.entity;

import java.util.List;

import com.basicstore.backend.compra.domain.entity.Compra;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {
    @Id
    @Column(name = "cliente_id", length = 20)
    private String clienteId;

    @Column(length = 40)
    private String nombre;

    @Column(length = 40)
    private String apellido;

    @Column(length = 10)
    private String celular;

    @Column(length = 80)
    private String direccion;

    @Column(length = 70)
    private String email;

    @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Compra> compras;
}
