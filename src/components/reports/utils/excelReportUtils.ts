
import * as XLSX from 'xlsx';
import { mockProspects } from "@/models/Prospect";
import { reportTypes } from "../reportData";

// Get prospects data organized by source
export const getProspectsBySource = () => {
  const prospectsBySource: Record<string, any[]> = {};
  
  mockProspects.forEach(prospect => {
    const source = prospect.source || "Desconocido";
    if (!prospectsBySource[source]) {
      prospectsBySource[source] = [];
    }
    prospectsBySource[source].push({
      ID: prospect.id,
      Nombre: prospect.name,
      Teléfono: prospect.phone,
      Email: prospect.email || "",
      Ubicación: prospect.location,
      Sector: prospect.sector,
      "Rango de Precio": prospect.priceRange,
      "Tipo de Crédito": prospect.creditType,
      "Fecha de Contacto": prospect.contactDate,
      Agente: prospect.agent,
      Estado: prospect.status,
      Notas: prospect.notes || ""
    });
  });
  
  return prospectsBySource;
};

// Get prospects data organized by status
export const getProspectsByStatus = () => {
  const prospectsByStatus: Record<string, any[]> = {};
  
  mockProspects.forEach(prospect => {
    const status = prospect.status || "Desconocido";
    if (!prospectsByStatus[status]) {
      prospectsByStatus[status] = [];
    }
    prospectsByStatus[status].push({
      ID: prospect.id,
      Nombre: prospect.name,
      Teléfono: prospect.phone,
      Email: prospect.email || "",
      Ubicación: prospect.location,
      Sector: prospect.sector,
      "Rango de Precio": prospect.priceRange,
      "Tipo de Crédito": prospect.creditType,
      "Fecha de Contacto": prospect.contactDate,
      Agente: prospect.agent,
      Fuente: prospect.source || "Desconocido",
      Notas: prospect.notes || ""
    });
  });
  
  return prospectsByStatus;
};

// Convert data to CSV format
export const convertToCSV = (data: any[]) => {
  if (!data || !data.length) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  csvRows.push(headers.join(','));
  
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') 
        ? `"${value}"` 
        : value;
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

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
    case "rendimiento":
      return reportTypes.prospectsByAgent;
    default:
      return [];
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
  
  return wb;
};

// Get filename for the report
export const getReportFilename = (reportLabel: string, timeframe: string) => {
  return `reporte-${reportLabel}-${timeframe}.xlsx`;
};
