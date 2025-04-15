
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

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
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSubmit,
  isLoading,
  onCancel,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      time: "",
      location: "",
      type: "visita",
      notes: "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    // Asegurarse de que todos los datos estén correctos antes de enviar
    console.log("Submitting appointment data:", data);
    onSubmit(data);
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

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Guardando..." : "Programar cita"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AppointmentForm;
