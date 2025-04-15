
import React from "react";
import { Clock } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Available time slots for the time picker
export const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", 
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"
];

interface TimePickerFieldProps {
  control: any;
  name: string;
}

const TimePickerField: React.FC<TimePickerFieldProps> = ({ control, name }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Hora</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    <span>{field.value} hrs</span>
                  ) : (
                    <span>Seleccionar hora</span>
                  )}
                  <Clock className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-background"
              align="start"
            >
              <div className="overflow-y-auto max-h-[300px] p-2 grid grid-cols-2 gap-1">
                {TIME_SLOTS.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={field.value === time ? "default" : "outline"}
                    className={cn(
                      "text-left font-normal w-full",
                      field.value === time && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => {
                      field.onChange(time);
                      setOpen(false); // Cierra el popover después de seleccionar
                    }}
                  >
                    {time} hrs
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TimePickerField;
