
import { useState } from "react";
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

export const NotificationsTab = () => {
  const { toast } = useToast();
  const [notifyNewProspects, setNotifyNewProspects] = useState(true);
  const [notifyAppointments, setNotifyAppointments] = useState(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración se ha actualizado correctamente."
    });
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-prospects">Nuevos prospectos</Label>
              <p className="text-sm text-gray-500">
                Recibir notificaciones cuando se registren nuevos prospectos
              </p>
            </div>
            <Switch 
              id="notify-prospects" 
              checked={notifyNewProspects}
              onCheckedChange={setNotifyNewProspects}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notify-appointments">Citas agendadas</Label>
              <p className="text-sm text-gray-500">
                Recibir notificaciones sobre citas próximas
              </p>
            </div>
            <Switch 
              id="notify-appointments" 
              checked={notifyAppointments}
              onCheckedChange={setNotifyAppointments}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-frequency">Frecuencia de emails</Label>
              <p className="text-sm text-gray-500">
                Recibir resúmenes por correo electrónico
              </p>
            </div>
            <Select defaultValue="diario">
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
          
          <Button onClick={handleSaveSettings}>Guardar Configuración</Button>
        </div>
      </CardContent>
    </Card>
  );
};
