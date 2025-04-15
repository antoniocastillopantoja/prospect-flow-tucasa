
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProspects } from "@/hooks/useProspects";
import { ProspectFormData } from "@/types/prospects";

export function useProspectForm() {
  const navigate = useNavigate();
  const { addProspect } = useProspects();
  
  const [formData, setFormData] = useState<ProspectFormData>({
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
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const priceRange = formData.minPrice && formData.maxPrice 
      ? `$${formData.minPrice}M - $${formData.maxPrice}M` 
      : "";
    
    addProspect({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      location: formData.location,
      sector: formData.sector,
      priceRange,
      creditType: formData.creditType,
      contactDate: new Date().toISOString().split('T')[0],
      agent: formData.assignedTo,
      status: "new",
      notes: formData.notes
    });
    
    setTimeout(() => {
      setIsLoading(false);
      navigate("/prospectos");
    }, 500);
  };

  return {
    formData,
    isLoading,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    navigateBack: () => navigate("/prospectos")
  };
}
