
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Calendar as CalendarIcon, LoaderCircle } from "lucide-react";

import DatePickerField from "./appointment-form/DatePickerField";
import TimePickerField from "./appointment-form/TimePickerField";
import LocationField from "./appointment-form/LocationField";
import AppointmentTypeField from "./appointment-form/AppointmentTypeField";
import NotesField from "./appointment-form/NotesField";
import { formSchema, FormValues } from "./appointment-form/appointmentFormSchema";

interface AppointmentFormProps {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
  onCancel: () => void;
  useGoogleCalendar?: boolean;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSubmit,
  isLoading,
  onCancel,
  useGoogleCalendar = false,
}) => {
  const [isGoogleCalendarLoading, setIsGoogleCalendarLoading] = useState(false);
  const [googleCalendarStatus, setGoogleCalendarStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: "",
      location: "",
      type: "visita",
      notes: "",
    },
  });

  const handleSubmit = async (data: FormValues) => {
    console.log("Submitting appointment data:", data);
    
    if (useGoogleCalendar) {
      try {
        setIsGoogleCalendarLoading(true);
        
        // Crear evento en Google Calendar
        const eventDetails = {
          summary: `Cita: ${data.type} - Prospecto`,
          location: data.location,
          description: data.notes || "Cita programada desde el CRM",
          start: {
            dateTime: `${data.date.toISOString().split('T')[0]}T${data.time}:00`,
            timeZone: 'America/Mexico_City',
          },
          end: {
            // Asumiendo citas de 1 hora por defecto
            dateTime: `${data.date.toISOString().split('T')[0]}T${addOneHour(data.time)}:00`,
            timeZone: 'America/Mexico_City',
          }
        };
        
        // Simular llamada a la API de Google Calendar
        // En producción, esto sería una llamada real a la API de Google Calendar
        console.log("Creando evento en Google Calendar:", eventDetails);
        await simulateGoogleCalendarAPI(eventDetails);
        
        setGoogleCalendarStatus('success');
      } catch (error) {
        console.error("Error al crear evento en Google Calendar:", error);
        setGoogleCalendarStatus('error');
      } finally {
        setIsGoogleCalendarLoading(false);
      }
    }
    
    // Continuar con el flujo normal
    onSubmit(data);
  };

  // Función para simular la respuesta de la API (en producción se conectaría realmente)
  const simulateGoogleCalendarAPI = async (eventDetails: any) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("Evento creado exitosamente en Google Calendar (simulado)");
        resolve();
      }, 1000);
    });
  };

  // Función para agregar una hora al formato HH:MM
  const addOneHour = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    date.setHours(date.getHours() + 1);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePickerField control={form.control} name="date" />
          <TimePickerField control={form.control} name="time" />
        </div>

        <LocationField control={form.control} name="location" />
        <AppointmentTypeField control={form.control} name="type" />
        <NotesField control={form.control} name="notes" />

        {useGoogleCalendar && googleCalendarStatus === 'success' && (
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>Se agendará en Google Calendar</span>
          </div>
        )}
        
        {useGoogleCalendar && googleCalendarStatus === 'error' && (
          <div className="bg-red-50 text-red-700 px-4 py-2 rounded-md flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>No se pudo agendar en Google Calendar</span>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={isLoading || isGoogleCalendarLoading}
            className="flex items-center gap-2"
          >
            {(isLoading || isGoogleCalendarLoading) ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <CalendarIcon className="h-4 w-4" />
                Programar cita
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AppointmentForm;
