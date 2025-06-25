import { supabase } from "@/lib/supabaseClient";

// Get prospects data organized by sector (from Supabase)
export const getProspectsBySector = async () => {
  const { data: prospects, error } = await supabase.from('prospects').select('*');
  const prospectsBySector: Record<string, any[]> = {};
  if (error || !prospects) return prospectsBySector;
  prospects.forEach(prospect => {
    const sector = prospect.sector || "Desconocido";
    if (!prospectsBySector[sector]) {
      prospectsBySector[sector] = [];
    }
    prospectsBySector[sector].push({
      ID: prospect.id,
      Nombre: prospect.name,
      Teléfono: prospect.phone,
      Email: prospect.email || "",
      Ubicación: prospect.location,
      "Rango de Precio": prospect.priceRange,
      "Tipo de Crédito": prospect.creditType,
      "Fecha de Contacto": prospect.contactDate,
      Agente: prospect.agent,
      Fuente: prospect.source || "Desconocido",
      Estado: prospect.status,
      Notas: prospect.notes || ""
    });
  });
  return prospectsBySector;
};
