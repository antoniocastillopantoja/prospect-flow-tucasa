
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
    <header className="border-b bg-crm-red p-4 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-crm-gold text-lg font-bold">Vendemos tu casa de 1 a 60 días</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Buscar prospectos..." 
            className="w-full pl-8 bg-white"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-crm-gold">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-crm-gold rounded-full"></span>
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
          className="bg-crm-gold hover:bg-crm-gold/90 text-crm-red font-bold"
        >
          + Nuevo Prospecto
        </Button>
      </div>
    </header>
  );
}
