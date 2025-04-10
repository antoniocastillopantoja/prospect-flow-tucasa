
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Home, MapPin, Phone, Plus, User, Users } from "lucide-react";

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState("hoy");
  
  // Mock data
  const metrics = {
    nuevos: 8,
    contactados: 15,
    citas: 5,
    cerrados: 3
  };
  
  const appointments = [
    { 
      id: 1, 
      name: "María Gómez", 
      time: "10:00 AM", 
      phone: "555-123-4567", 
      location: "Col. Roma Norte"
    },
    { 
      id: 2, 
      name: "Roberto Sánchez", 
      time: "3:00 PM", 
      phone: "555-987-6543", 
      location: "Col. Condesa"
    },
    { 
      id: 3, 
      name: "Laura Martínez", 
      time: "5:30 PM", 
      phone: "555-345-6789", 
      location: "Col. Polanco"
    }
  ];
  
  const prospects = [
    { 
      id: 1, 
      name: "Carlos Vega", 
      phone: "555-111-2222", 
      location: "Col. Del Valle", 
      priceRange: "$2M - $3M",
      status: "new"
    },
    { 
      id: 2, 
      name: "Ana Torres", 
      phone: "555-333-4444", 
      location: "Col. Narvarte", 
      priceRange: "$1.5M - $2.5M",
      status: "contacted"
    },
    { 
      id: 3, 
      name: "Javier Luna", 
      phone: "555-555-6666", 
      location: "Col. Escandón", 
      priceRange: "$3M - $4M",
      status: "appointment"
    },
    { 
      id: 4, 
      name: "Sofía García", 
      phone: "555-777-8888", 
      location: "Col. Juárez", 
      priceRange: "$2.5M - $3.5M",
      status: "closed"
    }
  ];
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case "new": return "status-new";
      case "contacted": return "status-contacted";
      case "appointment": return "status-appointment";
      case "canceled": return "status-canceled";
      case "closed": return "status-closed";
      default: return "";
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "new": return "Nuevo";
      case "contacted": return "Contactado";
      case "appointment": return "Cita Agendada";
      case "canceled": return "Cita Cancelada";
      case "closed": return "Cliente Cerrado";
      default: return status;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel de Control</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Prospecto
        </Button>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Nuevos Prospectos</p>
                <p className="text-2xl font-bold">{metrics.nuevos}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Contactados</p>
                <p className="text-2xl font-bold">{metrics.contactados}</p>
              </div>
              <div className="bg-yellow-100 p-2 rounded-full">
                <Phone className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Citas Agendadas</p>
                <p className="text-2xl font-bold">{metrics.citas}</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Cerrados</p>
                <p className="text-2xl font-bold">{metrics.cerrados}</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Home className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Citas de Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.name}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{appointment.time}</span>
                          <span className="mx-1">•</span>
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      Llamar
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No tienes citas programadas para hoy
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Prospects */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Prospectos Recientes</CardTitle>
              <Tabs value={timeframe} onValueChange={setTimeframe} className="w-fit">
                <TabsList className="h-8">
                  <TabsTrigger value="hoy" className="text-xs px-3">Hoy</TabsTrigger>
                  <TabsTrigger value="semana" className="text-xs px-3">Semana</TabsTrigger>
                  <TabsTrigger value="mes" className="text-xs px-3">Mes</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {prospects.map((prospect) => (
                <div 
                  key={prospect.id}
                  className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium">{prospect.name}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(prospect.status)}`}>
                      {getStatusText(prospect.status)}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 space-x-3">
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{prospect.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Home className="h-3 w-3 mr-1" />
                      <span>{prospect.priceRange}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
