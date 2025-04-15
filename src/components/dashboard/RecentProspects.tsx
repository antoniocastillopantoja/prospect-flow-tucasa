
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, MapPin } from "lucide-react";
import ProspectStatusBadge from "@/components/ProspectStatusBadge";
import "./dashboard.css";

interface Prospect {
  id: number;
  name: string;
  location: string;
  priceRange: string;
  status: string;
  createdAt: Date;
}

interface RecentProspectsProps {
  allProspects: Prospect[];
}

const RecentProspects: React.FC<RecentProspectsProps> = ({ allProspects }) => {
  const [timeframe, setTimeframe] = useState("hoy");

  // Filter prospects based on timeframe
  const filteredProspects = allProspects.filter(prospect => {
    const now = new Date();
    const prospectDate = prospect.createdAt;
    
    switch(timeframe) {
      case "hoy":
        return prospectDate.toDateString() === now.toDateString();
      case "semana":
        const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        return prospectDate >= oneWeekAgo;
      case "mes":
        const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return prospectDate >= oneMonthAgo;
      default:
        return true;
    }
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Prospectos Recientes</CardTitle>
          <Tabs value={timeframe} onValueChange={setTimeframe} className="w-fit">
            <TabsList className="h-8">
              <TabsTrigger value="hoy" className="text-xs px-3">Hoy</TabsTrigger>
              <TabsTrigger value="semana" className="text-xs px-3">Semana</TabsTrigger>
              <TabsTrigger value="mes" className="text-xs px-3">Mes</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {filteredProspects.length > 0 ? (
          <div className="space-y-4">
            {filteredProspects.map((prospect) => (
              <div 
                key={prospect.id}
                className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-1">
                  <p className="font-medium">{prospect.name}</p>
                  <ProspectStatusBadge status={prospect.status as any} />
                </div>
                <div className="flex items-center text-sm text-gray-500 space-x-3">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{prospect.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Home className="h-3 w-3 mr-1" />
                    <span>{prospect.priceRange}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No hay prospectos para este período
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentProspects;
