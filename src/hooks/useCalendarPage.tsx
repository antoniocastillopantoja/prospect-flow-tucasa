import { useState } from "react";
import { format } from "date-fns";
import { useNavigation } from "@/hooks/useNavigation";
import { useToast } from "@/hooks/use-toast";

export interface Appointment {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  client: string;
  clientId: string;
  type: string;
  status: string;
}

export function useCalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { goToProspect } = useNavigation();
  const { toast } = useToast();
  
  // Datos de ejemplo para las citas
  const [appointments, setAppointments] = useState<Appointment[]>([
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

  const completeAppointment = (appointmentId: number) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: "completed" } 
          : appointment
      )
    );
    
    toast({
      title: "Cita completada",
      description: "La cita ha sido marcada como completada exitosamente."
    });
  };

  const cancelAppointment = (appointmentId: number) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment => 
        appointment.id === appointmentId 
          ? { ...appointment, status: "canceled" } 
          : appointment
      )
    );
    
    toast({
      title: "Cita cancelada",
      description: "La cita ha sido cancelada exitosamente."
    });
  };

  return {
    date,
    setDate,
    appointments,
    selectedDateAppointments,
    getDateWithAppointments,
    handleGoToClient,
    completeAppointment,
    cancelAppointment
  };
}
