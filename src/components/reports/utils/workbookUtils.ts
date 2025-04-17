
import * as XLSX from 'xlsx';
import { getReportDataByType } from './reportDataUtils';
import { 
  getProspectsBySource,
  getProspectsByStatus,
  getProspectsBySector,
  getProspectsByAgent
} from './dataOrganizers';

// Generate Excel workbook based on report type and timeframe
export const generateExcelWorkbook = (reportType: string, timeframe: string) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Add the summary data as the first sheet
  const summaryData = getReportDataByType(reportType);
  const summaryWs = XLSX.utils.json_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(wb, summaryWs, "Resumen");
  
  // If this is a source report, add detailed prospect data by source
  if (reportType === "fuente") {
    const prospectsBySource = getProspectsBySource();
    
    // Create a sheet with all prospects
    const allProspectsData = Object.values(prospectsBySource).flat();
    const allProspectsWs = XLSX.utils.json_to_sheet(allProspectsData);
    XLSX.utils.book_append_sheet(wb, allProspectsWs, "Todos los Prospectos");
    
    // Create individual sheets for each source
    Object.entries(prospectsBySource).forEach(([source, prospects]) => {
      if (prospects.length > 0) {
        const sourceWs = XLSX.utils.json_to_sheet(prospects);
        // Limit sheet name to 31 characters (Excel limitation)
        const sheetName = source.substring(0, 28) + (source.length > 28 ? "..." : "");
        XLSX.utils.book_append_sheet(wb, sourceWs, sheetName);
      }
    });
  }
  
  // If this is a status report, add detailed prospect data by status
  if (reportType === "estado") {
    const prospectsByStatus = getProspectsByStatus();
    
    // Create a sheet with all prospects
    const allProspectsData = Object.values(prospectsByStatus).flat();
    const allProspectsWs = XLSX.utils.json_to_sheet(allProspectsData);
    XLSX.utils.book_append_sheet(wb, allProspectsWs, "Todos los Prospectos");
    
    // Create individual sheets for each status
    Object.entries(prospectsByStatus).forEach(([status, prospects]) => {
      if (prospects.length > 0) {
        const statusWs = XLSX.utils.json_to_sheet(prospects);
        // Limit sheet name to 31 characters (Excel limitation)
        const sheetName = status.substring(0, 28) + (status.length > 28 ? "..." : "");
        XLSX.utils.book_append_sheet(wb, statusWs, sheetName);
      }
    });
  }
  
  // If this is a sector report, add detailed prospect data by sector
  if (reportType === "sector") {
    const prospectsBySector = getProspectsBySector();
    
    // Create a sheet with all prospects
    const allProspectsData = Object.values(prospectsBySector).flat();
    const allProspectsWs = XLSX.utils.json_to_sheet(allProspectsData);
    XLSX.utils.book_append_sheet(wb, allProspectsWs, "Todos los Prospectos");
    
    // Create individual sheets for each sector
    Object.entries(prospectsBySector).forEach(([sector, prospects]) => {
      if (prospects.length > 0) {
        const sectorWs = XLSX.utils.json_to_sheet(prospects);
        // Limit sheet name to 31 characters (Excel limitation)
        const sheetName = sector.substring(0, 28) + (sector.length > 28 ? "..." : "");
        XLSX.utils.book_append_sheet(wb, sectorWs, sheetName);
      }
    });
  }
  
  // If this is an agent report, add detailed prospect data by agent
  if (reportType === "agente") {
    const prospectsByAgent = getProspectsByAgent();
    
    // Create a sheet with all prospects
    const allProspectsData = Object.values(prospectsByAgent).flat();
    const allProspectsWs = XLSX.utils.json_to_sheet(allProspectsData);
    XLSX.utils.book_append_sheet(wb, allProspectsWs, "Todos los Prospectos");
    
    // Create individual sheets for each agent
    Object.entries(prospectsByAgent).forEach(([agent, prospects]) => {
      if (prospects.length > 0) {
        const agentWs = XLSX.utils.json_to_sheet(prospects);
        // Limit sheet name to 31 characters (Excel limitation)
        const sheetName = agent.substring(0, 28) + (agent.length > 28 ? "..." : "");
        XLSX.utils.book_append_sheet(wb, agentWs, sheetName);
      }
    });
  }
  
  return wb;
};
