
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/toast";

const NewProspect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    sector: "",
    minPrice: "",
    maxPrice: "",
    creditType: "",
    assignedTo: "",
    notes: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulación de guardado de datos
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Prospecto creado",
        description: `${formData.name} ha sido registrado correctamente.`
      });
      navigate("/prospectos");
    }, 1000);
  };

  return (
    <div>
      <Button 
        variant="ghost" 
        className="mb-4"
        onClick={() => navigate("/prospectos")}
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
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <SelectItem value="Norte">Norte</SelectItem>
                      <SelectItem value="Sur">Sur</SelectItem>
                      <SelectItem value="Centro">Centro</SelectItem>
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
              
              <div className="space-y-4">
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
                      <SelectItem value="Bancario">Bancario</SelectItem>
                      <SelectItem value="Infonavit">Infonavit</SelectItem>
                      <SelectItem value="Fovissste">Fovissste</SelectItem>
                      <SelectItem value="Contado">Contado</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
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
                      <SelectItem value="Juan Pérez">Juan Pérez</SelectItem>
                      <SelectItem value="Ana Rodríguez">Ana Rodríguez</SelectItem>
                      <SelectItem value="Pedro Ramírez">Pedro Ramírez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Información adicional sobre el prospecto..."
                    className="min-h-24"
                    value={formData.notes}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate("/prospectos")}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar Prospecto"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewProspect;
