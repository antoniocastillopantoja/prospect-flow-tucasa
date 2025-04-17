
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useNavigation } from "@/hooks/useNavigation";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  action?: string;
  actionId?: string;
}

const Notifications = () => {
  const { goToProspect, goToCalendar } = useNavigation();
  const { toast } = useToast();
  
  // Mock notifications data - in a real app, this would come from an API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Nuevo prospecto registrado",
      description: "María Gómez",
      time: "Hace 5 minutos",
      read: false,
      action: "prospect",
      actionId: "prospecto-123"
    },
    {
      id: 2,
      title: "Cita agendada para hoy",
      description: "Roberto Sánchez",
      time: "3:00 PM",
      read: false,
      action: "calendar"
    },
    {
      id: 3,
      title: "Prospecto actualizado",
      description: "Carlos Vega",
      time: "Hace 1 hora",
      read: true,
      action: "prospect",
      actionId: "prospecto-456"
    },
    {
      id: 4,
      title: "Cita cancelada",
      description: "Laura Martínez",
      time: "Hace 2 horas",
      read: true,
      action: "calendar"
    },
    {
      id: 5,
      title: "Prospecto cerrado exitosamente",
      description: "Javier Luna",
      time: "Hace 1 día",
      read: true,
      action: "prospect",
      actionId: "prospecto-789"
    }
  ]);

  const handleNotificationClick = (notification: Notification) => {
    // Marcar como leída
    markAsRead(notification.id);
    
    // Ejecutar acción asociada
    if (notification.action === "prospect" && notification.actionId) {
      goToProspect(notification.actionId);
      toast({
        title: "Navegando al prospecto",
        description: `Abriendo detalles de ${notification.description}`,
      });
    } else if (notification.action === "calendar") {
      goToCalendar();
      toast({
        title: "Navegando al calendario",
        description: "Mostrando las citas programadas",
      });
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notificaciones</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Notificación</TableHead>
              <TableHead>Detalles</TableHead>
              <TableHead>Tiempo</TableHead>
              <TableHead className="text-right">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow 
                key={notification.id}
                className={`${notification.read ? "bg-white" : "bg-blue-50"} cursor-pointer hover:bg-gray-50`}
                onClick={() => handleNotificationClick(notification)}
              >
                <TableCell className="font-medium">{notification.title}</TableCell>
                <TableCell>{notification.description}</TableCell>
                <TableCell>{notification.time}</TableCell>
                <TableCell className="text-right">
                  {notification.read ? 
                    <span className="text-gray-500">Leída</span> : 
                    <span className="text-primary font-medium">Nueva</span>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Notifications;
