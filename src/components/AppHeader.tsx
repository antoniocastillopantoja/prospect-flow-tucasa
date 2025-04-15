
import { SearchBox } from "@/components/header/SearchBox";
import { NotificationDropdown } from "@/components/header/NotificationDropdown";
import { NewProspectButton } from "@/components/header/NewProspectButton";
import { useLocation } from "react-router-dom";
import { useSearchContext } from "@/contexts/SearchContext";

interface AppHeaderProps {
  toggleSidebar: () => void;
}

export function AppHeader({ toggleSidebar }: AppHeaderProps) {
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useSearchContext();
  
  // Determinar qué placeholder mostrar dependiendo de la ruta
  const getSearchPlaceholder = () => {
    if (location.pathname === "/") {
      return "Buscar prospectos o citas...";
    } else if (location.pathname.includes("/prospectos")) {
      return "Buscar prospectos...";
    }
    return "Buscar...";
  };

  return (
    <header className="border-b bg-background p-4 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-lg font-bold text-primary">Tu Casa Ideal CRM</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <SearchBox 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder={getSearchPlaceholder()}
        />
        <NotificationDropdown />
        <NewProspectButton />
      </div>
    </header>
  );
}
