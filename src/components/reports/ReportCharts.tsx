
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  FunnelChart,
  Funnel,
  FunnelItem
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { reportData } from "./reportData";
import { useState, useEffect } from "react";

interface ReportChartsProps {
  activeTab: string;
  reportType?: string;
}

export const ReportCharts = ({ activeTab, reportType = "prospectos" }: ReportChartsProps) => {
  if (activeTab !== "graficos") return null;

  const { prospectsBySource, prospectsByStatus, prospectsBySector, prospectsByAgent, conversionData, agentPerformanceData } = reportData;

  const renderProspectReports = () => (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Prospectos por Fuente</CardTitle>
            <CardDescription>Distribución de prospectos según canal de origen</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={prospectsBySource}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#3182CE" name="Prospectos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Estado de Prospectos</CardTitle>
            <CardDescription>Distribución de prospectos por estado actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prospectsByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {prospectsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Prospectos por Sector</CardTitle>
            <CardDescription>Comparativa de prospectos por ubicación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={prospectsBySector}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="nuevos" fill="#3182CE" name="Nuevos" />
                  <Bar dataKey="contactados" fill="#ECC94B" name="Contactados" />
                  <Bar dataKey="citas" fill="#805AD5" name="Citas" />
                  <Bar dataKey="cerrados" fill="#48BB78" name="Cerrados" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento por Agente</CardTitle>
            <CardDescription>Métricas comparativas entre agentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={prospectsByAgent}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="nuevos" fill="#3182CE" name="Nuevos" />
                  <Bar dataKey="contactados" fill="#ECC94B" name="Contactados" />
                  <Bar dataKey="citas" fill="#805AD5" name="Citas" />
                  <Bar dataKey="cerrados" fill="#48BB78" name="Cerrados" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderConversionReports = () => (
    <>
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
                  <Legend />
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
    </>
  );

  const renderAgentReports = () => (
    <>
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
    </>
  );

  const renderReportContent = () => {
    switch (reportType) {
      case 'conversion':
        return renderConversionReports();
      case 'agentes':
        return renderAgentReports();
      case 'prospectos':
      default:
        return renderProspectReports();
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {renderReportContent()}
    </div>
  );
};
