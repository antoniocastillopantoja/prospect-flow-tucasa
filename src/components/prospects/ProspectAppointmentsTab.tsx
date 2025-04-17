
import React, { useState } from "react";
import { Calendar, Clock, MapPin, ClipboardEdit, CheckCircle, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Appointment {
  id: number;
  date: string;
  time: string;
  location: string;
  status: string;
  googleCalendarEventId?: string;
}

interface ProspectAppointmentsTabProps {
  appointments: Appointment[];
  onScheduleAppointment: () => void;
  onCompleteAppointment?: (id: number) => void;
  onCancelAppointment?: (id: number) => void;
}

const ProspectAppointmentsTab: React.FC<ProspectAppointmentsTabProps> = ({ 
  appointments, 
  onScheduleAppointment,
  onCompleteAppointment,
  onCancelAppointment
}) => {
  const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const getAppointmentStatusClass = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-purple-100 text-purple-800";
      case "completed": return "bg-green-100 text-green-800";
      case "canceled": return "bg-red-100 text-red-800";
      default: return "";
    }
  };

  const handleCancelClick = (id: number) => {
    setAppointmentToCancel(id);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (appointmentToCancel !== null && onCancelAppointment) {
      onCancelAppointment(appointmentToCancel);
      setAppointmentToCancel(null);
    }
    setCancelDialogOpen(false);
  };

  const handleCompleteAppointment = (id: number) => {
    if (onCompleteAppointment) {
      onCompleteAppointment(id);
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
                      
                      {appointment.googleCalendarEventId && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            Google Calendar
                          </span>
                        </>
                      )}
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
                  
                  {appointment.status === "scheduled" && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-green-600 border-green-600 hover:bg-green-50"
                        onClick={() => handleCompleteAppointment(appointment.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" /> Completada
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() => handleCancelClick(appointment.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Cancelar
                      </Button>
                    </>
                  )}
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

      {/* Cancel Appointment Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción cancelará la cita y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Volver</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCancel} className="bg-red-600 hover:bg-red-700">
              Confirmar cancelación
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default ProspectAppointmentsTab;
