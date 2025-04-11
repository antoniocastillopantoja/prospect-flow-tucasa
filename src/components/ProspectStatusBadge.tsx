
import React from "react";

type StatusType = "new" | "contacted" | "appointment" | "canceled" | "closed";

interface ProspectStatusBadgeProps {
  status: StatusType;
  className?: string;
}

const ProspectStatusBadge: React.FC<ProspectStatusBadgeProps> = ({ status, className = "" }) => {
  const getStatusClass = (status: StatusType) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "contacted": return "bg-yellow-100 text-yellow-800";
      case "appointment": return "bg-purple-100 text-purple-800";
      case "canceled": return "bg-red-100 text-red-800";
      case "closed": return "bg-green-100 text-green-800";
      default: return "";
    }
  };

  const getStatusText = (status: StatusType) => {
    switch (status) {
      case "new": return "Nuevo";
      case "contacted": return "Contactado";
      case "appointment": return "Cita Agendada";
      case "canceled": return "Cita Cancelada";
      case "closed": return "Cliente Cerrado";
      default: return status;
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(status)} ${className}`}>
      {getStatusText(status)}
    </span>
  );
};

export default ProspectStatusBadge;
