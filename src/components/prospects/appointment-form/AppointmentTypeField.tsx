
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AppointmentTypeFieldProps {
  control: any;
  name: string;
}

const AppointmentTypeField: React.FC<AppointmentTypeFieldProps> = ({ control, name }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tipo de cita</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar tipo de cita" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="visita">Visita a propiedad</SelectItem>
              <SelectItem value="reunion">Reunión en oficina</SelectItem>
              <SelectItem value="llamada">Llamada telefónica</SelectItem>
              <SelectItem value="virtual">Reunión virtual</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AppointmentTypeField;
