import { useState, useEffect } from "react";
import { cliente } from "@/types/cliente";
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

export function TableCliente() {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const [clientes, setClientes] = useState([]);

    const fetchClientes = async() => {
        try {
            const response = await axios.get(apiUrl + "/cliente");
            setClientes(response.data)
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }
    useEffect(() => {
        fetchClientes();
    }, []);

    const mostrarClientes = () => {
        return clientes.map((cliente : cliente) => (
            <TableRow key={cliente.clienteId}>
                <TableCell className="hidden xl:table-cell">{cliente.clienteId}</TableCell>
                <TableCell>{cliente.nombre}</TableCell>
                <TableCell className="hidden lg:table-cell">{cliente.apellido}</TableCell>
                <TableCell className="hidden md:table-cell">{cliente.direccion}</TableCell>
                <TableCell>{cliente.celular}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell><Button onClick={() => deleteAlert((cliente.clienteId), eliminarCliente)} className="w-full"><i className='bx bxs-trash-alt'/></Button></TableCell>
            </TableRow>
        ))
    }

    const eliminarCliente = async (clienteId : string | number) => {
        try {
            const response = await axios.delete(apiUrl + "/cliente/" + clienteId)
            console.log(response.data)
            fetchClientes();
        } catch (error) {
            console.error("Error deleting data", error);
        }
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden xl:table-cell">IdCliente</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="hidden lg:table-cell">Apellido</TableHead>
            <TableHead className="hidden md:table-cell">Direccion</TableHead>
            <TableHead>Celular</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mostrarClientes()}
        </TableBody>
      </Table>
    )
  }

export default TableCliente;