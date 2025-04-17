
import { useState } from "react";
import { Calendar as CalendarIcon, Plus, MapPin, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import NewAppointmentDialog from "@/components/calendar/NewAppointmentDialog";
import { useCalendarIntegration } from "@/hooks/useCalendarIntegration";
import { useNavigation } from "@/hooks/useNavigation";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { createGoogleCalendarEvent, isGoogleCalendarSyncing } = useCalendarIntegration();
  const { goToProspect } = useNavigation();
  
  // Datos de ejemplo para las citas
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      title: "Visita con María Gómez",
      date: new Date(2025, 3, 10), // April 10, 2025
      time: "10:00",
      location: "Col. Roma Norte, Propiedad #1234",
      client: "María Gómez",
      clientId: "1",
      type: "visita",
      status: "scheduled"
    },
    {
      id: 2,
      title: "Visita con Roberto Sánchez",
      date: new Date(2025, 3, 10), // April 10, 2025
      time: "15:00",
      location: "Col. Condesa, Propiedad #5678",
      client: "Roberto Sánchez",
      clientId: "2",
      type: "reunion",
      status: "scheduled"
    },
    {
      id: 3,
      title: "Visita con Carlos Vega",
      date: new Date(2025, 3, 12), // April 12, 2025
      time: "11:00",
      location: "Col. Del Valle, Propiedad #9012",
      client: "Carlos Vega",
      clientId: "3",
      type: "visita",
      status: "scheduled"
    }
  ]);

  const handleOpenNewAppointment = () => {
    setIsNewAppointmentOpen(true);
  };

  const handleCancelNewAppointment = () => {
    setIsNewAppointmentOpen(false);
  };

  const handleAppointmentSubmit = async (data: any) => {
    setIsLoading(true);
    
    try {
      // Create Google Calendar event if needed
      let googleCalendarEventId: string | undefined = undefined;
      
      if (data.useGoogleCalendar) {
        try {
          googleCalendarEventId = await createGoogleCalendarEvent({
            title: data.type === "visita" ? "Visita a Propiedad" : 
                   data.type === "reunion" ? "Reunión en Oficina" : 
                   data.type === "llamada" ? "Llamada Telefónica" : "Reunión Virtual",
            location: data.location,
            description: data.notes || "",
            date: data.date,
            time: data.time,
            type: data.type
          });
        } catch (error) {
          console.error("Error creating Google Calendar event:", error);
          toast({
            variant: "destructive",
            title: "Error de sincronización",
            description: "No se pudo crear el evento en Google Calendar."
          });
        }
      }

      // Generate appointment type title
      const typeTitle = data.type === "visita" ? "Visita a Propiedad" : 
                        data.type === "reunion" ? "Reunión en Oficina" : 
                        data.type === "llamada" ? "Llamada Telefónica" : "Reunión Virtual";
      
      // Create the new appointment
      const newAppointment = {
        id: appointments.length + 1,
        title: `${typeTitle}${data.client ? ` con ${data.client}` : ""}`,
        date: data.date,
        time: data.time,
        location: data.location,
        client: data.client || "Sin asignar",
        clientId: data.clientId || "",
        type: data.type,
        status: "scheduled",
        notes: data.notes,
        googleCalendarEventId
      };
      
      // Update state with the new appointment
      setAppointments([...appointments, newAppointment]);
      
      // Show success message
      const calendarMessage = googleCalendarEventId 
        ? " y se ha sincronizado con Google Calendar"
        : "";
        
      toast({
        title: "Cita programada",
        description: `Se ha programado una cita para el ${format(data.date, 'dd/MM/yyyy', { locale: es })} a las ${data.time}${calendarMessage}.`
      });
      
    } finally {
      setIsLoading(false);
      setIsNewAppointmentOpen(false);
    }
  };
  
  const selectedDateAppointments = appointments.filter(
    appointment => 
      date && 
      appointment.date.getDate() === date.getDate() &&
      appointment.date.getMonth() === date.getMonth() &&
      appointment.date.getFullYear() === date.getFullYear()
  );
  
  const getDateWithAppointments = (day: Date) => {
    return appointments.some(
      appointment => 
        appointment.date.getDate() === day.getDate() &&
        appointment.date.getMonth() === day.getMonth() &&
        appointment.date.getFullYear() === day.getFullYear()
    );
  };

  const handleGoToClient = (clientId: string) => {
    if (clientId) {
      goToProspect(clientId);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Calendario</h1>
        <Button onClick={handleOpenNewAppointment}>
          <Plus className="mr-2 h-4 w-4" /> Nueva Cita
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardContent className="p-4">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                hasAppointment: (date) => getDateWithAppointments(date)
              }}
              modifiersStyles={{
                hasAppointment: { backgroundColor: "#e2e8f0", fontWeight: "bold" }
              }}
              locale={es}
            />
            
            <div className="mt-4 space-y-1">
              <p className="text-sm text-gray-500">Leyenda:</p>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#e2e8f0] rounded-sm mr-2"></div>
                <span className="text-sm">Día con citas</span>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Vista Rápida de la Semana</p>
              <div className="space-y-2">
                {/* Week view logic - showing appointment counts by day */}
                {Array.from(Array(7).keys()).map((dayOffset) => {
                  const dayDate = new Date();
                  dayDate.setDate(dayDate.getDate() + dayOffset);
                  
                  const dayAppointments = appointments.filter(
                    app => 
                      app.date.getDate() === dayDate.getDate() &&
                      app.date.getMonth() === dayDate.getMonth() &&
                      app.date.getFullYear() === dayDate.getFullYear()
                  );
                  
                  const dayStr = format(dayDate, 'EEEE, d MMM', { locale: es });
                  
                  return (
                    <div 
                      key={dayOffset}
                      className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                      onClick={() => setDate(new Date(dayDate))}
                    >
                      <span>{dayStr}</span>
                      <span className={`px-2 py-1 ${dayAppointments.length > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'} rounded-full text-xs`}>
                        {dayAppointments.length} {dayAppointments.length === 1 ? 'cita' : 'citas'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">
                Citas para {date ? format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es }) : "el día seleccionado"}
              </h2>
              <Button variant="outline" size="sm">
                <CalendarIcon className="h-4 w-4 mr-2" /> 
                Sincronizar con Google
              </Button>
            </div>
            
            {selectedDateAppointments.length > 0 ? (
              <div className="space-y-4">
                {selectedDateAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{appointment.title}</h3>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-gray-500 shrink-0" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500 shrink-0" />
                            <span>{appointment.location}</span>
                          </div>
                          {appointment.clientId && (
                            <div 
                              className="flex items-center text-sm text-blue-600 cursor-pointer hover:text-blue-800"
                              onClick={() => handleGoToClient(appointment.clientId)}
                            >
                              <User className="h-4 w-4 mr-2 shrink-0" />
                              <span className="underline">{appointment.client}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                          Completada
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No hay citas programadas para este día
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* New Appointment Dialog */}
      <NewAppointmentDialog
        isOpen={isNewAppointmentOpen}
        onOpenChange={setIsNewAppointmentOpen}
        onSubmit={handleAppointmentSubmit}
        onCancel={handleCancelNewAppointment}
        isLoading={isLoading || isGoogleCalendarSyncing}
      />
    </div>
  );
};

export default CalendarPage;
