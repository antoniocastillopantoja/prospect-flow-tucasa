
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProspectFormData } from "@/types/prospects";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PriceRangeFieldsProps {
  form: UseFormReturn<ProspectFormData>;
}

export function PriceRangeFields({ form }: PriceRangeFieldsProps) {
  // Format price as currency with thousands separators
  const formatCurrency = (value: string) => {
    // Remove all non-digit characters and leading zeros
    const digits = value.replace(/\D/g, '').replace(/^0+/, '');
    
    // Format with thousand separators
    if (digits) {
      return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return '';
  };
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="minPrice"
        render={({ field: { onChange, value, ...fieldProps } }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Precio mínimo</FormLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Presupuesto mínimo en pesos</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input 
                  type="text" 
                  className="pl-6"
                  placeholder="1,000,000"
                  value={typeof value === 'string' ? formatCurrency(value) : ''}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, '');
                    onChange(rawValue);
                    e.target.value = formatCurrency(rawValue);
                  }}
                  {...fieldProps} 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="maxPrice"
        render={({ field: { onChange, value, ...fieldProps } }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormLabel>Precio máximo</FormLabel>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Presupuesto máximo en pesos</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input 
                  type="text" 
                  className="pl-6"
                  placeholder="3,000,000"
                  value={typeof value === 'string' ? formatCurrency(value) : ''}
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/\D/g, '');
                    onChange(rawValue);
                    e.target.value = formatCurrency(rawValue);
                  }}
                  {...fieldProps} 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
