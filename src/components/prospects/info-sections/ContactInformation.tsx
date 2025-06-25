import React from "react";
import { User, Phone, Mail } from "lucide-react";

interface ContactInformationProps {
  name: string;
  phone: string;
  email?: string;
  avatar_url?: string;
}

// Utilidad para generar URL de avatar DiceBear
function getDiceBearAvatarUrl(seed: string) {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear&fontWeight=700`;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ 
  name, 
  phone, 
  email,
  avatar_url
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">Información de Contacto</p>
      <div className="space-y-2">
        <div className="flex items-center">
          {avatar_url ? (
            <img src={avatar_url} alt={name} className="h-6 w-6 rounded-full object-cover border mr-2" />
          ) : (
            <img src={getDiceBearAvatarUrl(name)} alt={name} className="h-6 w-6 rounded-full object-cover border mr-2" />
          )}
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
