
import React from "react";
import { Clock } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Available time slots for the time picker with 15-minute intervals
export const TIME_SLOTS = [
  "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", 
  "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", 
  "12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45",
  "14:00", "14:15", "14:30", "14:45", "15:00", "15:15", "15:30", "15:45", 
  "16:00", "16:15", "16:30", "16:45", "17:00", "17:15", "17:30", "17:45", 
  "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45"
];

interface TimePickerFieldProps {
  control: any;
  name: string;
}

const TimePickerField: React.FC<TimePickerFieldProps> = ({ control, name }) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="flex flex-col">
            <FormLabel>Hora</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                console.log(`Selected time: ${value}`);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar hora">
                    {field.value ? `${field.value} hrs` : "Seleccionar hora"}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px]">
                {TIME_SLOTS.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time} hrs
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default TimePickerField;
