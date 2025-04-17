
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Bell, BellOff, CalendarClock, Mail } from "lucide-react";

// Define the notification preferences interface
interface NotificationPreferences {
  newProspects: boolean;
  appointments: boolean;
  emailFrequency: string;
}

export const NotificationsTab = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    newProspects: true,
    appointments: true,
    emailFrequency: "diario"
  });
  
  // Simulating loading preferences from storage
  useEffect(() => {
    const storedPreferences = localStorage.getItem('notificationPreferences');
    if (storedPreferences) {
      try {
        const parsedPreferences = JSON.parse(storedPreferences);
        setPreferences(parsedPreferences);
      } catch (error) {
        console.error("Error parsing stored notification preferences:", error);
      }
    }
  }, []);

  const handleToggleProspectNotifications = (checked: boolean) => {
    setPreferences({ ...preferences, newProspects: checked });
    // Visual feedback for the user
    if (checked) {
      toast({
        title: "Notificaciones activadas",
        description: "Serás notificado cuando se registren nuevos prospectos.",
      });
    } else {
      toast({
        title: "Notificaciones desactivadas",
        description: "Ya no recibirás notificaciones de nuevos prospectos.",
        variant: "destructive"
      });
    }
  };

  const handleToggleAppointmentNotifications = (checked: boolean) => {
    setPreferences({ ...preferences, appointments: checked });
    // Visual feedback for the user
    if (checked) {
      toast({
        title: "Notificaciones activadas",
        description: "Serás notificado sobre tus citas agendadas.",
      });
    } else {
      toast({
        title: "Notificaciones desactivadas",
        description: "Ya no recibirás notificaciones sobre citas agendadas.",
        variant: "destructive"
      });
    }
  };

  const handleEmailFrequencyChange = (value: string) => {
    setPreferences({ ...preferences, emailFrequency: value });
  };
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call to save preferences
    setTimeout(() => {
      try {
        // Store preferences in localStorage
        localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
        
        // Success notification
        toast({
          title: "Configuración guardada",
          description: "La configuración se ha actualizado correctamente."
        });
      } catch (error) {
        // Error notification
        toast({
          title: "Error al guardar",
          description: "No se pudo guardar la configuración. Intenta de nuevo.",
          variant: "destructive"
        });
        console.error("Error saving notification preferences:", error);
      } finally {
        setIsLoading(false);
      }
    }, 800); // Simulate network delay
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferencias de Notificaciones</CardTitle>
        <CardDescription>
          Configura cómo y cuándo recibir notificaciones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Bell className={`h-5 w-5 ${preferences.newProspects ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="notify-prospects">Nuevos prospectos</Label>
                <p className="text-sm text-gray-500">
                  Recibir notificaciones cuando se registren nuevos prospectos
                </p>
              </div>
            </div>
            <Switch 
              id="notify-prospects" 
              checked={preferences.newProspects}
              onCheckedChange={handleToggleProspectNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <CalendarClock className={`h-5 w-5 ${preferences.appointments ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="notify-appointments">Citas agendadas</Label>
                <p className="text-sm text-gray-500">
                  Recibir notificaciones sobre citas próximas
                </p>
              </div>
            </div>
            <Switch 
              id="notify-appointments" 
              checked={preferences.appointments}
              onCheckedChange={handleToggleAppointmentNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Mail className={`h-5 w-5 text-primary`} />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="email-frequency">Frecuencia de emails</Label>
                <p className="text-sm text-gray-500">
                  Recibir resúmenes por correo electrónico
                </p>
              </div>
            </div>
            <Select 
              value={preferences.emailFrequency} 
              onValueChange={handleEmailFrequencyChange}
            >
              <SelectTrigger id="email-frequency" className="w-40">
                <SelectValue placeholder="Frecuencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="diario">Diario</SelectItem>
                <SelectItem value="semanal">Semanal</SelectItem>
                <SelectItem value="mensual">Mensual</SelectItem>
                <SelectItem value="nunca">Nunca</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleSaveSettings} 
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "Guardando..." : "Guardar Configuración"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
