
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Home, Phone, Users } from "lucide-react";

interface MetricsCardsProps {
  metrics: {
    nuevos: number;
    contactados: number;
    citas: number;
    cerrados: number;
  };
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0ms' }}>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Nuevos Prospectos</p>
              <p className="text-2xl font-bold">{metrics.nuevos}</p>
            </div>
            <div className="bg-blue-100 p-2 rounded-full transition-all duration-200 hover:scale-110">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '150ms' }}>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Contactados</p>
              <p className="text-2xl font-bold">{metrics.contactados}</p>
            </div>
            <div className="bg-yellow-100 p-2 rounded-full transition-all duration-200 hover:scale-110">
              <Phone className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Citas Agendadas</p>
              <p className="text-2xl font-bold">{metrics.citas}</p>
            </div>
            <div className="bg-purple-100 p-2 rounded-full transition-all duration-200 hover:scale-110">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Cerrados</p>
              <p className="text-2xl font-bold">{metrics.cerrados}</p>
            </div>
            <div className="bg-green-100 p-2 rounded-full transition-all duration-200 hover:scale-110">
              <Home className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsCards;
