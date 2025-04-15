
import React from "react";
import { Clock } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

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
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleTimeSelect = (time: string) => {
          field.onChange(time);
          setIsOpen(false);
          console.log(`Selected time: ${time}`);
        };

        return (
          <FormItem className="flex flex-col">
            <FormLabel>Hora</FormLabel>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                    type="button"
                    onClick={() => setIsOpen(true)}
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
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time} hrs
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default TimePickerField;
