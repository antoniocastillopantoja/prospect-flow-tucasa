
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ProspectSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProspectSearchBar: React.FC<ProspectSearchBarProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="relative flex-grow">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input 
        placeholder="Buscar por nombre, ubicación o teléfono..." 
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default ProspectSearchBar;
