
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
  ]
};

export const getReportData = (reportType: string) => {
  switch (reportType) {
    case 'prospectos':
      return reportData.prospectsBySource;
    case 'conversion':
      return reportData.prospectsByStatus;
    case 'agentes':
      return reportData.prospectsByAgent;
    default:
      return reportData.prospectsBySource;
  }
};
