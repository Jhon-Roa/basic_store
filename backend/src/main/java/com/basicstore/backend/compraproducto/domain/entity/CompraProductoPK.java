// CompraProductoPK.java
package com.basicstore.backend.compraproducto.domain.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompraProductoPK implements Serializable {

    private Long producto; 
    private Long compra;  
}
