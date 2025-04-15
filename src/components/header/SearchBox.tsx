
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBox() {
  return (
    <div className="relative w-64">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input 
        placeholder="Buscar prospectos..." 
        className="w-full pl-8"
      />
    </div>
  );
}
