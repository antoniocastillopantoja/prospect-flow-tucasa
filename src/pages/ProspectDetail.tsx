
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProspects } from "@/hooks/useProspects";
import { ProspectStatus } from "@/models/Prospect";
import ProspectStatusBadge from "@/components/ProspectStatusBadge";
import { useToast } from "@/hooks/use-toast";

const ProspectDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || "info";
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { prospects, updateProspect, updateProspectStatus } = useProspects();
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [note, setNote] = useState("");
  const [prospect, setProspect] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Notes and appointments data
  const [notes, setNotes] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    if (prospects.length > 0 && id) {
      const foundProspect = prospects.find(p => p.id === parseInt(id));
      if (foundProspect) {
        setProspect(foundProspect);
        
        // Mock data for notes and appointments
        setNotes([
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
        ]);
        
        setAppointments([
          {
            id: 1,
            date: "2025-04-12",
            time: "11:00 AM",
            location: "Propiedad en Av. División del Norte 1234",
            status: "scheduled"
          }
        ]);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se encontró el prospecto solicitado."
        });
        navigate("/prospectos");
      }
      setLoading(false);
    }
  }, [prospects, id, navigate, toast]);
  
  const handleStatusChange = (newStatus: ProspectStatus) => {
    if (prospect && id) {
      updateProspectStatus(parseInt(id), newStatus);
      setProspect({ ...prospect, status: newStatus });
    }
  };
  
  const handleAddNote = () => {
    if (note.trim() !== "") {
      const newNote = {
        id: notes.length + 1,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: note,
        author: "Juan Pérez" // Current user (hardcoded for demo)
      };
      
      setNotes([newNote, ...notes]);
      setNote("");
      
      toast({
        title: "Nota añadida",
        description: "La nota ha sido añadida correctamente."
      });
    }
  };
  
  const handleScheduleAppointment = () => {
    // Here would be a modal to schedule appointment
    toast({
      title: "Programar cita",
      description: "Funcionalidad en desarrollo."
    });
  };
  
  const getAppointmentStatusClass = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-purple-100 text-purple-800";
      case "completed": return "bg-green-100 text-green-800";
      case "canceled": return "bg-red-100 text-red-800";
      default: return "";
    }
  };

  if (loading || !prospect) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Cargando información del prospecto...</p>
        </div>
      </div>
    );
  }

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
          <Select value={prospect.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-44">
              <div className="flex items-center">
                <ProspectStatusBadge status={prospect.status} className="ml-0 mr-2" />
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
                            <span>{prospect.email || "No disponible"}</span>
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
                          <ProspectStatusBadge status={prospect.status} />
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
                    {notes.length > 0 ? (
                      notes.map((note) => (
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
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No hay notas registradas para este prospecto
                      </div>
                    )}
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
                  {appointments.length > 0 ? (
                    <div className="space-y-4">
                      {appointments.map((appointment) => (
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
                    Estado actualizado a <span className="font-medium">{prospect.status === "contacted" ? "Contactado" : "Nuevo"}</span>
                  </p>
                </div>
                
                {notes.length > 0 && (
                  <div className="border-l-2 border-green-500 pl-3 py-1">
                    <p className="text-sm font-medium">Nota añadida</p>
                    <p className="text-xs text-gray-500">{notes[0].date} - {notes[0].time}</p>
                    <p className="mt-1 text-sm">
                      {notes[0].author} añadió una nueva nota
                    </p>
                  </div>
                )}
                
                {appointments.length > 0 && (
                  <div className="border-l-2 border-purple-500 pl-3 py-1">
                    <p className="text-sm font-medium">Cita agendada</p>
                    <p className="text-xs text-gray-500">08/04/2025 - 3:45 PM</p>
                    <p className="mt-1 text-sm">
                      Cita programada para el {appointments[0].date}
                    </p>
                  </div>
                )}
                
                <div className="border-l-2 border-orange-500 pl-3 py-1">
                  <p className="text-sm font-medium">Contacto inicial</p>
                  <p className="text-xs text-gray-500">{prospect.contactDate} - 3:30 PM</p>
                  <p className="mt-1 text-sm">
                    Prospecto registrado por {prospect.agent}
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
