
import React from "react";
import { Home, MapPin } from "lucide-react";

interface PropertyPreferencesProps {
  priceRange: string;
  sector: string;
  location: string;
}

const PropertyPreferences: React.FC<PropertyPreferencesProps> = ({
  priceRange,
  sector,
  location
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">Preferencias de Propiedad</p>
      <div className="space-y-2">
        <div className="flex items-center">
          <Home className="h-4 w-4 mr-2 text-gray-500" />
          <span>{priceRange}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
          <span>{sector} - {location}</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyPreferences;
