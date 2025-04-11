
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Prospect, mockProspects, ProspectStatus } from "@/models/Prospect";

export const useProspects = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    // Simulate API call to get prospects
    setLoading(true);
    setTimeout(() => {
      setProspects(mockProspects);
      setLoading(false);
    }, 500);
  }, []);

  // Add a new prospect
  const addProspect = (prospect: Omit<Prospect, "id">) => {
    const newProspect: Prospect = {
      ...prospect,
      id: prospects.length > 0 ? Math.max(...prospects.map(p => p.id)) + 1 : 1
    };
    
    setProspects([...prospects, newProspect]);
    
    toast({
      title: "Prospecto creado",
      description: `${newProspect.name} ha sido registrado correctamente.`
    });
    
    return newProspect;
  };

  // Update a prospect
  const updateProspect = (id: number, updates: Partial<Prospect>) => {
    const updatedProspects = prospects.map(prospect => 
      prospect.id === id ? { ...prospect, ...updates } : prospect
    );
    
    setProspects(updatedProspects);
    
    toast({
      title: "Prospecto actualizado",
      description: "La información ha sido actualizada correctamente."
    });
  };

  // Update status of a prospect
  const updateProspectStatus = (id: number, status: ProspectStatus) => {
    const prospect = prospects.find(p => p.id === id);
    if (prospect) {
      updateProspect(id, { status });
    }
  };

  // Delete a prospect
  const deleteProspect = (id: number) => {
    const prospect = prospects.find(p => p.id === id);
    if (!prospect) return;
    
    const updatedProspects = prospects.filter(prospect => prospect.id !== id);
    setProspects(updatedProspects);
    
    toast({
      title: "Prospecto eliminado",
      description: `${prospect.name} ha sido eliminado correctamente.`
    });
  };

  return {
    prospects,
    loading,
    addProspect,
    updateProspect,
    updateProspectStatus,
    deleteProspect
  };
};
