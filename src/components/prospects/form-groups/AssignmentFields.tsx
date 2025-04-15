
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
import { creditTypes, agents } from "@/models/Prospect";
import { UseFormReturn } from "react-hook-form";
import { ProspectFormData } from "@/types/prospects";

interface AssignmentFieldsProps {
  form: UseFormReturn<ProspectFormData>;
}

export function AssignmentFields({ form }: AssignmentFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="creditType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipo de crédito</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tipo de crédito" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {creditTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="assignedTo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Asignar a</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un agente" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {agents.map(agent => (
                  <SelectItem key={agent} value={agent}>{agent}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
