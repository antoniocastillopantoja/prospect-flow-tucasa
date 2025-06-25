import { supabase } from "@/lib/supabaseClient";

// Get commission data organized by agent (from Supabase)
export const getCommissionsByAgent = async () => {
  // Obtener usuarios para mapear agente
  const { data: usersData } = await supabase.from('users').select('id, full_name');
  const userMap: Record<string, string> = {};
  (usersData || []).forEach((u: any) => { userMap[u.id] = u.full_name; });
  // Obtener prospectos
  const { data: prospects, error } = await supabase.from('prospects').select('*');
  const commissionsByAgent: Record<string, any[]> = {};
  if (error || !prospects) return commissionsByAgent;
  // Filtrar prospectos cerrados
  const closedProspects = prospects.filter(prospect => prospect.status === "closed");
  closedProspects.forEach(prospect => {
    const agent = userMap[prospect.assigned_user_id] || "Sin asignar";
    if (!commissionsByAgent[agent]) {
      commissionsByAgent[agent] = [];
    }
    // Calcular el monto de comisión si hay precio y porcentaje
    let commissionAmount = 0;
    if (prospect.negotiatedPrice && prospect.commissionPercentage) {
      commissionAmount = (parseFloat(prospect.negotiatedPrice) * parseFloat(prospect.commissionPercentage)) / 100;
    }
    commissionsByAgent[agent].push({
      ID: prospect.id,
      Prospecto: prospect.full_name,
      "ID Propiedad": prospect.propertyId || "No especificado",
      "Precio Negociado": prospect.negotiatedPrice ? 
        new Intl.NumberFormat('es-MX', { 
          style: 'currency', 
          currency: 'MXN',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(parseFloat(prospect.negotiatedPrice)) : 
        "No especificado",
      "Porcentaje Comisión": prospect.commissionPercentage ? `${prospect.commissionPercentage}%` : "No especificado",
      "Monto Comisión": commissionAmount > 0 ? 
        new Intl.NumberFormat('es-MX', { 
          style: 'currency', 
          currency: 'MXN',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(commissionAmount) : 
        "No calculable",
      "Fecha Contacto": prospect.created_at,
      "Sector": prospect.sector
    });
  });
  return commissionsByAgent;
};

// Get summary commission data by agent (from Supabase)
export const getCommissionsSummaryByAgent = async () => {
  const { data: prospects, error } = await supabase.from('prospects').select('*');
  const agentSummary: Record<string, {
    ventas: number;
    comisionTotal: number;
    promedioPrecio: number;
    promedioComision: number;
  }> = {};
  if (error || !prospects) return agentSummary;
  // Filtrar prospectos cerrados
  const closedProspects = prospects.filter(prospect => prospect.status === "closed");
  closedProspects.forEach(prospect => {
    const agent = prospect.agent || "Sin asignar";
    if (!agentSummary[agent]) {
      agentSummary[agent] = {
        ventas: 0,
        comisionTotal: 0,
        promedioPrecio: 0,
        promedioComision: 0
      };
    }
    agentSummary[agent].ventas += 1;
    if (prospect.negotiatedPrice) {
      const price = parseFloat(prospect.negotiatedPrice);
      agentSummary[agent].promedioPrecio += price;
      if (prospect.commissionPercentage) {
        const commissionAmount = (price * parseFloat(prospect.commissionPercentage)) / 100;
        agentSummary[agent].comisionTotal += commissionAmount;
        agentSummary[agent].promedioComision += commissionAmount;
      }
    }
  });
  // Calcular promedios
  Object.keys(agentSummary).forEach(agent => {
    if (agentSummary[agent].ventas > 0) {
      agentSummary[agent].promedioPrecio = agentSummary[agent].promedioPrecio / agentSummary[agent].ventas;
      agentSummary[agent].promedioComision = agentSummary[agent].promedioComision / agentSummary[agent].ventas;
    }
  });
  return agentSummary;
};

// Get all closed prospects with commission details (from Supabase)
export const getAllClosedProspects = async () => {
  const { data: prospects, error } = await supabase.from('prospects').select('*');
  if (error || !prospects) return [];
  const closedProspects = prospects
    .filter(prospect => prospect.status === "closed")
    .map(prospect => {
      let commissionAmount = 0;
      if (prospect.negotiatedPrice && prospect.commissionPercentage) {
        commissionAmount = (parseFloat(prospect.negotiatedPrice) * parseFloat(prospect.commissionPercentage)) / 100;
      }
      return {
        ID: prospect.id,
        Prospecto: prospect.name,
        Agente: prospect.agent || "Sin asignar",
        "ID Propiedad": prospect.propertyId || "No especificado",
        "Precio Negociado": prospect.negotiatedPrice ? 
          new Intl.NumberFormat('es-MX', { 
            style: 'currency', 
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(parseFloat(prospect.negotiatedPrice)) : 
          "No especificado",
        "Porcentaje Comisión": prospect.commissionPercentage ? `${prospect.commissionPercentage}%` : "No especificado",
        "Monto Comisión": commissionAmount > 0 ? 
          new Intl.NumberFormat('es-MX', { 
            style: 'currency', 
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          }).format(commissionAmount) : 
          "No calculable",
        "Fecha Contacto": prospect.contactDate,
        "Sector": prospect.sector,
        "Ubicación": prospect.location
      };
    });
  return closedProspects;
};
