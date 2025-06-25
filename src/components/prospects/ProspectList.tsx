import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProspectCard from "@/components/ProspectCard";
import { Prospect, ProspectStatus } from "@/models/Prospect";

interface ProspectListProps {
  prospects: Prospect[];
  loading: boolean;
  onStatusChange: (id: string, status: ProspectStatus) => void;
}

const ProspectList: React.FC<ProspectListProps> = ({
  prospects,
  loading,
  onStatusChange
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="h-64 animate-pulse">
            <CardContent className="p-4">
              <div className="w-1/2 h-4 bg-gray-200 rounded mb-3"></div>
              <div className="space-y-2">
                <div className="w-full h-3 bg-gray-200 rounded"></div>
                <div className="w-full h-3 bg-gray-200 rounded"></div>
                <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {prospects.length > 0 ? (
        prospects.map((prospect) => (
          <ProspectCard 
            key={prospect.id} 
            prospect={prospect}
            onStatusChange={onStatusChange}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12 text-gray-500">
          No se encontraron prospectos con los filtros seleccionados
        </div>
      )}
    </div>
  );
};

export default ProspectList;
