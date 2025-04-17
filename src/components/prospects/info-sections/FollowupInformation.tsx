
import React from "react";
import { Calendar, User } from "lucide-react";

interface FollowupInformationProps {
  contactDate: string;
  agent: string;
}

const FollowupInformation: React.FC<FollowupInformationProps> = ({
  contactDate,
  agent
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">Información de Seguimiento</p>
      <div className="space-y-2">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
          <span>Fecha de contacto: {new Date(contactDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-500" />
          <span>Agente asignado: {agent}</span>
        </div>
      </div>
    </div>
  );
};

export default FollowupInformation;
