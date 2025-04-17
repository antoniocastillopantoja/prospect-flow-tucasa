
// Report labels for UI display
export const getReportLabel = (reportType: string): string => {
  switch (reportType) {
    case 'fuente':
      return 'prospectos por fuente';
    case 'estado':
      return 'prospectos por estado';
    case 'sector':
      return 'prospectos por sector';
    case 'agente':
      return 'prospectos por agente';
    case 'comisiones':
      return 'comisiones por agente';
    default:
      return 'prospectos';
  }
};

// Timeframe description for UI display
export const getTimeframeDescription = (timeframe: string): string => {
  switch (timeframe) {
    case 'semana':
      return 'de esta semana';
    case 'mes':
      return 'del mes actual';
    case 'trimestre':
      return 'del trimestre actual';
    case 'año':
      return 'del año actual';
    default:
      return 'período seleccionado';
  }
};
