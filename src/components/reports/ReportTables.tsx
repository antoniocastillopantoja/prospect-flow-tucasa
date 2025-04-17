
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { reportData } from "./reportData";

interface ReportTablesProps {
  activeTab: string;
  reportType?: string;
}

export const ReportTables = ({ activeTab, reportType = "prospectos" }: ReportTablesProps) => {
  if (activeTab !== "tablas") return null;

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
                <tr className="border-b">
                  <td className="p-2">Facebook</td>
                  <td className="text-right p-2">45</td>
                  <td className="text-right p-2">26</td>
                  <td className="text-right p-2">9</td>
                  <td className="text-right p-2">20%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Instagram</td>
                  <td className="text-right p-2">28</td>
                  <td className="text-right p-2">17</td>
                  <td className="text-right p-2">5</td>
                  <td className="text-right p-2">17.9%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">TikTok</td>
                  <td className="text-right p-2">15</td>
                  <td className="text-right p-2">8</td>
                  <td className="text-right p-2">2</td>
                  <td className="text-right p-2">13.3%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Sitio Web</td>
                  <td className="text-right p-2">32</td>
                  <td className="text-right p-2">20</td>
                  <td className="text-right p-2">7</td>
                  <td className="text-right p-2">21.9%</td>
                </tr>
                <tr>
                  <td className="p-2">Referidos</td>
                  <td className="text-right p-2">20</td>
                  <td className="text-right p-2">12</td>
                  <td className="text-right p-2">4</td>
                  <td className="text-right p-2">20%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderConversionTable = () => (
    <Card>
      <CardHeader>
        <CardTitle>Embudo de Conversión</CardTitle>
        <CardDescription>Detalle del seguimiento de prospectos a través del proceso de ventas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Etapa</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Porcentaje</TableHead>
                <TableHead className="text-right">Tendencia (vs mes anterior)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.conversionData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.etapa}</TableCell>
                  <TableCell className="text-right">{item.cantidad}</TableCell>
                  <TableCell className="text-right">{item.porcentaje}</TableCell>
                  <TableCell className="text-right">
                    {index % 2 === 0 ? (
                      <span className="text-green-600">+{Math.floor(Math.random() * 5) + 1}%</span>
                    ) : (
                      <span className="text-red-600">-{Math.floor(Math.random() * 3) + 1}%</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  const renderAgentsTable = () => (
    <Card>
      <CardHeader>
        <CardTitle>Rendimiento de Agentes</CardTitle>
        <CardDescription>Comparativa detallada del desempeño de los agentes de ventas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
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
              {reportData.agentPerformanceData.map((agent, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{agent.agente}</TableCell>
                  <TableCell className="text-right">{agent.prospectos}</TableCell>
                  <TableCell className="text-right">{agent.citas}</TableCell>
                  <TableCell className="text-right">{agent.ventas}</TableCell>
                  <TableCell className="text-right">{agent.conversion}</TableCell>
                  <TableCell className="text-right">{agent.comision}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">
                  {reportData.agentPerformanceData.reduce((sum, agent) => sum + agent.prospectos, 0)}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {reportData.agentPerformanceData.reduce((sum, agent) => sum + agent.citas, 0)}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {reportData.agentPerformanceData.reduce((sum, agent) => sum + agent.ventas, 0)}
                </TableCell>
                <TableCell className="text-right font-bold">
                  {(reportData.agentPerformanceData.reduce((sum, agent) => sum + parseFloat(agent.conversion), 0) / 
                  reportData.agentPerformanceData.length).toFixed(1)}%
                </TableCell>
                <TableCell className="text-right font-bold">
                  $
                  {reportData.agentPerformanceData
                    .reduce(
                      (sum, agent) => sum + parseInt(agent.comision.replace('$', '').replace(',', '')), 
                      0
                    )
                    .toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
