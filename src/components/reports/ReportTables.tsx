
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportTablesProps {
  activeTab: string;
}

export const ReportTables = ({ activeTab }: ReportTablesProps) => {
  if (activeTab !== "tablas") return null;

  return (
    <div className="space-y-6 mt-6">
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
      
      <Card>
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
    </div>
  );
};
