
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Home, MapPin, Phone, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProspectStatusBadge from "@/components/ProspectStatusBadge";
import { Prospect, ProspectStatus } from "@/models/Prospect";

interface ProspectCardProps {
  prospect: Prospect;
  onStatusChange?: (id: number, status: ProspectStatus) => void;
}

const ProspectCard: React.FC<ProspectCardProps> = ({ prospect, onStatusChange }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/prospectos/${prospect.id}`);
  };

  const handleCallClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${prospect.phone}`;
  };

  const handleScheduleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/prospectos/${prospect.id}?tab=appointments`);
  };

  return (
    <Card className="prospect-card-hover cursor-pointer transition-all hover:shadow-md">
      <CardContent className="p-4" onClick={handleCardClick}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium">{prospect.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Phone className="h-3 w-3 mr-1" />
              <span>{prospect.phone}</span>
            </div>
          </div>
          <ProspectStatusBadge status={prospect.status} />
        </div>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <span>{prospect.sector} - {prospect.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Home className="h-4 w-4 mr-2 text-gray-500" />
            <span>{prospect.priceRange} • {prospect.creditType}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
            <span>{new Date(prospect.contactDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            <span>{prospect.agent}</span>
          </div>
          {prospect.source && (
            <div className="flex items-center text-sm">
              <ExternalLink className="h-4 w-4 mr-2 text-gray-500" />
              <span>Fuente: {prospect.source}</span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-3 pt-3 border-t">
          <Button size="sm" variant="outline" className="flex-1" onClick={handleCallClick}>
            <Phone className="h-3 w-3 mr-1" /> Llamar
          </Button>
          <Button size="sm" variant="default" className="flex-1" onClick={handleScheduleClick}>
            <Calendar className="h-3 w-3 mr-1" /> Agendar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProspectCard;
