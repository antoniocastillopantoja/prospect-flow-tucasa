
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
import { useToast } from "@/hooks/use-toast";

// Ejemplo de datos de notificaciones
const notificaciones = [
  {
    id: 1,
    title: "Nuevo prospecto registrado",
    description: "María Gómez",
    time: "Hace 5 minutos",
    action: "prospect",
    actionId: "prospecto-123",
    read: false
  },
  {
    id: 2,
    title: "Cita agendada para hoy",
    description: "Roberto Sánchez",
    time: "3:00 PM",
    action: "calendar",
    actionId: "",
    read: false
  }
];

export function NotificationDropdown() {
  const { goToNotifications, goToProspect, goToCalendar } = useNavigation();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
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
  
  const handleNotificationClick = (notificacion: typeof notificaciones[0]) => {
    // Cerrar el dropdown
    document.body.click();
    
    // Lógica según el tipo de acción
    switch (notificacion.action) {
      case "prospect":
        goToProspect(notificacion.actionId);
        toast({
          title: "Navegando al prospecto",
          description: `Abriendo detalles de ${notificacion.description}`,
        });
        break;
      case "calendar":
        goToCalendar();
        toast({
          title: "Navegando al calendario",
          description: "Mostrando las citas programadas para hoy",
        });
        break;
      default:
        goToNotifications();
        break;
    }
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
          {notificaciones.map(notificacion => (
            <DropdownMenuItem 
              key={notificacion.id}
              className="p-3 cursor-pointer"
              onClick={() => handleNotificationClick(notificacion)}
            >
              <div>
                <p className="font-medium">{notificacion.title}</p>
                <p className="text-sm text-gray-500">{notificacion.description} - {notificacion.time}</p>
              </div>
            </DropdownMenuItem>
          ))}
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
