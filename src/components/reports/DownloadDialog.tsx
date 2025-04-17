
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { getTimeframeDescription } from "./utils/reportLabels";

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportLabel: string;
  timeframe: string;
  isSourceReport: boolean;
  isStatusReport: boolean;
  isSectorReport: boolean;
  onDownload: () => void;
  isDownloading: boolean;
}

export const DownloadDialog = ({
  open,
  onOpenChange,
  reportLabel,
  timeframe,
  isSourceReport,
  isStatusReport,
  isSectorReport,
  onDownload,
  isDownloading
}: DownloadDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Descargar Reporte</DialogTitle>
          <DialogDescription>
            ¿Desea descargar el reporte de {reportLabel} para el {getTimeframeDescription(timeframe)}?
            {isSourceReport && (
              <p className="mt-2">
                Este reporte incluirá hojas adicionales con los datos completos de cada prospecto organizados por fuente.
              </p>
            )}
            {isStatusReport && (
              <p className="mt-2">
                Este reporte incluirá hojas adicionales con los datos completos de cada prospecto organizados por estado.
              </p>
            )}
            {isSectorReport && (
              <p className="mt-2">
                Este reporte incluirá hojas adicionales con los datos completos de cada prospecto organizados por sector.
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button 
            onClick={onDownload}
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
  );
};
