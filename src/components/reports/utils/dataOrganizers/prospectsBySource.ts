
import { mockProspects } from "@/models/Prospect";

// Get prospects data organized by source
export const getProspectsBySource = () => {
  const prospectsBySource: Record<string, any[]> = {};
  
  mockProspects.forEach(prospect => {
    const source = prospect.source || "Desconocido";
    if (!prospectsBySource[source]) {
      prospectsBySource[source] = [];
    }
    prospectsBySource[source].push({
      ID: prospect.id,
      Nombre: prospect.name,
      Teléfono: prospect.phone,
      Email: prospect.email || "",
      Ubicación: prospect.location,
      Sector: prospect.sector,
      "Rango de Precio": prospect.priceRange,
      "Tipo de Crédito": prospect.creditType,
      "Fecha de Contacto": prospect.contactDate,
      Agente: prospect.agent,
      Estado: prospect.status,
      Notas: prospect.notes || ""
    });
  });
  
  return prospectsBySource;
};
