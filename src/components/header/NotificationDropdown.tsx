
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigation } from "@/hooks/useNavigation";
import { useLocation, useNavigate } from "react-router-dom";

export function NotificationDropdown() {
  const { goToNotifications } = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();
  const isOnNotificationsPage = location.pathname === "/notificaciones";
  
  const handleBellClick = () => {
    if (isOnNotificationsPage) {
      // Return to previous page
      navigate(-1);
    }
  };
  
  const handleViewAllClick = () => {
    goToNotifications();
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          onClick={isOnNotificationsPage ? handleBellClick : undefined}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </Button>
      </DropdownMenuTrigger>
      {!isOnNotificationsPage && (
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
          <DropdownMenuItem 
            className="py-2 text-center border-t cursor-pointer"
            onClick={handleViewAllClick}
          >
            <span className="text-primary">Ver todas</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
