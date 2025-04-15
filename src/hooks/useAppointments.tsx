
import { useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export interface Appointment {
  id: number;
  date: string;
  time: string;
  location: string;
  type: string;
  notes?: string;
  status: "scheduled" | "completed" | "canceled";
  googleCalendarEventId?: string;
}

export function useAppointments(initialAppointments: Appointment[] = []) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [isSchedulingAppointment, setIsSchedulingAppointment] = useState(false);
  const [appointmentLoading, setAppointmentLoading] = useState(false);
  const { toast } = useToast();

  const handleScheduleAppointment = () => {
    setIsSchedulingAppointment(true);
  };

  const handleCancelAppointmentScheduling = () => {
    setIsSchedulingAppointment(false);
  };

  const handleAppointmentSubmit = (data: any) => {
    setAppointmentLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const newAppointment: Appointment = {
        id: appointments.length + 1,
        date: format(data.date, 'yyyy-MM-dd'),
        time: data.time,
        location: data.location,
        type: data.type,
        notes: data.notes,
        status: "scheduled" as const,
        // Simulamos que obtuvimos un ID de evento de Google Calendar
        googleCalendarEventId: `gc-event-${Math.random().toString(36).substring(2, 11)}`
      };
      
      setAppointments([newAppointment, ...appointments]);
      setAppointmentLoading(false);
      setIsSchedulingAppointment(false);
      
      toast({
        title: "Cita programada",
        description: `Se ha programado una cita para el ${format(data.date, 'dd/MM/yyyy')} a las ${data.time} y se ha sincronizado con Google Calendar.`
      });
    }, 500);

    return "appointments"; // Return the tab to switch to
  };

  return {
    appointments,
    isSchedulingAppointment,
    appointmentLoading,
    handleScheduleAppointment,
    handleCancelAppointmentScheduling,
    handleAppointmentSubmit,
    setAppointments
  };
}
