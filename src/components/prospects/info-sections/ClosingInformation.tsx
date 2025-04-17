
import React, { useState } from "react";
import { Building, Percent, CheckCircle, X, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ClosingInformationProps {
  propertyId: string;
  commissionPercentage: string;
  negotiatedPrice?: string;
  onUpdate: (propertyId: string, commissionPercentage: string, negotiatedPrice: string) => void;
}

const ClosingInformation: React.FC<ClosingInformationProps> = ({
  propertyId,
  commissionPercentage,
  negotiatedPrice = "",
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [propertyIdValue, setPropertyIdValue] = useState(propertyId || "");
  const [commissionValue, setCommissionValue] = useState(commissionPercentage || "");
  const [priceValue, setPriceValue] = useState(negotiatedPrice || "");

  const handleStartEdit = () => {
    setPropertyIdValue(propertyId || "");
    setCommissionValue(commissionPercentage || "");
    setPriceValue(negotiatedPrice || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(propertyIdValue, commissionValue, priceValue);
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Building className="h-4 w-4 mr-2 text-green-600" />
            <span className="text-green-700">ID de Propiedad vendida: {propertyId}</span>
          </div>
          <div className="flex items-center">
            <Percent className="h-4 w-4 mr-2 text-green-600" />
            <span className="text-green-700">Porcentaje de comisión: {commissionPercentage}%</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2 text-green-600" />
            <span className="text-green-700">Precio Negociado: {negotiatedPrice ? `$${negotiatedPrice}` : 'No especificado'}</span>
          </div>
        </div>
      )}
      {isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <Input 
              value={priceValue}
              onChange={(e) => setPriceValue(e.target.value)}
              placeholder="Precio Negociado"
              type="number"
              min="0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClosingInformation;
