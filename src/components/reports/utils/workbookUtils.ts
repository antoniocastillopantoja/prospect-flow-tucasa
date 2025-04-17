
import * as XLSX from 'xlsx';
import { getReportDataByType } from './reportDataUtils';
import { 
  getProspectsBySource,
  getProspectsByStatus,
  getProspectsBySector,
  getProspectsByAgent
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
const getDataOrganizerByReportType = (reportType: string): (() => Record<string, any[]>) => {
  switch (reportType) {
    case "fuente":
      return getProspectsBySource;
    case "estado":
      return getProspectsByStatus;
    case "sector":
      return getProspectsBySector;
    case "agente":
    case "rendimiento":
      return getProspectsByAgent;
    default:
      return () => ({});
  }
};

// Generate Excel workbook based on report type and timeframe
export const generateExcelWorkbook = (reportType: string, timeframe: string) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Add the summary data as the first sheet
  const summaryData = getReportDataByType(reportType);
  const summaryWs = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summaryWs, "Resumen");
  
  // Get the appropriate data organizer for the report type
  const dataOrganizer = getDataOrganizerByReportType(reportType);
  
  // Generate category-specific sheets if this is a supported report type
  if (["fuente", "estado", "sector", "agente"].includes(reportType)) {
    const groupedProspects = dataOrganizer();
    createCategorySheets(wb, groupedProspects);
  }
  // Special case for rendimiento report - include prospects by agent and by status
  else if (reportType === "rendimiento") {
    // Add prospects by agent sheets
    const prospectsByAgent = getProspectsByAgent();
    createCategorySheets(wb, prospectsByAgent);
    
    // Add prospects by status sheets
    const prospectsByStatus = getProspectsByStatus();
    const statusSheetName = "Prospectos por Estado";
    const allProspectsByStatus = Object.values(prospectsByStatus).flat();
    const allStatusWs = XLSX.utils.json_to_sheet(allProspectsByStatus);
    XLSX.utils.book_append_sheet(wb, allStatusWs, statusSheetName);
    
    // Add individual status sheets
    Object.entries(prospectsByStatus).forEach(([status, prospects]) => {
      if (prospects.length > 0) {
        const statusWs = XLSX.utils.json_to_sheet(prospects);
        // Prefix "Estado-" and limit sheet name to 31 characters (Excel limitation)
        const sheetName = "Estado-" + status.substring(0, 22) + (status.length > 22 ? "..." : "");
        XLSX.utils.book_append_sheet(wb, statusWs, sheetName);
      }
    });
  }
  
  return wb;
};
