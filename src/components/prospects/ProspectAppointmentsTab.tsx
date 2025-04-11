
import React from "react";
import { Calendar, Clock, MapPin, ClipboardEdit, CheckCircle, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: number;
  date: string;
  time: string;
  location: string;
  status: string;
}

interface ProspectAppointmentsTabProps {
  appointments: Appointment[];
  onScheduleAppointment: () => void;
}

const ProspectAppointmentsTab: React.FC<ProspectAppointmentsTabProps> = ({ 
  appointments, 
  onScheduleAppointment 
}) => {
  const getAppointmentStatusClass = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-purple-100 text-purple-800";
      case "completed": return "bg-green-100 text-green-800";
      case "canceled": return "bg-red-100 text-red-800";
      default: return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Citas</CardTitle>
          <Button size="sm" onClick={onScheduleAppointment}>
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
  );
};

export default ProspectAppointmentsTab;
