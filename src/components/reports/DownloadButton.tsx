
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
import * as XLSX from 'xlsx';
import { getReportData } from "./reportData";
import { DownloadDialog } from "./DownloadDialog";
import { 
  generateExcelWorkbook, 
  getReportFilename, 
} from "./utils/excelReportUtils";
import { 
  getReportLabel,
  getTimeframeDescription
} from "./utils/reportLabels";

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

  const handleReportTypeSelect = (type: string) => {
    setSelectedReportType(type);
    onReportTypeChange(type);
    setShowDownloadDialog(true);
  };

  const handleDownloadReport = () => {
    setIsDownloading(true);

    try {
      const reportLabel = getReportLabel(selectedReportType);
      const filename = getReportFilename(reportLabel, timeframe);
      
      // Generate Excel workbook
      const wb = generateExcelWorkbook(selectedReportType, timeframe);
      
      // Write the workbook and trigger download
      XLSX.writeFile(wb, filename);

      toast({
        title: "Reporte descargado",
        description: `Se ha descargado el reporte de ${reportLabel} para el ${getTimeframeDescription(timeframe)}`,
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

      <DownloadDialog 
        open={showDownloadDialog}
        onOpenChange={setShowDownloadDialog}
        reportLabel={getReportLabel(selectedReportType)}
        timeframe={timeframe}
        isSourceReport={selectedReportType === "fuente"}
        onDownload={handleDownloadReport}
        isDownloading={isDownloading}
      />
    </>
  );
};
