import { reportTypes } from "../reportData";
import { getCommissionsSummaryByAgent } from './dataOrganizers';
import { getProspectsBySource } from './dataOrganizers/prospectsBySource';
import { getProspectsByStatus } from './dataOrganizers/prospectsByStatus';
import { getProspectsBySector } from './dataOrganizers/prospectsBySector';
import { getProspectsByAgent } from './dataOrganizers/prospectsByAgent';

// Get report data based on report type (ahora asíncrono y en vivo)
export const getReportDataByType = async (reportType: string) => {
  switch (reportType) {
    case "fuente": {
      const grouped = await getProspectsBySource();
      // Resumir por fuente
      return Object.entries(grouped).map(([name, items]) => ({
        name,
        value: items.length
      }));
    }
    case "estado": {
      const grouped = await getProspectsByStatus();
      return Object.entries(grouped).map(([name, items]) => ({
        name,
        value: items.length
      }));
    }
    case "sector": {
      const grouped = await getProspectsBySector();
      return Object.entries(grouped).map(([sector, items]) => ({
        sector,
        total: items.length
      }));
    }
    case "agente": {
      const grouped = await getProspectsByAgent();
      return Object.entries(grouped).map(([agente, items]) => ({
        agente,
        total: items.length
      }));
    }
    case "comisiones":
      return await getCommissionsSummaryByAgent();
    default:
      return [];
  }
};

// Get filename for the report
export const getReportFilename = (reportLabel: string, timeframe: string) => {
  return `reporte-${reportLabel}-${timeframe}.xlsx`;
};
