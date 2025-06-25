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
  Cell
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getProspectsBySource } from "../utils/dataOrganizers/prospectsBySource";
import { getProspectsByStatus } from "../utils/dataOrganizers/prospectsByStatus";
import { getProspectsBySector } from "../utils/dataOrganizers/prospectsBySector";
import { getProspectsByAgent } from "../utils/dataOrganizers/prospectsByAgent";

export const ProspectCharts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [prospectsBySource, setProspectsBySource] = useState<any[]>([]);
  const [prospectsByStatus, setProspectsByStatus] = useState<any[]>([]);
  const [prospectsBySector, setProspectsBySector] = useState<any[]>([]);
  const [prospectsByAgent, setProspectsByAgent] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fuente
        const sourceData = await getProspectsBySource();
        setProspectsBySource(
          Object.entries(sourceData).map(([name, items]) => ({
            name,
            value: items.length
          }))
        );
        // Estado
        const statusData = await getProspectsByStatus();
        setProspectsByStatus(
          Object.entries(statusData).map(([name, items], idx) => ({
            name,
            value: items.length,
            color: ["#3182CE", "#ECC94B", "#805AD5", "#E53E3E", "#48BB78"][idx % 5]
          }))
        );
        // Sector
        const sectorData = await getProspectsBySector();
        setProspectsBySector(
          Object.entries(sectorData).map(([name, items]) => ({
            name,
            nuevos: items.filter((i: any) => i.Estado === "new").length,
            contactados: items.filter((i: any) => i.Estado === "contacted").length,
            citas: items.filter((i: any) => i.Estado === "appointment").length,
            cerrados: items.filter((i: any) => i.Estado === "closed").length
          }))
        );
        // Agente
        const agentData = await getProspectsByAgent();
        setProspectsByAgent(
          Object.entries(agentData).map(([name, items]) => ({
            name,
            nuevos: items.filter((i: any) => i.Estado === "new").length,
            contactados: items.filter((i: any) => i.Estado === "contacted").length,
            citas: items.filter((i: any) => i.Estado === "appointment").length,
            cerrados: items.filter((i: any) => i.Estado === "closed").length
          }))
        );
      } catch (err: any) {
        setError("Error al cargar los datos de los reportes");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Cargando reportes...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
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
  );
};
