
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProspectStatusBadge from "@/components/ProspectStatusBadge";
import { ProspectStatus } from "@/models/Prospect";

interface ProspectStatusSelectorProps {
  status: ProspectStatus;
  onStatusChange: (status: ProspectStatus) => void;
}

const ProspectStatusSelector: React.FC<ProspectStatusSelectorProps> = ({ 
  status, 
  onStatusChange 
}) => {
  return (
    <Select value={status} onValueChange={onStatusChange}>
      <SelectTrigger className="w-44">
        <div className="flex items-center">
          <ProspectStatusBadge status={status} className="ml-0 mr-2" />
          <SelectValue placeholder="Estado" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="new">Nuevo</SelectItem>
        <SelectItem value="contacted">Contactado</SelectItem>
        <SelectItem value="appointment">Cita Agendada</SelectItem>
        <SelectItem value="canceled">Cita Cancelada</SelectItem>
        <SelectItem value="closed">Cliente Cerrado</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default ProspectStatusSelector;
