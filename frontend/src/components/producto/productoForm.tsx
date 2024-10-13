import CategoriaForm from "../categoria/categoriaForm";
import axios from "axios";
import { categoria } from "@/types/categoria";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useCallback } from "react"; 
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
import { Input } from "@/components/ui/input";

export function ProductoForm() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [categorias, setCategorias] = useState([]);
  const [isCategoriaFormVisible, setCategoriaFormVisible] = useState(false);

  const fetchCategorias = useCallback(async () => {
    try {
      const response = await axios.get(apiUrl + "/categoria");
      setCategorias(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchCategorias(); 
  }, [fetchCategorias]); 

  const formSchema = z.object({
    nombre: z.string().min(2, "Nombre muy corto").max(45, "Nombre muy largo"),
    categoria: z
      .object({
        categoriaId: z.number(),
        nombre: z.string().nonempty("Nombre de categoría requerido"),
      })
      .refine((data) => data.categoriaId > 0, "Selecciona una categoría"),
    codigoBarras: z
      .string()
      .min(5, "Código de barras muy corto")
      .max(150, "Código de barras muy largo"),
    precioVenta: z
      .string()
      .transform((value) => parseFloat(value))
      .refine((value) => value > 0, "El precio debe ser mayor que 0"),
    stock: z
      .string()
      .transform((value) => parseInt(value, 10))
      .refine((value) => value >= 0, "El stock no puede ser negativo"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      codigoBarras: "",
      precioVenta: 0,
      stock: 0
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(apiUrl + "/producto", values);
      console.log("producto agregado: ", response);
      form.reset();
    } catch (error) {
      console.error("error posting data", error);
    }
    console.log(values)
  }

  function getAllCategorias() {
    return categorias.map((categoria : categoria) => (
      <SelectItem key={categoria.categoriaId} value={JSON.stringify(categoria)}>
        {categoria.nombre}
      </SelectItem>
    ))
  }

  function addCategory() {
    setCategoriaFormVisible(true);
  }

  function closeCategoriaForm() {
    setCategoriaFormVisible(false);
    fetchCategorias();
  }  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-10/12 lg:w-1/3 space-y-4-1/3">
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Producto</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del producto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoria"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    const selectedCategoria = JSON.parse(value);
                    field.onChange(selectedCategoria);
                  }}
                  value={field.value ? JSON.stringify(field.value) : ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione la categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup id="select-group">
                      <SelectLabel>Categorías</SelectLabel>
                      {getAllCategorias()}
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
          name="codigoBarras"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de Barras</FormLabel>
              <FormControl>
                <Input placeholder="Código de barras" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="precioVenta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio de Venta</FormLabel>
              <FormControl>
                <Input
                  placeholder="Precio de venta"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input placeholder="Cantidad en stock" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-3 flex justify-center ">
          <Button type="submit" className="mr-2">
            Submit
          </Button>
          <Button type="button" className="ml-2" onClick={addCategory}>
            Add Category
          </Button>
        </div>
      </form>
      {isCategoriaFormVisible && (
        <div className="absolute">
          <CategoriaForm 
            onSuccess={() => closeCategoriaForm()} 
            isOpen={isCategoriaFormVisible}
            onClick={() => {setCategoriaFormVisible(false)}}
          />
        </div>
      )}
    </Form>
  );
}

export default ProductoForm;