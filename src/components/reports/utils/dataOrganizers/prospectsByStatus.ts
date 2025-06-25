import { supabase } from "@/lib/supabaseClient";

// Get prospects data organized by status (from Supabase)
export const getProspectsByStatus = async () => {
  const { data: prospects, error } = await supabase.from('prospects').select('*');
  const prospectsByStatus: Record<string, any[]> = {};
  if (error || !prospects) return prospectsByStatus;
  prospects.forEach(prospect => {
    const status = prospect.status || "Desconocido";
    if (!prospectsByStatus[status]) {
      prospectsByStatus[status] = [];
    }
    prospectsByStatus[status].push({
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
      Fuente: prospect.source || "Desconocido",
      Notas: prospect.notes || ""
    });
  });
  return prospectsByStatus;
};
