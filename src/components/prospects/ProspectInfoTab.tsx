
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Phone, Mail, Home, MapPin, CreditCard, Calendar, Building, Percent, CheckCircle, X } from "lucide-react";
import { Prospect } from "@/models/Prospect";
import ProspectStatusBadge from "@/components/ProspectStatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProspectInfoTabProps {
  prospect: Prospect;
  onUpdateClosingInfo?: (propertyId: string, commissionPercentage: string) => void;
}

const ProspectInfoTab: React.FC<ProspectInfoTabProps> = ({ prospect, onUpdateClosingInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [propertyId, setPropertyId] = useState(prospect.propertyId || "");
  const [commissionPercentage, setCommissionPercentage] = useState(prospect.commissionPercentage || "");

  const handleStartEdit = () => {
    setPropertyId(prospect.propertyId || "");
    setCommissionPercentage(prospect.commissionPercentage || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    if (onUpdateClosingInfo) {
      onUpdateClosingInfo(propertyId, commissionPercentage);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const isClosedProspect = prospect.status === "closed";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Información de Contacto</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{prospect.name}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{prospect.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{prospect.email || "No disponible"}</span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Preferencias de Propiedad</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{prospect.priceRange}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{prospect.sector} - {prospect.location}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Información Financiera</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Crédito: {prospect.creditType}</span>
                </div>
                {isClosedProspect && !isEditing && (
                  <>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Propiedad ID: {prospect.propertyId}</span>
                    </div>
                    <div className="flex items-center">
                      <Percent className="h-4 w-4 mr-2 text-gray-500" />
                      <span>Comisión: {prospect.commissionPercentage}%</span>
                    </div>
                  </>
                )}

                {isClosedProspect && isEditing && (
                  <>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500" />
                      <Input 
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                        placeholder="ID de Propiedad"
                        className="h-8 py-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-gray-500" />
                      <Input 
                        value={commissionPercentage}
                        onChange={(e) => setCommissionPercentage(e.target.value)}
                        placeholder="% Comisión"
                        type="number"
                        step="0.1"
                        min="0"
                        max="100"
                        className="h-8 py-1"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Información de Seguimiento</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Fecha de contacto: {new Date(prospect.contactDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Agente asignado: {prospect.agent}</span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-500 mb-1">Estado Actual</p>
              <div className="flex items-center">
                <ProspectStatusBadge status={prospect.status} />
              </div>
            </div>
          </div>
        </div>

        {/* Display closing information in a highlighted section when the prospect is closed */}
        {isClosedProspect && (
          <div className="mt-6 bg-green-50 p-4 rounded-md border border-green-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-green-800">Información de Cierre</h3>
              {!isEditing && onUpdateClosingInfo && (
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
                  <span className="text-green-700">Propiedad vendida: {prospect.propertyId}</span>
                </div>
                <div className="flex items-center">
                  <Percent className="h-4 w-4 mr-2 text-green-600" />
                  <span className="text-green-700">Porcentaje de comisión: {prospect.commissionPercentage}%</span>
                </div>
              </div>
            )}
            {isEditing && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-green-600" />
                  <Input 
                    value={propertyId}
                    onChange={(e) => setPropertyId(e.target.value)}
                    placeholder="ID de Propiedad"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-green-600" />
                  <Input 
                    value={commissionPercentage}
                    onChange={(e) => setCommissionPercentage(e.target.value)}
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
        )}
      </CardContent>
    </Card>
  );
};

export default ProspectInfoTab;
