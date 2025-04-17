
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DownloadButtonProps {
  reportType: string;
  timeframe: string;
  getData: () => any[];
}

export const DownloadButton = ({ reportType, timeframe, getData }: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
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

  const handleDownloadReport = () => {
    setIsDownloading(true);

    try {
      const dataToExport = getData();
      const filename = `reporte-${reportType}-${timeframe}.csv`;
      
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
        description: `Se ha descargado el reporte de ${reportType} para el ${timeframe === 'mes' ? 'último mes' : 
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
    <Button 
      variant="outline" 
      disabled={isDownloading}
      onClick={handleDownloadReport}
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
  );
};
