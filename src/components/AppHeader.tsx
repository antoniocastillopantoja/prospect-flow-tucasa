
import { SearchBox } from "@/components/header/SearchBox";
import { NotificationDropdown } from "@/components/header/NotificationDropdown";
import { NewProspectButton } from "@/components/header/NewProspectButton";

interface AppHeaderProps {
  toggleSidebar: () => void;
}

export function AppHeader({ toggleSidebar }: AppHeaderProps) {
  return (
    <header className="border-b bg-background p-4 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-lg font-bold text-primary">Tu Casa Ideal CRM</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <SearchBox />
        <NotificationDropdown />
        <NewProspectButton />
      </div>
    </header>
  );
}
