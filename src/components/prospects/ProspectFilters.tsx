
import React from "react";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sectors } from "@/models/Prospect";

interface ProspectFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sectorFilter: string;
  setSectorFilter: (sector: string) => void;
}

const ProspectFilters: React.FC<ProspectFiltersProps> = ({
  statusFilter,
  setStatusFilter,
  sectorFilter,
  setSectorFilter
}) => {
  return (
    <div className="flex gap-2 flex-wrap md:flex-nowrap">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-gray-500" />
        <span className="text-sm text-gray-500">Filtrar:</span>
      </div>
      
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          <SelectItem value="new">Nuevo</SelectItem>
          <SelectItem value="contacted">Contactado</SelectItem>
          <SelectItem value="appointment">Cita Agendada</SelectItem>
          <SelectItem value="canceled">Cita Cancelada</SelectItem>
          <SelectItem value="closed">Cliente Cerrado</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={sectorFilter} onValueChange={setSectorFilter}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Sector" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>
          {sectors.map(sector => (
            <SelectItem key={sector} value={sector}>{sector}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProspectFilters;
