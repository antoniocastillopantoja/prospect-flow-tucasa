
import React, { useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchContext } from "@/contexts/SearchContext";

interface ProspectSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProspectSearchBar: React.FC<ProspectSearchBarProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  const { setSearchQuery: setGlobalSearchQuery } = useSearchContext();
  
  // Synchronize with global search context when local search changes
  useEffect(() => {
    setGlobalSearchQuery(searchQuery);
  }, [searchQuery, setGlobalSearchQuery]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleClear = () => {
    setSearchQuery("");
  };
  
  return (
    <div className="relative flex-grow">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input 
        placeholder="Buscar por nombre, ubicación o teléfono..." 
        className="pl-8 pr-8"
        value={searchQuery}
        onChange={handleChange}
      />
      {searchQuery && (
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
};

export default ProspectSearchBar;
