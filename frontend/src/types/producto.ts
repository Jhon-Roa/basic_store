import { categoria } from "./categoria"

export type producto = {
    productoId: number,
    nombre: string,
    categoria: categoria,
    codigoBarras: string,
    precioVenta: number,
    stock: number
}