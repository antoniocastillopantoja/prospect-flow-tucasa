
import { useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useCalendarIntegration } from "@/hooks/useCalendarIntegration";

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
  const { createGoogleCalendarEvent, isGoogleCalendarSyncing } = useCalendarIntegration();

  const handleScheduleAppointment = () => {
    setIsSchedulingAppointment(true);
  };

  const handleCancelAppointmentScheduling = () => {
    setIsSchedulingAppointment(false);
  };

  // This function now clearly returns a Promise<string> 
  const handleAppointmentSubmit = async (data: any): Promise<string> => {
    setAppointmentLoading(true);
    
    try {
      // Create Google Calendar event if needed
      let googleCalendarEventId: string | undefined = undefined;
      
      if (data.useGoogleCalendar) {
        try {
          googleCalendarEventId = await createGoogleCalendarEvent({
            title: "Prospecto",
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
      
      // Create the new appointment
      const newAppointment: Appointment = {
        id: appointments.length + 1,
        date: format(data.date, 'yyyy-MM-dd'),
        time: data.time,
        location: data.location,
        type: data.type,
        notes: data.notes,
        status: "scheduled",
        googleCalendarEventId
      };
      
      // Update state with the new appointment
      setAppointments([newAppointment, ...appointments]);
      
      // Show success message
      const calendarMessage = googleCalendarEventId 
        ? " y se ha sincronizado con Google Calendar"
        : "";
        
      toast({
        title: "Cita programada",
        description: `Se ha programado una cita para el ${format(data.date, 'dd/MM/yyyy')} a las ${data.time}${calendarMessage}.`
      });
      
      return "appointments"; // Return the tab to switch to
    } finally {
      setAppointmentLoading(false);
      setIsSchedulingAppointment(false);
    }
  };

  return {
    appointments,
    isSchedulingAppointment,
    appointmentLoading: appointmentLoading || isGoogleCalendarSyncing,
    handleScheduleAppointment,
    handleCancelAppointmentScheduling,
    handleAppointmentSubmit,
    setAppointments
  };
}
