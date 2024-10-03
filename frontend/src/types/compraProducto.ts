import { producto } from "./producto";
import { compra } from "./compra";

export type compraProducto = {
    compraId: number,
    productoId: number,
    compra: compra,
    producto: producto,
    cantidad: number,
    total: number,
    compraProductoStatus: string
}