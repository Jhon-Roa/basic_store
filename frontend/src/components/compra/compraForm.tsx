'use client'

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { producto } from "@/types/producto";
import { cliente } from "@/types/cliente";
import { compra } from "@/types/compra";
import ClienteForm from "../cliente/clienteForm";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";

export function CompraForm() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [productos, setProductos] = useState<producto[]>([]);
  const [isClienteFormVisible, setClienteFormVisible] = useState(false);
  const [ifContinue, setContinue] = useState(false);
  const [clienteSelected, setCliente] = useState<cliente | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get<producto[]>(`${apiUrl}/producto`);
        setProductos(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProductos();
  }, [apiUrl]);

  const productoSchema = z.object({
    codigoBarras: z.string().min(1, "Debe ingresar un código de barras").refine(
      (cod) => productos.some(p => p.codigoBarras === cod),
      "El código de barras no existe en la lista de productos"
    ),
    cantidad: z.number().min(1, "Cantidad mínima 1"),
  }).refine(data => {
    const producto = productos.find(p => p.codigoBarras === data.codigoBarras);
    return producto ? producto.stock >= data.cantidad : false;
  }, {
    message: "No hay suficientes productos en stock",
    path: ["cantidad"], 
  });
  
  const formSchema = z.object({
    clienteId: z.string().min(2, "id muy corto").max(20, "id muy largo"),
    comentario: z.string().max(200, "comentario muy largo"),
    medioPago: z.string().nonempty("Seleccione un método de pago"),
    estado: z.string().nonempty("Selecciona un estado"),
    productos: z.array(productoSchema).min(1, "Debe agregar al menos un producto"),
  });
  

  type FormSchema = z.infer<typeof formSchema>;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clienteId: "",
      comentario: "",
      medioPago: "",
      estado: "",
      productos: [{ codigoBarras: "", cantidad: 1 }]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "productos",
  });

  async function onSubmit(values: FormSchema) {
    try {
      await evalCliente(values.clienteId);
      if (ifContinue && clienteSelected) {
        const compraToSend: compra = {
          compraStatus: values.estado,
          compraMedioPago: values.medioPago,
          cliente: clienteSelected
        };
        try {
          const response = await axios.post<compra>(`${apiUrl}/compra`, compraToSend);
          
          const compraProductos = values.productos.map(producto => {
            const productoEncontrado = productos.find(p => p.codigoBarras === producto.codigoBarras);
            return {
              compraId: response.data.compraId,
              productoId: productoEncontrado?.productoId,
              compra: response.data,
              producto: productoEncontrado,
              cantidad: producto.cantidad,
              compraProductoStatus: values.estado,
              total: (productoEncontrado?.precioVenta || 0) * producto.cantidad
            };
          });

          compraProductos.forEach(async compraProducto => {
            const responseCompraProducto = await axios.post(apiUrl + "/compraproducto", compraProducto)
            console.log(responseCompraProducto.data) 
          })
          console.log(compraProductos);

          form.reset();
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function evalCliente(clienteId: string) {
    try {
      const response = await axios.get<cliente>(`${apiUrl}/cliente/${clienteId}`);
      setContinue(true);
      setCliente(response.data);
    } catch (error) {
      setClienteFormVisible(true);
    }
  }

  function clienteFormOnSuccess() {
    setClienteFormVisible(false);
    setContinue(true);
  }

  function handleCloseClick() {
    setClienteFormVisible(false);
    setContinue(false);
  }

  function handleAddProducto() {
    append({ codigoBarras: "", cantidad: 1 });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-10/12 lg:w-1/3 space-y-4">
          <FormField
            control={form.control}
            name="clienteId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documento</FormLabel>
                <FormControl>
                  <Input placeholder="1.102.469.789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comentario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentario</FormLabel>
                <FormControl>
                  <Textarea placeholder="añada su comentario aquí..." rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="medioPago"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Medio de pago</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un método de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Medios de pago</SelectLabel>
                        <SelectItem value="CREDITO">Crédito</SelectItem>
                        <SelectItem value="DEBITO">Débito</SelectItem>
                        <SelectItem value="EFECTIVO">Efectivo</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="estado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value} 
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el estado de la compra" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Estados</SelectLabel>
                        <SelectItem value="PENDIENTE">Pendiente</SelectItem>
                        <SelectItem value="APROBADO">Realizada</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold">Productos</h3>
              <Button type="button" onClick={handleAddProducto} className="ml-auto">
                +
              </Button>
            </div>
            {fields.map((item, index) => (
              <div key={item.id} className="flex justify-between items-end space-x-2 mb-2">
                <FormField
                  control={form.control}
                  name={`productos.${index}.codigoBarras`}
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Código de barras</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingrese código de barras" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`productos.${index}.cantidad`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cantidad</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.length > 1 && (
                  <Button type="button" onClick={() => remove(index)} variant="destructive" className="mb-1">
                    -
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {isClienteFormVisible && (
        <ClienteForm
          clienteId={form.getValues().clienteId}
          onSuccess={clienteFormOnSuccess}
          isOpen={isClienteFormVisible}
          onClose={handleCloseClick}
        />
      )}
    </>
  );
}

export default CompraForm;