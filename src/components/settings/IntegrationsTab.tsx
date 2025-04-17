
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export const IntegrationsTab = () => {
  const { toast } = useToast();
  const [googleCalendarSync, setGoogleCalendarSync] = useState(false);
  
  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración se ha actualizado correctamente."
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integraciones</CardTitle>
        <CardDescription>
          Conecta el CRM con otras herramientas y servicios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Google Calendar</h3>
              <p className="text-sm text-gray-500">
                Sincroniza citas con Google Calendar
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={googleCalendarSync}
                onCheckedChange={setGoogleCalendarSync}
              />
              {googleCalendarSync ? (
                <Button variant="outline" size="sm">Configurar</Button>
              ) : (
                <Button variant="outline" size="sm">Conectar</Button>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">Facebook Lead Forms</h3>
              <p className="text-sm text-gray-500">
                Importa leads automáticamente desde Facebook
              </p>
            </div>
            <Button variant="outline" size="sm">Conectar</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="font-medium">WhatsApp Business</h3>
              <p className="text-sm text-gray-500">
                Envía mensajes a prospectos vía WhatsApp
              </p>
            </div>
            <Button variant="outline" size="sm">Conectar</Button>
          </div>
          
          <Button onClick={handleSaveSettings}>Guardar Configuración</Button>
        </div>
      </CardContent>
    </Card>
  );
};
