// CompraProducto.java
package com.basicstore.backend.compraproducto.domain.entity;

import java.math.BigDecimal;

import com.basicstore.backend.compra.domain.entity.Compra;
import com.basicstore.backend.producto.domain.entity.Producto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "compras_productos")
@IdClass(CompraProductoPK.class)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompraProducto {
    
    @Id
    @ManyToOne
    @JoinColumn(name = "producto_id")
    private Producto producto;

    @Id
    @ManyToOne
    @JoinColumn(name = "compra_id")
    private Compra compra;

    @Column(nullable = false)
    private Long cantidad;

    @Column(scale = 2, precision = 16, nullable = false)
    private BigDecimal total;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false)
    private CompraProductoStatus compraProductoStatus = CompraProductoStatus.PENDIENTE;
}
