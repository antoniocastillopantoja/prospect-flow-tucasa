
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Phone, Mail, Home, MapPin, CreditCard, Calendar, Building, Percent } from "lucide-react";
import { Prospect } from "@/models/Prospect";
import ProspectStatusBadge from "@/components/ProspectStatusBadge";

interface ProspectInfoTabProps {
  prospect: Prospect;
}

const ProspectInfoTab: React.FC<ProspectInfoTabProps> = ({ prospect }) => {
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
                {prospect.status === "closed" && prospect.propertyId && (
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Propiedad ID: {prospect.propertyId}</span>
                  </div>
                )}
                {prospect.status === "closed" && prospect.commissionPercentage && (
                  <div className="flex items-center">
                    <Percent className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Comisión: {prospect.commissionPercentage}%</span>
                  </div>
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
        {prospect.status === "closed" && prospect.propertyId && prospect.commissionPercentage && (
          <div className="mt-6 bg-green-50 p-4 rounded-md border border-green-200">
            <h3 className="font-medium text-green-800 mb-2">Información de Cierre</h3>
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
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProspectInfoTab;
