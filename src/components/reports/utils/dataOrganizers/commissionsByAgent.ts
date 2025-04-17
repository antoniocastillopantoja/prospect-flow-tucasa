
import { mockProspects } from "@/models/Prospect";

// Get commission data organized by agent
export const getCommissionsByAgent = () => {
  const commissionsByAgent: Record<string, any[]> = {};
  
  // Filtrar prospectos cerrados
  const closedProspects = mockProspects.filter(prospect => prospect.status === "closed");
  
  closedProspects.forEach(prospect => {
    const agent = prospect.agent || "Sin asignar";
    
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
      Prospecto: prospect.name,
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
      "Sector": prospect.sector
    });
  });
  
  return commissionsByAgent;
};

// Get summary commission data by agent
export const getCommissionsSummaryByAgent = () => {
  const agentSummary: Record<string, {
    ventas: number;
    comisionTotal: number;
    promedioPrecio: number;
    promedioComision: number;
  }> = {};
  
  // Filtrar prospectos cerrados
  const closedProspects = mockProspects.filter(prospect => prospect.status === "closed");
  
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
  
  // Convertir a formato para reporte
  return Object.entries(agentSummary).map(([agent, data]) => ({
    Agente: agent,
    Ventas: data.ventas,
    "Comisión Total": new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(data.comisionTotal),
    "Precio Promedio": new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(data.promedioPrecio),
    "Comisión Promedio": new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(data.promedioComision)
  }));
};

// Get all closed prospects with commission details
export const getAllClosedProspects = () => {
  const closedProspects = mockProspects
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
