import { useState, useEffect } from "react";
import { compra } from "@/types/compra";
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
import { CompraFactura } from "./compraFactura";

export function TableCompra() {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const [compras, setCompras] = useState([]);

    const fetchCompras = async() => {
        try {
            const response = await axios.get(apiUrl + "/compra");
            setCompras(response.data)
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }
    useEffect(() => {
        fetchCompras();
    }, []);

    const mostrarCompras = () => {
        return compras.map((compra : compra) => (
            <TableRow key={compra.compraId}>
                <TableCell className="hidden xl:table-cell">{compra.compraId}</TableCell>
                <TableCell className="hidden lg:table-cell">{compra.fecha}</TableCell>
                <TableCell className="hidden md:table-cell">{compra.compraStatus}</TableCell>
                <TableCell>{compra.compraMedioPago}</TableCell>
                <TableCell>{compra.cliente.clienteId}</TableCell>
                <TableCell><CompraFactura compra={compra}></CompraFactura></TableCell>
                <TableCell><Button onClick={() => deleteAlert((compra.compraId? compra.compraId : 0), eliminarCompra)} className="w-full"><i className='bx bxs-trash-alt'/></Button></TableCell>
            </TableRow>
        ))
    }

    const eliminarCompra = async (compraId : string | number) => {
        try {
            const response = await axios.delete(apiUrl + "/compra/" + compraId)
            console.log(response.data)
            fetchCompras();
        } catch (error) {
            console.error("Error deleting data", error);
        }
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden xl:table-cell">IdCompra</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="hidden lg:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">MedioPago</TableHead>
            <TableHead>ClienteId</TableHead>
            <TableHead>Factura</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mostrarCompras()}
        </TableBody>
      </Table>
    )
  }

export default TableCompra;