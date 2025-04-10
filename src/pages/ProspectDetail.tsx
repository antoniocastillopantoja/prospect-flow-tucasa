
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Home,
  MapPin,
  Phone,
  User,
  Mail,
  CreditCard,
  Clock,
  ClipboardEdit,
  CheckCircle,
  XCircle,
  MessageSquare
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ProspectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");
  const [status, setStatus] = useState("contacted");
  const [note, setNote] = useState("");

  // Datos de ejemplo de un prospecto
  const prospect = {
    id: 1,
    name: "Carlos Vega",
    phone: "555-111-2222",
    email: "carlos.vega@example.com",
    location: "Col. Del Valle",
    sector: "Sur",
    priceRange: "$2M - $3M",
    creditType: "Bancario",
    contactDate: "2025-04-09",
    agent: "Ana Rodríguez",
    status: "contacted",
    notes: [
      {
        id: 1,
        date: "2025-04-09",
        time: "10:30 AM",
        text: "Cliente interesado en propiedades de 3 recámaras con estudio. Prefiere planta baja o con elevador.",
        author: "Ana Rodríguez"
      },
      {
        id: 2,
        date: "2025-04-08",
        time: "3:45 PM",
        text: "Primera llamada. Mostró interés en la zona sur, particularmente Del Valle y Narvarte.",
        author: "Juan Pérez"
      }
    ],
    appointments: [
      {
        id: 1,
        date: "2025-04-12",
        time: "11:00 AM",
        location: "Propiedad en Av. División del Norte 1234",
        status: "scheduled"
      }
    ]
  };
  
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
  
  const getAppointmentStatusClass = (status: string) => {
    switch (status) {
      case "scheduled": return "status-appointment";
      case "completed": return "status-closed";
      case "canceled": return "status-canceled";
      default: return "";
    }
  };
  
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    // Aquí se actualizaría el estado del prospecto en la base de datos
  };
  
  const handleAddNote = () => {
    if (note.trim() !== "") {
      // Aquí se agregaría la nota a la base de datos
      setNote("");
    }
  };
  
  const handleScheduleAppointment = () => {
    // Aquí se abriría un modal para agendar una cita
  };

  return (
    <div>
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate("/prospectos")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Volver a Prospectos
      </Button>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">{prospect.name}</h1>
          <div className="flex items-center text-gray-500">
            <Phone className="h-4 w-4 mr-1" />
            <span className="mr-3">{prospect.phone}</span>
            <MapPin className="h-4 w-4 mr-1" />
            <span>{prospect.location}</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Select value={status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-44">
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${getStatusClass(status)}`}></span>
                <SelectValue placeholder="Estado" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">Nuevo</SelectItem>
              <SelectItem value="contacted">Contactado</SelectItem>
              <SelectItem value="appointment">Cita Agendada</SelectItem>
              <SelectItem value="canceled">Cita Cancelada</SelectItem>
              <SelectItem value="closed">Cliente Cerrado</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline"
            className="flex items-center"
            onClick={() => window.location.href = `tel:${prospect.phone}`}
          >
            <Phone className="h-4 w-4 mr-2" /> Llamar
          </Button>
          
          <Button 
            variant="default"
            className="flex items-center"
            onClick={handleScheduleAppointment}
          >
            <Calendar className="h-4 w-4 mr-2" /> Agendar Cita
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="notes">Notas</TabsTrigger>
              <TabsTrigger value="appointments">Citas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Información de Contacto</p>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{prospect.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{prospect.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{prospect.email}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Preferencias de Propiedad</p>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Home className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{prospect.priceRange}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{prospect.sector} - {prospect.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Información Financiera</p>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Crédito: {prospect.creditType}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Información de Seguimiento</p>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Fecha de contacto: {new Date(prospect.contactDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Agente asignado: {prospect.agent}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Estado Actual</p>
                        <div className="flex items-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(status)}`}>
                            {getStatusText(status)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Agregar Nota</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Escribe una nota sobre este prospecto..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="min-h-24"
                    />
                    <Button onClick={handleAddNote}>Guardar Nota</Button>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    <h3 className="font-medium">Historial de Notas</h3>
                    {prospect.notes.map((note) => (
                      <div key={note.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="font-medium">{note.author}</span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {note.date} - {note.time}
                          </div>
                        </div>
                        <p className="mt-2">{note.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appointments" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Citas</CardTitle>
                    <Button size="sm" onClick={handleScheduleAppointment}>
                      <Calendar className="h-4 w-4 mr-2" /> Nueva Cita
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {prospect.appointments.length > 0 ? (
                    <div className="space-y-4">
                      {prospect.appointments.map((appointment) => (
                        <div key={appointment.id} className="border rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center mb-1">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                <span className="font-medium">{appointment.date}</span>
                                <span className="mx-2">•</span>
                                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAppointmentStatusClass(appointment.status)}`}>
                              {appointment.status === "scheduled" ? "Programada" : 
                               appointment.status === "completed" ? "Completada" : "Cancelada"}
                            </span>
                          </div>
                          
                          <div className="mt-3 pt-3 border-t flex gap-2">
                            <Button size="sm" variant="outline">
                              <ClipboardEdit className="h-4 w-4 mr-1" /> Editar
                            </Button>
                            <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                              <CheckCircle className="h-4 w-4 mr-1" /> Completada
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                              <XCircle className="h-4 w-4 mr-1" /> Cancelar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No hay citas programadas para este prospecto
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actividad Reciente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-blue-500 pl-3 py-1">
                  <p className="text-sm font-medium">Cambio de estado</p>
                  <p className="text-xs text-gray-500">09/04/2025 - 10:30 AM</p>
                  <p className="mt-1 text-sm">
                    Estado actualizado a <span className="font-medium">Contactado</span>
                  </p>
                </div>
                
                <div className="border-l-2 border-green-500 pl-3 py-1">
                  <p className="text-sm font-medium">Nota añadida</p>
                  <p className="text-xs text-gray-500">09/04/2025 - 10:30 AM</p>
                  <p className="mt-1 text-sm">
                    Ana Rodríguez añadió una nueva nota
                  </p>
                </div>
                
                <div className="border-l-2 border-purple-500 pl-3 py-1">
                  <p className="text-sm font-medium">Cita agendada</p>
                  <p className="text-xs text-gray-500">08/04/2025 - 3:45 PM</p>
                  <p className="mt-1 text-sm">
                    Cita programada para el 12/04/2025
                  </p>
                </div>
                
                <div className="border-l-2 border-orange-500 pl-3 py-1">
                  <p className="text-sm font-medium">Contacto inicial</p>
                  <p className="text-xs text-gray-500">08/04/2025 - 3:30 PM</p>
                  <p className="mt-1 text-sm">
                    Prospecto registrado por Juan Pérez
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProspectDetail;
