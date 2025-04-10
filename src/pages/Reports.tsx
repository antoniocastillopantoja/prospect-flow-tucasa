
import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ReportsPage = () => {
  const [timeframe, setTimeframe] = useState("mes");
  const [reportType, setReportType] = useState("prospectos");
  
  // Datos de ejemplo para gráficos
  const prospectsBySource = [
    { name: "Facebook", value: 45 },
    { name: "Instagram", value: 28 },
    { name: "TikTok", value: 15 },
    { name: "Sitio Web", value: 32 },
    { name: "Referidos", value: 20 }
  ];
  
  const prospectsByStatus = [
    { name: "Nuevos", value: 35, color: "#3182CE" },
    { name: "Contactados", value: 45, color: "#ECC94B" },
    { name: "Cita Agendada", value: 25, color: "#805AD5" },
    { name: "Cita Cancelada", value: 15, color: "#E53E3E" },
    { name: "Cerrados", value: 18, color: "#48BB78" }
  ];
  
  const prospectsBySector = [
    { name: "Norte", nuevos: 15, contactados: 12, citas: 8, cerrados: 5 },
    { name: "Sur", nuevos: 25, contactados: 20, citas: 10, cerrados: 7 },
    { name: "Centro", nuevos: 18, contactados: 15, citas: 9, cerrados: 6 }
  ];
  
  const prospectsByAgent = [
    { name: "Juan Pérez", nuevos: 22, contactados: 18, citas: 12, cerrados: 8 },
    { name: "Ana Rodríguez", nuevos: 28, contactados: 20, citas: 15, cerrados: 9 },
    { name: "Pedro Ramírez", nuevos: 15, contactados: 12, citas: 8, cerrados: 4 }
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Reportes</h1>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Descargar Reporte
        </Button>
      </div>
      
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
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select value={reportType} onValueChange={setReportType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Tipo de reporte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="prospectos">Prospectos</SelectItem>
            <SelectItem value="conversion">Conversión</SelectItem>
            <SelectItem value="agentes">Rendimiento de Agentes</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semana">Última Semana</SelectItem>
            <SelectItem value="mes">Último Mes</SelectItem>
            <SelectItem value="trimestre">Último Trimestre</SelectItem>
            <SelectItem value="anio">Último Año</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="graficos">
        <TabsList>
          <TabsTrigger value="graficos">Gráficos</TabsTrigger>
          <TabsTrigger value="tablas">Tablas</TabsTrigger>
        </TabsList>
        <TabsContent value="graficos" className="space-y-6 mt-6">
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
        </TabsContent>
        
        <TabsContent value="tablas" className="space-y-6 mt-6">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
