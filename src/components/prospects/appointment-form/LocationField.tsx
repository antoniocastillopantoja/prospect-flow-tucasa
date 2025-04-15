
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface LocationFieldProps {
  control: any;
  name: string;
}

const LocationField: React.FC<LocationFieldProps> = ({ control, name }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Ubicación</FormLabel>
          <FormControl>
            <Input placeholder="Dirección de la propiedad" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LocationField;
