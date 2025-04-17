
import { Info } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProspectFormData } from "@/types/prospects";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Define available sources
export const sourceOptions = [
  "Facebook", 
  "Instagram", 
  "TikTok", 
  "Sitio Web", 
  "Referidos",
  "Portales Inmobiliarios", 
  "Email Marketing",
  "Otro"
];

interface SourceFieldProps {
  form: UseFormReturn<ProspectFormData>;
}

export function SourceField({ form }: SourceFieldProps) {
  return (
    <FormField
      control={form.control}
      name="source"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormLabel>Fuente</FormLabel>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>¿De dónde proviene el prospecto?</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una fuente" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {sourceOptions.map(source => (
                <SelectItem key={source} value={source}>{source}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
