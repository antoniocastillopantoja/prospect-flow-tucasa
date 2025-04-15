
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { creditTypes, agents } from "@/models/Prospect";
import { ProspectFormData } from "@/types/prospects";

interface AssignmentFieldsProps {
  formData: Pick<ProspectFormData, "creditType" | "assignedTo">;
  handleSelectChange: (name: string, value: string) => void;
}

export function AssignmentFields({ formData, handleSelectChange }: AssignmentFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="creditType">Tipo de crédito</Label>
        <Select 
          value={formData.creditType} 
          onValueChange={(value) => handleSelectChange("creditType", value)}
        >
          <SelectTrigger id="creditType">
            <SelectValue placeholder="Selecciona tipo de crédito" />
          </SelectTrigger>
          <SelectContent>
            {creditTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="assignedTo">Asignar a</Label>
        <Select 
          value={formData.assignedTo} 
          onValueChange={(value) => handleSelectChange("assignedTo", value)}
        >
          <SelectTrigger id="assignedTo">
            <SelectValue placeholder="Selecciona un agente" />
          </SelectTrigger>
          <SelectContent>
            {agents.map(agent => (
              <SelectItem key={agent} value={agent}>{agent}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
