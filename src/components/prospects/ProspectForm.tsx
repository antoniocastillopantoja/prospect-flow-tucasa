
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sectors, creditTypes, agents } from "@/models/Prospect";
import { ProspectFormData } from "@/types/prospects";

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
          
          <div className="space-y-4">
            <PriceRangeInputs 
              minPrice={formData.minPrice}
              maxPrice={formData.maxPrice}
              handleInputChange={handleInputChange}
            />
            
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

interface PriceRangeInputsProps {
  minPrice: string;
  maxPrice: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function PriceRangeInputs({ minPrice, maxPrice, handleInputChange }: PriceRangeInputsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="minPrice">Precio mínimo</Label>
        <Input
          id="minPrice"
          name="minPrice"
          type="number"
          placeholder="$"
          value={minPrice}
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
          value={maxPrice}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
