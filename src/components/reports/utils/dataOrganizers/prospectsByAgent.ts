import { supabase } from "@/lib/supabaseClient";

// Get prospects data organized by agent (from Supabase)
export const getProspectsByAgent = async () => {
  // Obtener usuarios para mapear agente
  const { data: usersData } = await supabase.from('users').select('id, full_name');
  const userMap: Record<string, string> = {};
  (usersData || []).forEach((u: any) => { userMap[u.id] = u.full_name; });
  // Obtener prospectos
  const { data: prospects, error } = await supabase.from('prospects').select('*');
  const prospectsByAgent: Record<string, any[]> = {};
  if (error || !prospects) return prospectsByAgent;
  prospects.forEach(prospect => {
    const agent = userMap[prospect.assigned_user_id] || "Sin asignar";
    if (!prospectsByAgent[agent]) {
      prospectsByAgent[agent] = [];
    }
    prospectsByAgent[agent].push({
      ID: prospect.id,
      Nombre: prospect.full_name,
      Teléfono: prospect.phone,
      Email: prospect.email || "",
      Ubicación: '-',
      Sector: prospect.sector,
      "Rango de Precio": '',
      "Tipo de Crédito": '',
      "Fecha de Contacto": prospect.created_at,
      Fuente: '',
      Estado: '',
      Notas: prospect.notes || ""
    });
  });
  return prospectsByAgent;
};
