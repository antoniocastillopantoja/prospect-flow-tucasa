
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { ProspectFormData } from "@/types/prospects";

// Import the field group components
import { PersonalInfoFields } from "./form-groups/PersonalInfoFields";
import { LocationFields } from "./form-groups/LocationFields";
import { PriceRangeFields } from "./form-groups/PriceRangeFields";
import { AssignmentFields } from "./form-groups/AssignmentFields";
import { NotesField } from "./form-groups/NotesField";

interface ProspectFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  formData: ProspectFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  isLoading: boolean;
}

export function ProspectForm({
  onSubmit,
  onCancel,
  formData,
  handleInputChange,
  handleSelectChange,
  isLoading
}: ProspectFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <PersonalInfoFields 
              formData={formData} 
              handleInputChange={handleInputChange} 
            />
            
            <LocationFields 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
            />
          </div>
          
          <div className="space-y-4">
            <PriceRangeFields 
              formData={formData} 
              handleInputChange={handleInputChange} 
            />
            
            <AssignmentFields 
              formData={formData}
              handleSelectChange={handleSelectChange}
            />
            
            <NotesField 
              notes={formData.notes}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Guardando..." : "Guardar Prospecto"}
        </Button>
      </CardFooter>
    </form>
  );
}
