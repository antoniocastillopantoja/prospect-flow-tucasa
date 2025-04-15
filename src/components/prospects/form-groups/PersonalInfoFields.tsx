
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProspectFormData } from "@/types/prospects";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<ProspectFormData>;
}

export function PersonalInfoFields({ form }: PersonalInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Nombre completo</FormLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ingresa el nombre completo del prospecto</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <FormControl>
              <Input required {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field: { onChange, ...fieldProps } }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Teléfono</FormLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Número de contacto principal</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <FormControl>
              <Input 
                required 
                type="tel"
                placeholder="(123) 456-7890"
                onChange={(e) => {
                  // Format phone number as user types (XXX) XXX-XXXX
                  const value = e.target.value.replace(/\D/g, '').substring(0, 10);
                  const formattedValue = value.length > 0 
                    ? value.length > 6 
                      ? `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`
                      : value.length > 3 
                        ? `(${value.substring(0, 3)}) ${value.substring(3)}`
                        : `(${value}`
                    : '';
                  
                  e.target.value = formattedValue;
                  onChange(e);
                }} 
                {...fieldProps} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Correo electrónico</FormLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Correo para envío de información y seguimiento</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <FormControl>
              <Input 
                type="email" 
                placeholder="ejemplo@correo.com"
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
