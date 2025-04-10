
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast";

const SettingsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("usuarios");
  
  // Estados para simulación
  const [notifyNewProspects, setNotifyNewProspects] = useState(true);
  const [notifyAppointments, setNotifyAppointments] = useState(true);
  const [googleCalendarSync, setGoogleCalendarSync] = useState(false);
  
  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración se ha actualizado correctamente."
    });
  };
  
  const handleAddUser = () => {
    toast({
      title: "Usuario añadido",
      description: "Se ha enviado un correo de invitación al nuevo usuario."
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Configuración</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="integraciones">Integraciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usuarios">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agregar Usuario</CardTitle>
                <CardDescription>
                  Añade nuevos usuarios al sistema y asígnales roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="username">Nombre completo</Label>
                      <Input id="username" placeholder="Juan Pérez" />
                    </div>
                    <div>
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input id="email" type="email" placeholder="juan@tucasaideal.com" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="role">Rol</Label>
                    <Select>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prospectador">Prospectador</SelectItem>
                        <SelectItem value="cerrador">Cerrador</SelectItem>
                        <SelectItem value="gerente">Gerente</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={handleAddUser}>Añadir Usuario</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Usuarios Actuales</CardTitle>
                <CardDescription>
                  Gestiona los usuarios existentes y sus permisos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Nombre</th>
                        <th className="text-left p-2">Correo</th>
                        <th className="text-left p-2">Rol</th>
                        <th className="text-left p-2">Estado</th>
                        <th className="text-left p-2">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Juan Pérez</td>
                        <td className="p-2">juan@tucasaideal.com</td>
                        <td className="p-2">Gerente</td>
                        <td className="p-2">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Activo
                          </span>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                              Desactivar
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Ana Rodríguez</td>
                        <td className="p-2">ana@tucasaideal.com</td>
                        <td className="p-2">Prospectador</td>
                        <td className="p-2">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Activo
                          </span>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                              Desactivar
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2">Pedro Ramírez</td>
                        <td className="p-2">pedro@tucasaideal.com</td>
                        <td className="p-2">Cerrador</td>
                        <td className="p-2">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Activo
                          </span>
                        </td>
                        <td className="p-2">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                              Desactivar
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notificaciones">
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
        </TabsContent>
        
        <TabsContent value="integraciones">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
