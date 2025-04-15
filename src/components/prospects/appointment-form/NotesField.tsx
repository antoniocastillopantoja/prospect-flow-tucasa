
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface NotesFieldProps {
  control: any;
  name: string;
}

const NotesField: React.FC<NotesFieldProps> = ({ control, name }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Notas adicionales</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Información adicional sobre la cita"
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NotesField;
