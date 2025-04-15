
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProspectFormData } from "@/types/prospects";

interface PriceRangeFieldsProps {
  form: UseFormReturn<ProspectFormData>;
}

export function PriceRangeFields({ form }: PriceRangeFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="minPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Precio mínimo</FormLabel>
            <FormControl>
              <Input type="number" placeholder="$" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="maxPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Precio máximo</FormLabel>
            <FormControl>
              <Input type="number" placeholder="$" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
