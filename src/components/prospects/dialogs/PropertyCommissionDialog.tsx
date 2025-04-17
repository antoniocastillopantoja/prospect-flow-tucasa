
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building, Percent, DollarSign } from "lucide-react";

import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

// Define the form schema with validation
const formSchema = z.object({
  propertyId: z.string().min(1, "El ID de la propiedad es requerido"),
  commissionPercentage: z.string()
    .refine(value => !isNaN(parseFloat(value)), {
      message: "El porcentaje debe ser un número"
    })
    .refine(value => parseFloat(value) > 0 && parseFloat(value) <= 100, {
      message: "El porcentaje debe estar entre 0 y 100"
    }),
  negotiatedPrice: z.string().optional()
});

export type PropertyCommissionFormData = z.infer<typeof formSchema>;

interface PropertyCommissionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PropertyCommissionFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PropertyCommissionDialog: React.FC<PropertyCommissionDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const form = useForm<PropertyCommissionFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyId: "",
      commissionPercentage: "3",
      negotiatedPrice: ""
    }
  });

  const handleSubmit = (data: PropertyCommissionFormData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Información de Cierre</DialogTitle>
          <DialogDescription>
            Ingresa la información de la propiedad y comisión para finalizar el proceso de cierre.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID de Propiedad</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <Building className="mr-2 h-4 w-4 text-gray-500" />
                      <Input placeholder="P-12345" {...field} className="w-full" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="commissionPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Porcentaje de Comisión</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Percent className="absolute left-2 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="3" 
                        type="number" 
                        step="0.01"
                        min="0.01" 
                        max="100"
                        {...field} 
                        className="w-full pl-8" 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="negotiatedPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio Negociado</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <DollarSign className="absolute left-2 h-4 w-4 text-gray-500" />
                      <Input 
                        placeholder="1000000" 
                        type="number"
                        min="0"
                        {...field} 
                        className="w-full pl-8" 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyCommissionDialog;
