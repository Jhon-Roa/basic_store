import { cliente } from "./cliente"

export type compra = {
    compraId?: number,
    fecha?: string,
    compraStatus: string,
    compraMedioPago: string,
    cliente: cliente
}