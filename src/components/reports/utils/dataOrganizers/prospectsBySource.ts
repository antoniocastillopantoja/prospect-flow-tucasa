import { supabase } from "@/lib/supabaseClient";

// Get prospects data organized by source (from Supabase)
export const getProspectsBySource = async () => {
  const { data: prospects, error } = await supabase.from('prospects').select('*');
  const prospectsBySource: Record<string, any[]> = {};
  if (error || !prospects) return prospectsBySource;
  prospects.forEach(prospect => {
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
