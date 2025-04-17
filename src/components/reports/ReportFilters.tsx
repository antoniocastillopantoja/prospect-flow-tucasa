
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReportFiltersProps {
  reportType: string;
  timeframe: string;
  onReportTypeChange: (value: string) => void;
  onTimeframeChange: (value: string) => void;
}

export const ReportFilters = ({
  reportType,
  timeframe,
  onReportTypeChange,
  onTimeframeChange
}: ReportFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <Select value={reportType} onValueChange={onReportTypeChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Tipo de reporte" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="prospectos">Prospectos</SelectItem>
          <SelectItem value="conversion">Conversión</SelectItem>
          <SelectItem value="agentes">Rendimiento de Agentes</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={timeframe} onValueChange={onTimeframeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="semana">Última Semana</SelectItem>
          <SelectItem value="mes">Último Mes</SelectItem>
          <SelectItem value="trimestre">Último Trimestre</SelectItem>
          <SelectItem value="anio">Último Año</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
