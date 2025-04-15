
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";

export function NewProspectButton() {
  const { goToNewProspect } = useNavigation();
  
  return (
    <Button 
      variant="default" 
      size="sm"
      onClick={goToNewProspect}
    >
      <Plus className="mr-2 h-4 w-4" /> Nuevo Prospecto
    </Button>
  );
}
