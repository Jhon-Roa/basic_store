package com.basicstore.backend.compraproducto.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompraProductoPK {
    private Long productoId;
    private Long compraId;
}
