
import React from "react";
import { CreditCard } from "lucide-react";

interface FinancialInformationProps {
  creditType: string;
}

const FinancialInformation: React.FC<FinancialInformationProps> = ({
  creditType
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">Información Financiera</p>
      <div className="space-y-2">
        <div className="flex items-center">
          <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
          <span>Crédito: {creditType}</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialInformation;
