
import { Card, CardContent } from "@/components/ui/card";

export const MetricCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Prospectos</p>
              <p className="text-2xl font-bold">138</p>
            </div>
            <div className="text-sm text-green-600">
              +12% <span className="text-gray-500">vs mes anterior</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Tasa de Conversión</p>
              <p className="text-2xl font-bold">18.5%</p>
            </div>
            <div className="text-sm text-green-600">
              +2.3% <span className="text-gray-500">vs mes anterior</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Ventas Cerradas</p>
              <p className="text-2xl font-bold">25</p>
            </div>
            <div className="text-sm text-green-600">
              +4 <span className="text-gray-500">vs mes anterior</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
