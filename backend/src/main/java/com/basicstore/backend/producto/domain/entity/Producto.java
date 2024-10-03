package com.basicstore.backend.producto.domain.entity;

import java.math.BigDecimal;
import java.util.List;

import com.basicstore.backend.categoria.domain.entity.Categoria;
import com.basicstore.backend.compraproducto.domain.entity.CompraProducto;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "productos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "producto_id")
    private long productoId;

    @Column(length = 45)
    private String nombre;

    @ManyToOne
    private Categoria categoria;

    @JsonIgnore
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<CompraProducto> comprasProductos;

    @Column(name = "codigo_barras", unique = true, length = 150)
    private String codigoBarras;

    @Column(name = "precio_venta", precision = 16, scale = 2)
    private BigDecimal precioVenta;

    private Long stock;
}
