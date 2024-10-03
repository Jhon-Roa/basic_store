import { useState, useEffect } from "react";
import { producto } from "@/types/producto";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { deleteAlert } from "@/functions/sweetAlerts";
import axios from "axios";

export function TableProducto() {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const [productos, setProductos] = useState([]);

    const fetchProductos = async() => {
        try {
            const response = await axios.get(apiUrl + "/producto");
            setProductos(response.data)
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }
    useEffect(() => {
        fetchProductos();
    }, []);

    const mostrarProductos = () => {
        return productos.map((producto : producto) => (
            <TableRow key={producto.productoId}>
                <TableCell className="hidden xl:table-cell">{producto.productoId}</TableCell>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell className="hidden lg:table-cell">{producto.categoria.nombre}</TableCell>
                <TableCell className="hidden md:table-cell">{producto.codigoBarras}</TableCell>
                <TableCell>{producto.precioVenta}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell><Button onClick={() => deleteAlert((producto.productoId), eliminarProducto)} className="w-full"><i className='bx bxs-trash-alt'/></Button></TableCell>
            </TableRow>
        ))
    }

    const eliminarProducto = async (productoId : number | string) => {
        try {
            const response = await axios.delete(apiUrl + "/producto/" + productoId.toString())
            console.log(response.data)
            fetchProductos();
        } catch (error) {
            console.error("Error deleting data", error);
        }
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden xl:table-cell">IdProducto</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="hidden lg:table-cell">Categoria</TableHead>
            <TableHead className="hidden md:table-cell">CodigoBarras</TableHead>
            <TableHead>PrecioVenta</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mostrarProductos()}
        </TableBody>
      </Table>
    )
  }

export default TableProducto;