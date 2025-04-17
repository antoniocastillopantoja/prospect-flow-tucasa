
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { reportData } from "../reportData";

export const AgentCharts = () => {
  const { agentPerformanceData } = reportData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Rendimiento de Agentes</CardTitle>
          <CardDescription>Comparativa de efectividad de los agentes de ventas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={agentPerformanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="agente" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="prospectos" fill="#8884d8" name="Prospectos" />
                <Bar yAxisId="left" dataKey="citas" fill="#82ca9d" name="Citas" />
                <Bar yAxisId="left" dataKey="ventas" fill="#ffc658" name="Ventas cerradas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Tasas de Conversión por Agente</CardTitle>
          <CardDescription>Efectividad en cerrar ventas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={agentPerformanceData.map(agent => ({
                  agente: agent.agente,
                  conversion: parseFloat(agent.conversion.replace('%', ''))
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="agente" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Conversión']} />
                <Bar dataKey="conversion" fill="#8884d8" name="Tasa de conversión" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Comisiones Generadas</CardTitle>
          <CardDescription>Total de comisiones por agente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={agentPerformanceData.map(agent => ({
                  agente: agent.agente,
                  comision: parseInt(agent.comision.replace('$', '').replace(',', ''))
                }))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="agente" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Comisión']} />
                <Bar dataKey="comision" fill="#82ca9d" name="Comisión generada" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
