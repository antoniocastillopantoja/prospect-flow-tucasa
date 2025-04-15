
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBox({ value, onChange, placeholder = "Buscar prospectos..." }: SearchBoxProps) {
  const [localValue, setLocalValue] = useState(value);
  
  // Sync with external value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    onChange(e.target.value);
  };
  
  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };
  
  return (
    <div className="relative w-64">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input 
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder} 
        className="w-full pl-8 pr-8"
      />
      {localValue && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-1 top-1/2 h-6 w-6 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={handleClear}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
