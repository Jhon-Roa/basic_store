"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import axios from "axios";

const formSchema = z.object({
  nombre: z.string().min(2, "Nombre muy corto").max(45, "Nombre muy largo"),
});

interface CategoriaFormProps {
  onSuccess: () => void;
  onClick: () => void;
  isOpen: boolean;
}

export function CategoriaForm({ onSuccess, onClick, isOpen }: CategoriaFormProps) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await axios.post(apiUrl + "/categoria", values);
      console.log("Categoría agregada:", response.data);
      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Error al agregar la categoría", error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClick}>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>
            Formulario Cliente
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-4 relative shadow-md rounded-lg">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Categoría</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la categoría" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="mt-3">
                Agregar Categoría
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CategoriaForm;
