
import React from "react";
import ProspectStatusBadge from "@/components/ProspectStatusBadge";
import { ProspectStatus } from "@/models/Prospect";

interface ProspectStatusDisplayProps {
  status: ProspectStatus;
}

const ProspectStatusDisplay: React.FC<ProspectStatusDisplayProps> = ({
  status
}) => {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">Estado Actual</p>
      <div className="flex items-center">
        <ProspectStatusBadge status={status} />
      </div>
    </div>
  );
};

export default ProspectStatusDisplay;
