
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProspectFormData } from "@/types/prospects";

interface NotesFieldProps {
  notes: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function NotesField({ notes, handleInputChange }: NotesFieldProps) {
  return (
    <div>
      <Label htmlFor="notes">Notas</Label>
      <Textarea
        id="notes"
        name="notes"
        placeholder="Información adicional sobre el prospecto..."
        className="min-h-24"
        value={notes}
        onChange={handleInputChange}
      />
    </div>
  );
}
