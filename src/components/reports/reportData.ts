
export const reportData = {
  prospectsBySource: [
    { name: "Facebook", value: 45 },
    { name: "Instagram", value: 28 },
    { name: "TikTok", value: 15 },
    { name: "Sitio Web", value: 32 },
    { name: "Referidos", value: 20 }
  ],
  
  prospectsByStatus: [
    { name: "Nuevos", value: 35, color: "#3182CE" },
    { name: "Contactados", value: 45, color: "#ECC94B" },
    { name: "Cita Agendada", value: 25, color: "#805AD5" },
    { name: "Cita Cancelada", value: 15, color: "#E53E3E" },
    { name: "Cerrados", value: 18, color: "#48BB78" }
  ],
  
  prospectsBySector: [
    { name: "Norte", nuevos: 15, contactados: 12, citas: 8, cerrados: 5 },
    { name: "Sur", nuevos: 25, contactados: 20, citas: 10, cerrados: 7 },
    { name: "Centro", nuevos: 18, contactados: 15, citas: 9, cerrados: 6 }
  ],
  
  prospectsByAgent: [
    { name: "Juan Pérez", nuevos: 22, contactados: 18, citas: 12, cerrados: 8 },
    { name: "Ana Rodríguez", nuevos: 28, contactados: 20, citas: 15, cerrados: 9 },
    { name: "Pedro Ramírez", nuevos: 15, contactados: 12, citas: 8, cerrados: 4 }
  ],

  conversionData: [
    { etapa: "Contactados", cantidad: 125, porcentaje: "100%" },
    { etapa: "Interesados", cantidad: 98, porcentaje: "78%" },
    { etapa: "Citas Agendadas", cantidad: 76, porcentaje: "61%" },
    { etapa: "Citas Realizadas", cantidad: 58, porcentaje: "46%" },
    { etapa: "Propuestas", cantidad: 45, porcentaje: "36%" },
    { etapa: "Cerrados", cantidad: 32, porcentaje: "26%" }
  ],

  agentPerformanceData: [
    { agente: "Ana Rodríguez", prospectos: 78, citas: 52, ventas: 24, conversion: "30.8%", comision: "$24,500" },
    { agente: "Juan Pérez", prospectos: 65, citas: 43, ventas: 18, conversion: "27.7%", comision: "$18,200" },
    { agente: "María López", prospectos: 58, citas: 32, ventas: 14, conversion: "24.1%", comision: "$15,800" },
    { agente: "Pedro Ramírez", prospectos: 45, citas: 28, ventas: 12, conversion: "26.7%", comision: "$12,000" }
  ]
};

export const reportTypes = {
  prospectsBySource: [
    { name: "Facebook", value: 45 },
    { name: "Instagram", value: 28 },
    { name: "TikTok", value: 15 },
    { name: "Sitio Web", value: 32 },
    { name: "Referidos", value: 20 }
  ],
  prospectsByStatus: [
    { name: "Nuevos", value: 35 },
    { name: "Contactados", value: 45 },
    { name: "Cita Agendada", value: 25 },
    { name: "Cita Cancelada", value: 15 },
    { name: "Cerrados", value: 18 }
  ],
  prospectsBySector: [
    { sector: "Norte", total: 40, porcentaje: "25%" },
    { sector: "Sur", total: 62, porcentaje: "38%" },
    { sector: "Centro", total: 48, porcentaje: "30%" },
    { sector: "Este", total: 12, porcentaje: "7%" }
  ],
  prospectsByAgent: [
    { agente: "Juan Pérez", total: 60, conversion: "22%" },
    { agente: "Ana Rodríguez", total: 72, conversion: "31%" },
    { agente: "Pedro Ramírez", total: 39, conversion: "18%" },
    { agente: "María López", total: 41, conversion: "20%" }
  ],
  conversionData: [
    { etapa: "Contactados", cantidad: 125, porcentaje: "100%" },
    { etapa: "Interesados", cantidad: 98, porcentaje: "78%" },
    { etapa: "Citas Agendadas", cantidad: 76, porcentaje: "61%" },
    { etapa: "Citas Realizadas", cantidad: 58, porcentaje: "46%" },
    { etapa: "Propuestas", cantidad: 45, porcentaje: "36%" },
    { etapa: "Cerrados", cantidad: 32, porcentaje: "26%" }
  ],
  agentPerformanceData: [
    { agente: "Ana Rodríguez", prospectos: 78, citas: 52, ventas: 24, conversion: "30.8%", comision: "$24,500" },
    { agente: "Juan Pérez", prospectos: 65, citas: 43, ventas: 18, conversion: "27.7%", comision: "$18,200" },
    { agente: "María López", prospectos: 58, citas: 32, ventas: 14, conversion: "24.1%", comision: "$15,800" },
    { agente: "Pedro Ramírez", prospectos: 45, citas: 28, ventas: 12, conversion: "26.7%", comision: "$12,000" }
  ]
};

export const getReportData = (reportType: string) => {
  switch (reportType) {
    case 'prospectos':
      return reportData.prospectsBySource;
    case 'conversion':
      return reportData.conversionData;
    case 'agentes':
      return reportData.agentPerformanceData;
    default:
      return reportData.prospectsBySource;
  }
};
