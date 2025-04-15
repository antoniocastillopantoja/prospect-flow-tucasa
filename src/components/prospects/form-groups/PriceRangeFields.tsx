
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProspectFormData } from "@/types/prospects";

interface PriceRangeFieldsProps {
  formData: Pick<ProspectFormData, "minPrice" | "maxPrice">;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PriceRangeFields({ formData, handleInputChange }: PriceRangeFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="minPrice">Precio mínimo</Label>
        <Input
          id="minPrice"
          name="minPrice"
          type="number"
          placeholder="$"
          value={formData.minPrice}
          onChange={handleInputChange}
        />
      </div>
      
      <div>
        <Label htmlFor="maxPrice">Precio máximo</Label>
        <Input
          id="maxPrice"
          name="maxPrice"
          type="number"
          placeholder="$"
          value={formData.maxPrice}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
