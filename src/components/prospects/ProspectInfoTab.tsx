
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Prospect } from "@/models/Prospect";

// Import our new modular components
import ContactInformation from "./info-sections/ContactInformation";
import PropertyPreferences from "./info-sections/PropertyPreferences";
import FinancialInformation from "./info-sections/FinancialInformation";
import FollowupInformation from "./info-sections/FollowupInformation";
import ProspectStatusDisplay from "./info-sections/ProspectStatusDisplay";
import ClosingInformation from "./info-sections/ClosingInformation";

interface ProspectInfoTabProps {
  prospect: Prospect;
  onUpdateClosingInfo?: (propertyId: string, commissionPercentage: string, negotiatedPrice: string) => void;
}

const ProspectInfoTab: React.FC<ProspectInfoTabProps> = ({ prospect, onUpdateClosingInfo }) => {
  const isClosedProspect = prospect.status === "closed";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ContactInformation 
              name={prospect.name} 
              phone={prospect.phone} 
              email={prospect.email} 
            />
            
            <PropertyPreferences 
              priceRange={prospect.priceRange} 
              sector={prospect.sector} 
              location={prospect.location} 
            />
          </div>
          
          <div className="space-y-4">
            <FinancialInformation creditType={prospect.creditType} />
            
            <FollowupInformation 
              contactDate={prospect.contactDate} 
              agent={prospect.agent} 
            />
            
            <ProspectStatusDisplay status={prospect.status} />
          </div>
        </div>

        {isClosedProspect && onUpdateClosingInfo && (
          <ClosingInformation
            propertyId={prospect.propertyId || ""}
            commissionPercentage={prospect.commissionPercentage || ""}
            negotiatedPrice={prospect.negotiatedPrice || ""}
            onUpdate={onUpdateClosingInfo}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ProspectInfoTab;
