
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Prospect } from "@/models/Prospect";
import ProspectStatusSelector from "./ProspectStatusSelector";

interface ProspectHeaderProps {
  prospect: Prospect;
  onStatusChange: (status: string) => void;
  onScheduleAppointment: () => void;
}

const ProspectHeader: React.FC<ProspectHeaderProps> = ({ 
  prospect, 
  onStatusChange, 
  onScheduleAppointment 
}) => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate("/prospectos")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Volver a Prospectos
      </Button>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">{prospect.name}</h1>
          <div className="flex items-center text-gray-500">
            <Phone className="h-4 w-4 mr-1" />
            <span className="mr-3">{prospect.phone}</span>
            <MapPin className="h-4 w-4 mr-1" />
            <span>{prospect.location}</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <ProspectStatusSelector 
            status={prospect.status} 
            onStatusChange={onStatusChange} 
          />
          
          <Button 
            variant="outline"
            className="flex items-center"
            onClick={() => window.location.href = `tel:${prospect.phone}`}
          >
            <Phone className="h-4 w-4 mr-2" /> Llamar
          </Button>
          
          <Button 
            variant="default"
            className="flex items-center"
            onClick={onScheduleAppointment}
          >
            <Calendar className="h-4 w-4 mr-2" /> Agendar Cita
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProspectHeader;
