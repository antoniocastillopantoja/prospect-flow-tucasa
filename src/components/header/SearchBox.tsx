
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBox({ value, onChange, placeholder = "Buscar prospectos..." }: SearchBoxProps) {
  return (
    <div className="relative w-64">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} 
        className="w-full pl-8"
      />
    </div>
  );
}
