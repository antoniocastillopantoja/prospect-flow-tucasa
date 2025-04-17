
import React from "react";
import { User, Phone, Mail } from "lucide-react";

interface ContactInformationProps {
  name: string;
  phone: string;
  email?: string;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ 
  name, 
  phone, 
  email 
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">Información de Contacto</p>
      <div className="space-y-2">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-gray-500" />
          <span>{name}</span>
        </div>
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2 text-gray-500" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-gray-500" />
          <span>{email || "No disponible"}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
