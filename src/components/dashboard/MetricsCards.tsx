
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Home, Phone, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricsCardsProps {
  metrics: {
    nuevos: number;
    contactados: number;
    citas: number;
    cerrados: number;
  };
  loading?: boolean;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ metrics, loading = false }) => {
  const cards = [
    {
      title: "Nuevos Prospectos",
      value: metrics.nuevos,
      icon: Users,
      color: "blue",
      delay: "0ms"
    },
    {
      title: "Contactados",
      value: metrics.contactados,
      icon: Phone,
      color: "yellow", // Explicitly set color to yellow
      delay: "150ms"
    },
    {
      title: "Citas Agendadas",
      value: metrics.citas,
      icon: Calendar,
      color: "purple",
      delay: "300ms"
    },
    {
      title: "Cerrados",
      value: metrics.cerrados,
      icon: Home,
      color: "green",
      delay: "450ms"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className="transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 animate-fade-in" 
          style={{ animationDelay: card.delay }}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                {loading ? (
                  <Skeleton className="h-8 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">{card.value}</p>
                )}
              </div>
              <div className={`bg-${card.color}-100 p-2 rounded-full transition-all duration-200 hover:scale-110`}>
                <card.icon className={`h-5 w-5 text-${card.color}-600`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
