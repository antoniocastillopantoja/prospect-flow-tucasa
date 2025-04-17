
import { reportTypes } from "../reportData";
import { getCommissionsSummaryByAgent } from './dataOrganizers';

// Get report data based on report type
export const getReportDataByType = (reportType: string) => {
  switch (reportType) {
    case "fuente":
      return reportTypes.prospectsBySource;
    case "estado":
      return reportTypes.prospectsByStatus;
    case "sector":
      return reportTypes.prospectsBySector;
    case "agente":
      return reportTypes.prospectsByAgent;
    case "comisiones":
      return getCommissionsSummaryByAgent();
    default:
      return [];
  }
};

// Get filename for the report
export const getReportFilename = (reportLabel: string, timeframe: string) => {
  return `reporte-${reportLabel}-${timeframe}.xlsx`;
};
