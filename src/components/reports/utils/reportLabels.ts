
// Get report label based on report type
export const getReportLabel = (reportType: string) => {
  switch (reportType) {
    case "fuente":
      return "prospectos por fuente";
    case "estado":
      return "prospectos por estado";
    case "sector":
      return "prospectos por sector";
    case "agente":
      return "prospectos por agente";
    default:
      return `reporte de ${reportType}`;
  }
};

// Get timeframe description for display
export const getTimeframeDescription = (timeframe: string) => {
  switch (timeframe) {
    case 'mes':
      return 'último mes';
    case 'semana':
      return 'última semana';
    case 'trimestre':
      return 'último trimestre';
    case 'año':
    default:
      return 'último año';
  }
};
