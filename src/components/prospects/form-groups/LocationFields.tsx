
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sectors } from "@/models/Prospect";
import { ProspectFormData } from "@/types/prospects";

interface LocationFieldsProps {
  formData: Pick<ProspectFormData, "sector" | "location">;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export function LocationFields({ 
  formData, 
  handleInputChange, 
  handleSelectChange 
}: LocationFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="sector">Sector</Label>
        <Select 
          value={formData.sector} 
          onValueChange={(value) => handleSelectChange("sector", value)}
        >
          <SelectTrigger id="sector">
            <SelectValue placeholder="Selecciona un sector" />
          </SelectTrigger>
          <SelectContent>
            {sectors.map(sector => (
              <SelectItem key={sector} value={sector}>{sector}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="location">Colonia</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
