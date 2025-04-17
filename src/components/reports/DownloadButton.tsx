
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getReportData, reportTypes } from "./reportData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { mockProspects } from "@/models/Prospect";
import * as XLSX from 'xlsx';

interface DownloadButtonProps {
  reportType: string;
  timeframe: string;
  getData: () => any[];
  onReportTypeChange: (type: string) => void;
}

export const DownloadButton = ({ 
  reportType, 
  timeframe, 
  getData, 
  onReportTypeChange 
}: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState<string>("fuente");
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);
  const { toast } = useToast();

  const convertToCSV = (data: any[]) => {
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

  const getReportDataByType = () => {
    switch (selectedReportType) {
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
        return getData();
    }
  };

  const getReportLabel = () => {
    switch (selectedReportType) {
      case "fuente":
        return "prospectos por fuente";
      case "estado":
        return "prospectos por estado";
      case "sector":
        return "prospectos por sector";
      case "agente":
        return "prospectos por agente";
      case "rendimiento":
        return "rendimiento de agentes";
      default:
        return `reporte de ${reportType}`;
    }
  };

  const handleReportTypeSelect = (type: string) => {
    setSelectedReportType(type);
    onReportTypeChange(type);
    setShowDownloadDialog(true);
  };

  const getProspectsBySource = () => {
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

  const handleDownloadReport = () => {
    setIsDownloading(true);

    try {
      const reportLabel = getReportLabel();
      const filename = `reporte-${reportLabel}-${timeframe}.xlsx`;
      
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      
      // Add the summary data as the first sheet
      const summaryData = getReportDataByType();
      const summaryWs = XLSX.utils.json_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summaryWs, "Resumen");
      
      // If this is a source report, add detailed prospect data by source
      if (selectedReportType === "fuente") {
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
      
      // Write the workbook and trigger download
      XLSX.writeFile(wb, filename);

      toast({
        title: "Reporte descargado",
        description: `Se ha descargado el reporte de ${reportLabel} para el ${timeframe === 'mes' ? 'último mes' : 
          timeframe === 'semana' ? 'última semana' : 
          timeframe === 'trimestre' ? 'último trimestre' : 'último año'}`,
        variant: "default",
      });
      
      setShowDownloadDialog(false);
    } catch (error) {
      console.error("Error downloading report:", error);
      toast({
        title: "Error al descargar",
        description: "No se pudo descargar el reporte. Intente de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            disabled={isDownloading}
            className="gap-2"
          >
            {isDownloading ? (
              <>
                <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                Descargando...
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4" /> 
                Descargar Reporte
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Tipo de reporte</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleReportTypeSelect("fuente")}>
            Prospectos por fuente
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleReportTypeSelect("estado")}>
            Prospectos por estado
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleReportTypeSelect("sector")}>
            Prospectos por sector
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleReportTypeSelect("agente")}>
            Prospectos por agente
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleReportTypeSelect("rendimiento")}>
            Rendimiento de agentes
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Descargar Reporte</DialogTitle>
            <DialogDescription>
              ¿Desea descargar el reporte de {getReportLabel()} para el {
                timeframe === 'mes' ? 'último mes' : 
                timeframe === 'semana' ? 'última semana' : 
                timeframe === 'trimestre' ? 'último trimestre' : 'último año'
              }?
              {selectedReportType === "fuente" && (
                <p className="mt-2">
                  Este reporte incluirá hojas adicionales con los datos completos de cada prospecto organizados por fuente.
                </p>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowDownloadDialog(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleDownloadReport}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></span>
                  Descargando...
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4 mr-2" /> 
                  Descargar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
