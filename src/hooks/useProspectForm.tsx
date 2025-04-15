
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProspects } from "@/hooks/useProspects";
import { ProspectFormData } from "@/types/prospects";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

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

export function useProspectForm() {
  const navigate = useNavigate();
  const { addProspect } = useProspects();
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
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = form.handleSubmit((data) => {
    setIsLoading(true);
    
    const priceRange = data.minPrice && data.maxPrice 
      ? `$${data.minPrice}M - $${data.maxPrice}M` 
      : "";
    
    addProspect({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      location: data.location,
      sector: data.sector,
      priceRange,
      creditType: data.creditType,
      contactDate: new Date().toISOString().split('T')[0],
      agent: data.assignedTo,
      status: "new",
      notes: data.notes
    });
    
    toast({
      title: "Prospecto creado",
      description: `${data.name} ha sido registrado correctamente.`
    });
    
    setTimeout(() => {
      setIsLoading(false);
      navigate("/prospectos");
    }, 500);
  });

  return {
    form,
    isLoading,
    handleSubmit,
    navigateBack: () => navigate("/prospectos")
  };
}
