
import React, { useState } from "react";
import { Building, Percent, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ClosingInformationProps {
  propertyId: string;
  commissionPercentage: string;
  onUpdate: (propertyId: string, commissionPercentage: string) => void;
}

const ClosingInformation: React.FC<ClosingInformationProps> = ({
  propertyId,
  commissionPercentage,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [propertyIdValue, setPropertyIdValue] = useState(propertyId || "");
  const [commissionValue, setCommissionValue] = useState(commissionPercentage || "");

  const handleStartEdit = () => {
    setPropertyIdValue(propertyId || "");
    setCommissionValue(commissionPercentage || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(propertyIdValue, commissionValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="mt-6 bg-green-50 p-4 rounded-md border border-green-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-green-800">Información de Cierre</h3>
        {!isEditing && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleStartEdit}
            className="text-green-700 border-green-200 hover:bg-green-100"
          >
            Editar información
          </Button>
        )}
        {isEditing && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCancel}
              className="text-gray-600"
            >
              <X className="h-4 w-4 mr-1" /> Cancelar
            </Button>
            <Button 
              size="sm"
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-1" /> Guardar
            </Button>
          </div>
        )}
      </div>
      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-2 text-green-600" />
            <span className="text-green-700">Propiedad vendida: {propertyId}</span>
          </div>
          <div className="flex items-center">
            <Percent className="h-4 w-4 mr-2 text-green-600" />
            <span className="text-green-700">Porcentaje de comisión: {commissionPercentage}%</span>
          </div>
        </div>
      )}
      {isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-green-600" />
            <Input 
              value={propertyIdValue}
              onChange={(e) => setPropertyIdValue(e.target.value)}
              placeholder="ID de Propiedad"
            />
          </div>
          <div className="flex items-center gap-2">
            <Percent className="h-4 w-4 text-green-600" />
            <Input 
              value={commissionValue}
              onChange={(e) => setCommissionValue(e.target.value)}
              placeholder="% Comisión"
              type="number"
              step="0.1"
              min="0"
              max="100"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClosingInformation;
