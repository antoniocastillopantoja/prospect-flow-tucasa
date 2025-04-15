
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ProspectForm } from "@/components/prospects/ProspectForm";
import { useProspectForm } from "@/hooks/useProspectForm";

const NewProspect = () => {
  const {
    formData,
    isLoading,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    navigateBack
  } = useProspectForm();

  return (
    <div>
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={navigateBack}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Volver a Prospectos
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Nuevo Prospecto</CardTitle>
          <CardDescription>
            Registra la información del nuevo prospecto interesado
          </CardDescription>
        </CardHeader>
        
        <ProspectForm
          formData={formData}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          onSubmit={handleSubmit}
          onCancel={navigateBack}
        />
      </Card>
    </div>
  );
};

export default NewProspect;
