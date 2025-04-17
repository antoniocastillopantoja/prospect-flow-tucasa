
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { reportData } from "../reportData";

export const ConversionCharts = () => {
  const { conversionData } = reportData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Embudo de Conversión</CardTitle>
          <CardDescription>Seguimiento de prospectos a través del proceso de ventas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={conversionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="etapa" type="category" width={150} />
                <Tooltip 
                  formatter={(value, name, props) => [`${value} prospectos`, '']}
                  labelFormatter={(value) => `Etapa: ${value}`}
                />
                <Legend />
                <Bar dataKey="cantidad" fill="#3182CE" name="Cantidad de prospectos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Tasa de Conversión</CardTitle>
          <CardDescription>Porcentaje de conversión en cada etapa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={conversionData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="etapa" />
                <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Conversión']} />
                <Line 
                  type="monotone" 
                  dataKey={(entry) => parseInt(entry.porcentaje)} 
                  stroke="#8884d8" 
                  name="Tasa de conversión"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Métricas por Etapa</CardTitle>
          <CardDescription>Desglose detallado de conversiones</CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Etapa</th>
                <th className="text-right p-2">Cantidad</th>
                <th className="text-right p-2">Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {conversionData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.etapa}</td>
                  <td className="text-right p-2">{item.cantidad}</td>
                  <td className="text-right p-2">{item.porcentaje}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};
