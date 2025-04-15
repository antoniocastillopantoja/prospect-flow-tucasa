
import React from "react";
import "@/components/dashboard/dashboard.css"; // Import CSS classes

type StatusType = "new" | "contacted" | "appointment" | "canceled" | "closed";

interface ProspectStatusBadgeProps {
  status: StatusType;
  className?: string;
}

const ProspectStatusBadge: React.FC<ProspectStatusBadgeProps> = ({ status, className = "" }) => {
  // Use the CSS classes defined in dashboard.css
  const getStatusClass = (status: StatusType) => {
    switch (status) {
      case "new": return "status-new";
      case "contacted": return "status-contacted";
      case "appointment": return "status-appointment";
      case "canceled": return "status-canceled";
      case "closed": return "status-closed";
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
