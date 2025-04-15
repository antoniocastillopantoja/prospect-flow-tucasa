
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { ProspectFormData } from "@/types/prospects";

// Define the validation schema using zod
const prospectFormSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  phone: z.string().min(1, { message: "El teléfono es obligatorio" }),
  email: z.string().email({ message: "Email inválido" }).or(z.string().length(0)),
  location: z.string(),
  sector: z.string(),
  minPrice: z.string(),
  maxPrice: z.string(),
  creditType: z.string(),
  assignedTo: z.string(),
  notes: z.string()
});

export function useProspectEdit(prospect: any, updateProspect: Function) {
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProspectFormData>({
    resolver: zodResolver(prospectFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      sector: "",
      minPrice: "",
      maxPrice: "",
      creditType: "",
      assignedTo: "",
      notes: ""
    },
  });

  const resetForm = () => {
    if (prospect) {
      const minMaxPrice = prospect.priceRange
        .replace('$', '')
        .split(' - ')
        .map((p: string) => p.replace('$', '').replace('M', ''));
        
      form.reset({
        name: prospect.name,
        phone: prospect.phone,
        email: prospect.email || "",
        location: prospect.location,
        sector: prospect.sector,
        minPrice: minMaxPrice[0] || "",
        maxPrice: minMaxPrice[1]?.replace('M', '') || "",
        creditType: prospect.creditType,
        assignedTo: prospect.agent,
        notes: prospect.notes || ""
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSaveEdit = form.handleSubmit((data) => {
    if (prospect && prospect.id) {
      setEditLoading(true);
      
      const priceRange = data.minPrice && data.maxPrice 
        ? `$${data.minPrice}M - $${data.maxPrice}M` 
        : "";
      
      const updatedProspect = {
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        location: data.location,
        sector: data.sector,
        priceRange,
        creditType: data.creditType,
        agent: data.assignedTo,
        notes: data.notes
      };
      
      updateProspect(parseInt(prospect.id), updatedProspect);
      
      setTimeout(() => {
        setEditLoading(false);
        setIsEditing(false);
        
        toast({
          title: "Prospecto actualizado",
          description: "La información ha sido actualizada correctamente."
        });
      }, 500);
    }
  });

  const closeEditDialog = () => {
    setIsEditing(false);
    resetForm();
  };

  return {
    form,
    isEditing,
    editLoading,
    handleEdit,
    handleSaveEdit,
    closeEditDialog,
    resetForm
  };
}
