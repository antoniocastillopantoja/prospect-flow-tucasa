
import { useState } from "react";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Datos de ejemplo para las citas
  const appointments = [
    {
      id: 1,
      title: "Visita con María Gómez",
      date: new Date(2025, 3, 10), // April 10, 2025
      time: "10:00 AM",
      location: "Col. Roma Norte, Propiedad #1234",
      client: "María Gómez",
      status: "scheduled"
    },
    {
      id: 2,
      title: "Visita con Roberto Sánchez",
      date: new Date(2025, 3, 10), // April 10, 2025
      time: "3:00 PM",
      location: "Col. Condesa, Propiedad #5678",
      client: "Roberto Sánchez",
      status: "scheduled"
    },
    {
      id: 3,
      title: "Visita con Carlos Vega",
      date: new Date(2025, 3, 12), // April 12, 2025
      time: "11:00 AM",
      location: "Col. Del Valle, Propiedad #9012",
      client: "Carlos Vega",
      status: "scheduled"
    }
  ];
  
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Calendario</h1>
        <Button>
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
                {/* Simplificado para demo */}
                <div className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-md">
                  <span>Lunes, 10 Abr</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">2 citas</span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-md">
                  <span>Martes, 11 Abr</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">0 citas</span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-md">
                  <span>Miércoles, 12 Abr</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">1 cita</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium">
                Citas para {date ? date.toLocaleDateString("es-MX", { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                }) : "el día seleccionado"}
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
                        <div className="mt-1 space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{appointment.location}</span>
                          </div>
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
    </div>
  );
};

export default CalendarPage;
