'use client'

import { Button } from "@/components/ui/button"
import { compra } from "@/types/compra"
import { compraProducto } from "@/types/compraProducto"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import axios from "axios"

export function CompraFactura({ compra }: { compra: compra }) {
  const apiUrl = import.meta.env.VITE_API_URL

  const [comprasProductos, setComprasProductos] = useState<compraProducto[]>([])
  const [isActive, setIsActive] = useState(false)

  const fetchComprasProductos = async () => {
    try {
      const response = await axios.get<compraProducto[]>(`${apiUrl}/compraproducto/${compra.compraId}`)
      setComprasProductos(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isActive) {
      fetchComprasProductos()
    }
  }, [isActive])

  const mostrarCompraProducto = () => {
    return comprasProductos.map((compraProducto) => (
      <div key={compraProducto.compraId} className="grid grid-cols-4 items-center gap-4 border-b border-gray-300 dark:border-gray-700 py-2">
        <Label className="text-left text-gray-900 dark:text-gray-100">{compraProducto.producto.nombre}</Label>
        <label className="text-center text-gray-900 dark:text-gray-100">{compraProducto.compraProductoStatus}</label>
        <label className="text-center text-gray-900 dark:text-gray-100">{compraProducto.cantidad}</label>
        <label className="text-right text-gray-900 dark:text-gray-100">{compraProducto.total}</label>
      </div>
    ))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => setIsActive(true)} variant="outline">
          Factura
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold border-b pb-2 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700">
            Factura de la Compra
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Detalles del Cliente</h3>
            <div className="grid grid-cols-4 items-center gap-4 border-b py-2 border-gray-300 dark:border-gray-700">
              {Object.entries(compra.cliente).map(([key, value]) => (
                <div key={key} className="col-span-2 flex justify-between">
                  <Label className="font-medium text-gray-900 dark:text-gray-100">{key.charAt(0).toUpperCase() + key.slice(1)}:</Label>
                  <Label className="text-gray-900 dark:text-gray-100">{value}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Detalles de la Compra</h3>
            <div className="grid grid-cols-4 items-center gap-4 border-b py-2 border-gray-300 dark:border-gray-700">
              <Label className="text-left font-bold">Producto</Label>
              <Label className="text-center font-bold">Estado</Label>
              <Label className="text-center font-bold">Cantidad</Label>
              <Label className="text-right font-bold" >Total</Label>
            </div>
            {mostrarCompraProducto()}
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Información de Pago</h3>
            <div className="grid grid-cols-4 items-center gap-4 border-b py-2 border-gray-300 dark:border-gray-700">
              <Label className="text-right text-gray-900 dark:text-gray-100">Medio de Pago:</Label>
              <Label className="col-span-3 text-gray-900 dark:text-gray-100">{compra.compraMedioPago}</Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 border-b py-2 border-gray-300 dark:border-gray-700">
              <Label className="text-right text-gray-900 dark:text-gray-100">Estado:</Label>
              <Label className="col-span-3 text-gray-900 dark:text-gray-100">{compra.compraStatus}</Label>
            </div>
            <div className="grid grid-cols-4 items-center gap-4 border-b py-2 border-gray-300 dark:border-gray-700">
              <Label className="text-right text-gray-900 dark:text-gray-100">Fecha:</Label>
              <Label className="col-span-3 text-gray-900 dark:text-gray-100">{compra.fecha}</Label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
