
import { mockProspects } from "@/models/Prospect";

// Get prospects data organized by agent
export const getProspectsByAgent = () => {
  const prospectsByAgent: Record<string, any[]> = {};
  
  mockProspects.forEach(prospect => {
    const agent = prospect.agent || "Sin asignar";
    if (!prospectsByAgent[agent]) {
      prospectsByAgent[agent] = [];
    }
    prospectsByAgent[agent].push({
      ID: prospect.id,
      Nombre: prospect.name,
      Teléfono: prospect.phone,
      Email: prospect.email || "",
      Ubicación: prospect.location,
      Sector: prospect.sector,
      "Rango de Precio": prospect.priceRange,
      "Tipo de Crédito": prospect.creditType,
      "Fecha de Contacto": prospect.contactDate,
      Fuente: prospect.source || "Desconocido",
      Estado: prospect.status,
      Notas: prospect.notes || ""
    });
  });
  
  return prospectsByAgent;
};
