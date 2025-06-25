import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getProspectsBySource } from "./utils/dataOrganizers/prospectsBySource";
import { getProspectsByAgent } from "./utils/dataOrganizers/prospectsByAgent";
import { getProspectsBySector } from "./utils/dataOrganizers/prospectsBySector";
import { getProspectsByStatus } from "./utils/dataOrganizers/prospectsByStatus";
import { getCommissionsByAgent } from "./utils/dataOrganizers/commissionsByAgent";

interface ReportTablesProps {
  activeTab: string;
  reportType?: string;
}

export const ReportTables = ({ activeTab, reportType = "prospectos" }: ReportTablesProps) => {
  if (activeTab !== "tablas") return null;

  // Estado para la tabla de fuente
  const [loadingSource, setLoadingSource] = useState(true);
  const [errorSource, setErrorSource] = useState<string | null>(null);
  const [sourceRows, setSourceRows] = useState<any[]>([]);

  useEffect(() => {
    const fetchSource = async () => {
      setLoadingSource(true);
      setErrorSource(null);
      try {
        const sourceData = await getProspectsBySource();
        const rows = Object.entries(sourceData).map(([name, items]) => ({
          name,
          prospectos: items.length,
          citas: items.filter((i: any) => i.Estado === "appointment").length,
          ventas: items.filter((i: any) => i.Estado === "closed").length,
          conversion: items.length > 0 ? `${((items.filter((i: any) => i.Estado === "closed").length / items.length) * 100).toFixed(1)}%` : "0%"
        }));
        setSourceRows(rows);
      } catch (err) {
        setErrorSource("Error al cargar datos de fuente");
      }
      setLoadingSource(false);
    };
    fetchSource();
  }, []);

  const renderProspectsTable = () => (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Datos</CardTitle>
          <CardDescription>Vista tabular de métricas clave</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Métrica</th>
                  <th className="text-right p-2">Este mes</th>
                  <th className="text-right p-2">Mes anterior</th>
                  <th className="text-right p-2">Cambio</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Nuevos prospectos</td>
                  <td className="text-right p-2">138</td>
                  <td className="text-right p-2">123</td>
                  <td className="text-right text-green-600 p-2">+12%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Citas agendadas</td>
                  <td className="text-right p-2">87</td>
                  <td className="text-right p-2">72</td>
                  <td className="text-right text-green-600 p-2">+20.8%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Citas realizadas</td>
                  <td className="text-right p-2">65</td>
                  <td className="text-right p-2">59</td>
                  <td className="text-right text-green-600 p-2">+10.2%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Ventas cerradas</td>
                  <td className="text-right p-2">25</td>
                  <td className="text-right p-2">21</td>
                  <td className="text-right text-green-600 p-2">+19%</td>
                </tr>
                <tr>
                  <td className="p-2">Tasa de conversión</td>
                  <td className="text-right p-2">18.5%</td>
                  <td className="text-right p-2">17.1%</td>
                  <td className="text-right text-green-600 p-2">+1.4%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Detalle por Fuente</CardTitle>
          <CardDescription>Rendimiento por canal de origen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {loadingSource ? (
              <div className="p-4 text-center">Cargando datos...</div>
            ) : errorSource ? (
              <div className="p-4 text-center text-red-600">{errorSource}</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Fuente</th>
                    <th className="text-right p-2">Prospectos</th>
                    <th className="text-right p-2">Citas</th>
                    <th className="text-right p-2">Ventas</th>
                    <th className="text-right p-2">Tasa de conversión</th>
                  </tr>
                </thead>
                <tbody>
                  {sourceRows.map((row, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="p-2">{row.name}</td>
                      <td className="text-right p-2">{row.prospectos}</td>
                      <td className="text-right p-2">{row.citas}</td>
                      <td className="text-right p-2">{row.ventas}</td>
                      <td className="text-right p-2">{row.conversion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );

  // Tabla de agentes
  const [loadingAgent, setLoadingAgent] = useState(true);
  const [errorAgent, setErrorAgent] = useState<string | null>(null);
  const [agentRows, setAgentRows] = useState<any[]>([]);

  useEffect(() => {
    const fetchAgent = async () => {
      setLoadingAgent(true);
      setErrorAgent(null);
      try {
        const data = await getProspectsByAgent();
        const rows = Object.entries(data).map(([agente, items]: any) => {
          const prospectos = items.length;
          const citas = items.filter((i: any) => i.Estado === "appointment").length;
          const ventas = items.filter((i: any) => i.Estado === "closed").length;
          const conversion = prospectos > 0 ? `${((ventas / prospectos) * 100).toFixed(1)}%` : "0%";
          // Comisiones: sumar campo "Monto Comisión" si existe
          const comision = items.reduce((sum: number, i: any) => {
            if (i["Monto Comisión"]) {
              const val = parseFloat((i["Monto Comisión"]+"").replace(/[^\d.]/g, ""));
              return sum + (isNaN(val) ? 0 : val);
            }
            return sum;
          }, 0);
          return { agente, prospectos, citas, ventas, conversion, comision: comision ? `$${comision.toLocaleString()}` : "$0" };
        });
        setAgentRows(rows);
      } catch (err) {
        setErrorAgent("Error al cargar datos de agentes");
      }
      setLoadingAgent(false);
    };
    fetchAgent();
  }, []);

  const renderAgentsTable = () => (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento de Agentes</CardTitle>
        <CardDescription>Comparativa detallada del desempeño de los agentes de ventas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {loadingAgent ? (
            <div className="p-4 text-center">Cargando datos...</div>
          ) : errorAgent ? (
            <div className="p-4 text-center text-red-600">{errorAgent}</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agente</TableHead>
                  <TableHead className="text-right">Prospectos</TableHead>
                  <TableHead className="text-right">Citas</TableHead>
                  <TableHead className="text-right">Ventas</TableHead>
                  <TableHead className="text-right">Conversión</TableHead>
                  <TableHead className="text-right">Comisión</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentRows.map((agent, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{agent.agente}</TableCell>
                    <TableCell className="text-right">{agent.prospectos}</TableCell>
                    <TableCell className="text-right">{agent.citas}</TableCell>
                    <TableCell className="text-right">{agent.ventas}</TableCell>
                    <TableCell className="text-right">{agent.conversion}</TableCell>
                    <TableCell className="text-right">{agent.comision}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (reportType) {
      case 'conversion':
        return renderConversionTable();
      case 'agentes':
        return renderAgentsTable();
      case 'prospectos':
      default:
        return renderProspectsTable();
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {renderContent()}
    </div>
  );
};
