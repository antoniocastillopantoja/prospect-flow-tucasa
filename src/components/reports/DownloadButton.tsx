
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

interface DownloadButtonProps {
  reportType: string;
  timeframe: string;
  getData: () => any[];
}

export const DownloadButton = ({ reportType, timeframe, getData }: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState<string>("fuente");
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

  const handleDownloadReport = () => {
    setIsDownloading(true);

    try {
      const dataToExport = getReportDataByType();
      const reportLabel = getReportLabel();
      const filename = `reporte-${reportLabel}-${timeframe}.csv`;
      
      const csvData = convertToCSV(dataToExport);

      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Reporte descargado",
        description: `Se ha descargado el reporte de ${reportLabel} para el ${timeframe === 'mes' ? 'último mes' : 
          timeframe === 'semana' ? 'última semana' : 
          timeframe === 'trimestre' ? 'último trimestre' : 'último año'}`,
        variant: "default",
      });
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
        <DropdownMenuItem 
          onClick={() => setSelectedReportType("fuente")}
          className={selectedReportType === "fuente" ? "bg-accent" : ""}
        >
          Prospectos por fuente
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSelectedReportType("estado")}
          className={selectedReportType === "estado" ? "bg-accent" : ""}
        >
          Prospectos por estado
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSelectedReportType("sector")}
          className={selectedReportType === "sector" ? "bg-accent" : ""}
        >
          Prospectos por sector
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSelectedReportType("agente")}
          className={selectedReportType === "agente" ? "bg-accent" : ""}
        >
          Prospectos por agente
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setSelectedReportType("rendimiento")}
          className={selectedReportType === "rendimiento" ? "bg-accent" : ""}
        >
          Rendimiento de agentes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDownloadReport}>
          <FileDown className="h-4 w-4 mr-2" /> 
          Descargar {getReportLabel()}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
