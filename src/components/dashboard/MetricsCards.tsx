
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Home, Phone, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const cards = [
    {
      title: "Nuevos Prospectos",
      value: metrics.nuevos,
      icon: Users,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      delay: "0ms",
      onClick: () => navigate("/prospectos", { state: { filter: "new" } })
    },
    {
      title: "Contactados",
      value: metrics.contactados,
      icon: Phone,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
      delay: "150ms",
      onClick: () => navigate("/prospectos", { state: { filter: "contacted" } })
    },
    {
      title: "Citas Agendadas",
      value: metrics.citas,
      icon: Calendar,
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      delay: "300ms",
      onClick: () => navigate("/calendario")
    },
    {
      title: "Cerrados",
      value: metrics.cerrados,
      icon: Home,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      delay: "450ms",
      onClick: () => navigate("/prospectos", { state: { filter: "closed" } })
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <Card 
          key={index} 
          className="transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 animate-fade-in cursor-pointer" 
          style={{ animationDelay: card.delay }}
          onClick={card.onClick}
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
              <div className={`${card.bgColor} p-2 rounded-full transition-all duration-200 hover:scale-110`}>
                <card.icon className={`h-5 w-5 ${card.textColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
