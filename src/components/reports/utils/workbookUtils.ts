import * as XLSX from 'xlsx';
import { getReportDataByType } from './reportDataUtils';
import { 
  getProspectsBySource,
  getProspectsByStatus,
  getProspectsBySector,
  getProspectsByAgent,
  getCommissionsByAgent,
  getCommissionsSummaryByAgent,
  getAllClosedProspects
} from './dataOrganizers';

/**
 * Creates Excel sheets for prospects grouped by a specific category
 */
const createCategorySheets = (
  wb: XLSX.WorkBook, 
  categoryData: Record<string, any[]>,
  createAllProspectsSheet: boolean = true
) => {
  if (createAllProspectsSheet) {
    // Create a sheet with all prospects
    const allProspectsData = Object.values(categoryData).flat();
    const allProspectsWs = XLSX.utils.json_to_sheet(allProspectsData);
    XLSX.utils.book_append_sheet(wb, allProspectsWs, "Todos los Prospectos");
  }
  
  // Create individual sheets for each category
  Object.entries(categoryData).forEach(([category, prospects]) => {
    if (prospects.length > 0) {
      const categoryWs = XLSX.utils.json_to_sheet(prospects);
      // Limit sheet name to 31 characters (Excel limitation)
      const sheetName = category.substring(0, 28) + (category.length > 28 ? "..." : "");
      XLSX.utils.book_append_sheet(wb, categoryWs, sheetName);
    }
  });
};

/**
 * Get the appropriate data organizer function based on report type
 */
const getDataOrganizerByReportType = (reportType: string): (() => Promise<Record<string, any[]>>) => {
  switch (reportType) {
    case "fuente":
      return getProspectsBySource;
    case "estado":
      return getProspectsByStatus;
    case "sector":
      return getProspectsBySector;
    case "agente":
      return getProspectsByAgent;
    case "comisiones":
      return getCommissionsByAgent;
    default:
      return async () => ({});
  }
};

// Create commission report workbook (ahora asíncrono)
const createCommissionsWorkbook = async () => {
  const wb = XLSX.utils.book_new();
  // Añadir hoja de resumen de comisiones por agente
  const summaryData = await getCommissionsSummaryByAgent();
  const summaryWs = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summaryWs, "Resumen Comisiones");
  // Añadir hoja con todas las ventas cerradas
  const closedProspectsData = await getAllClosedProspects();
  const closedProspectsWs = XLSX.utils.json_to_sheet(closedProspectsData);
  XLSX.utils.book_append_sheet(wb, closedProspectsWs, "Ventas Cerradas");
  // Añadir hojas por agente
  const commissionsByAgent = await getCommissionsByAgent();
  Object.entries(commissionsByAgent).forEach(([agent, commissions]) => {
    if (commissions.length > 0) {
      const agentWs = XLSX.utils.json_to_sheet(commissions);
      // Limit sheet name to 31 characters (Excel limitation)
      const sheetName = agent.substring(0, 28) + (agent.length > 28 ? "..." : "");
      XLSX.utils.book_append_sheet(wb, agentWs, sheetName);
    }
  });
  return wb;
};

// Generate Excel workbook based on report type and timeframe (ahora asíncrono)
export const generateExcelWorkbook = async (reportType: string, timeframe: string) => {
  // Para el reporte de comisiones, usar una lógica especializada
  if (reportType === "comisiones") {
    return await createCommissionsWorkbook();
  }
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  // Add the summary data as the first sheet
  const summaryData = await getReportDataByType(reportType);
  const summaryWs = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summaryWs, "Resumen");
  // Get the appropriate data organizer for the report type
  const dataOrganizer = getDataOrganizerByReportType(reportType);
  // Generate category-specific sheets if this is a supported report type
  if (["fuente", "estado", "sector", "agente"].includes(reportType)) {
    const groupedProspects = await dataOrganizer();
    createCategorySheets(wb, groupedProspects);
  }
  return wb;
};
