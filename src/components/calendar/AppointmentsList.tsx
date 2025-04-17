
import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, MapPin, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Appointment } from "@/hooks/useCalendarPage";

interface AppointmentsListProps {
  date: Date | undefined;
  appointments: Appointment[];
  onGoToClient: (clientId: string) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  date,
  appointments,
  onGoToClient
}) => {
  return (
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
        
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
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
                          onClick={() => onGoToClient(appointment.clientId)}
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
  );
};

export default AppointmentsList;
