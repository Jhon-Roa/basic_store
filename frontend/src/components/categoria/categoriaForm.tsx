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
import { Input } from "@/components/ui/input";
import axios from "axios";

const formSchema = z.object({
  nombre: z.string().min(2, "Nombre muy corto").max(45, "Nombre muy largo"),
});

interface CategoriaFormProps {
   onSuccess: () => void;
   onClick: () => void;
}

export function CategoriaForm({ onSuccess, onClick }: CategoriaFormProps) {
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

  function handleOnClick() {
    onClick();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full bg-white dark:bg-black p-4 relative shadow-md rounded-lg">
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
        <Button type="submit" className="mt-3">
          Agregar Categoría
        </Button>
        <Button type="button" onClick={handleOnClick} className="absolute top-0 right-0 pb-3 font-bold">
          x
        </Button>
      </form>
    </Form>
  );
}

export default CategoriaForm;
