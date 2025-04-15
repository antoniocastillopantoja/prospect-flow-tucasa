
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProspectFormData } from "@/types/prospects";

interface PersonalInfoFieldsProps {
  formData: Pick<ProspectFormData, "name" | "phone" | "email">;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function PersonalInfoFields({ formData, handleInputChange }: PersonalInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      
      <div>
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
