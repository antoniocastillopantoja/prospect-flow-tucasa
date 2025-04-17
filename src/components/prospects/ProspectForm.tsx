
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProspectFormData } from "@/types/prospects";

// Import the field group components
import { PersonalInfoFields } from "./form-groups/PersonalInfoFields";
import { LocationFields } from "./form-groups/LocationFields";
import { PriceRangeFields } from "./form-groups/PriceRangeFields";
import { AssignmentFields } from "./form-groups/AssignmentFields";
import { NotesField } from "./form-groups/NotesField";
import { SourceField } from "./form-groups/SourceField";

interface ProspectFormProps {
  form: UseFormReturn<ProspectFormData>;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function ProspectForm({
  form,
  onSubmit,
  onCancel,
  isLoading
}: ProspectFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <PersonalInfoFields form={form} />
              <LocationFields form={form} />
            </div>
            
            <div className="space-y-4">
              <PriceRangeFields form={form} />
              <AssignmentFields form={form} />
              <SourceField form={form} />
              <NotesField form={form} />
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
    </Form>
  );
}
