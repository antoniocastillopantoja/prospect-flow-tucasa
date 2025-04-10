
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppHeaderProps {
  toggleSidebar: () => void;
}

export function AppHeader({ toggleSidebar }: AppHeaderProps) {
  return (
    <header className="border-b bg-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Buscar prospectos..." 
            className="w-full pl-8"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4 font-medium">Notificaciones</div>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div>
                <p className="font-medium">Nuevo prospecto registrado</p>
                <p className="text-sm text-gray-500">María Gómez - Hace 5 minutos</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div>
                <p className="font-medium">Cita agendada para hoy</p>
                <p className="text-sm text-gray-500">Roberto Sánchez - 3:00 PM</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 text-center border-t cursor-pointer">
              <span className="text-primary">Ver todas</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="default" 
          size="sm"
          className="bg-primary hover:bg-primary/90"
        >
          + Nuevo Prospecto
        </Button>
      </div>
    </header>
  );
}
