
import React, { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Available time slots for the time picker suggestions (7:00 AM to 9:00 PM in 15-minute intervals)
export const TIME_SLOTS = [
  "07:00", "07:15", "07:30", "07:45", 
  "08:00", "08:15", "08:30", "08:45", 
  "09:00", "09:15", "09:30", "09:45", 
  "10:00", "10:15", "10:30", "10:45", 
  "11:00", "11:15", "11:30", "11:45", 
  "12:00", "12:15", "12:30", "12:45", 
  "13:00", "13:15", "13:30", "13:45",
  "14:00", "14:15", "14:30", "14:45", 
  "15:00", "15:15", "15:30", "15:45", 
  "16:00", "16:15", "16:30", "16:45", 
  "17:00", "17:15", "17:30", "17:45", 
  "18:00", "18:15", "18:30", "18:45", 
  "19:00", "19:15", "19:30", "19:45",
  "20:00", "20:15", "20:30", "20:45",
  "21:00"
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
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Hora</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center justify-between w-full">
                  <SelectValue placeholder="Seleccionar hora" />
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-[300px] overflow-y-auto">
                {TIME_SLOTS.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TimePickerField;
