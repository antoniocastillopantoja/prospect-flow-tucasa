
import React from "react";
import { Clock } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Available time slots for the time picker suggestions
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
        const formatTimeInput = (value: string): string => {
          // Remove any non-digit characters
          let digits = value.replace(/\D/g, '');
          
          // Restrict to 4 digits max
          digits = digits.substring(0, 4);
          
          // Format as HH:MM
          if (digits.length > 2) {
            const hours = digits.substring(0, 2);
            const minutes = digits.substring(2);
            
            // Validate hours (00-23)
            let validHours = parseInt(hours);
            if (isNaN(validHours) || validHours > 23) {
              validHours = 23;
            }
            
            // Validate minutes (00-59)
            let validMinutes = parseInt(minutes);
            if (isNaN(validMinutes) || validMinutes > 59) {
              validMinutes = 0;
            }
            
            // Format with leading zeros
            const formattedHours = validHours.toString().padStart(2, '0');
            const formattedMinutes = validMinutes.toString().padStart(2, '0');
            
            return `${formattedHours}:${formattedMinutes}`;
          } else if (digits.length > 0) {
            // Just hours with no minutes yet
            let validHours = parseInt(digits);
            if (isNaN(validHours) || validHours > 23) {
              validHours = 23;
            }
            return validHours.toString().padStart(2, '0');
          }
          
          return digits;
        };

        const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const rawValue = e.target.value;
          const formatted = formatTimeInput(rawValue);
          field.onChange(formatted);
          console.log(`Time input: ${formatted}`);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
          // Ensure proper formatting on blur
          let value = e.target.value;
          
          // If we have just hours (no colon), add zeros for minutes
          if (value.length === 2 && !value.includes(':')) {
            value = `${value}:00`;
            field.onChange(value);
          }
          // If we have incomplete format, try to fix it
          else if (value.length === 1) {
            value = `0${value}:00`;
            field.onChange(value);
          }
          else if (value.length === 3 && value.includes(':')) {
            value = `${value}00`;
            field.onChange(value);
          }
          
          field.onBlur();
        };

        return (
          <FormItem className="flex flex-col">
            <FormLabel>Hora</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="HH:MM"
                  value={field.value}
                  onChange={handleTimeChange}
                  onBlur={handleBlur}
                  className={cn(
                    "pl-3 pr-10",
                    !field.value && "text-muted-foreground"
                  )}
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default TimePickerField;
