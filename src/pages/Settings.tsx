
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
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";

// Define schema for user form validation
const userFormSchema = z.object({
  fullName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  role: z.string({ required_error: "Por favor selecciona un rol" })
});

type UserFormValues = z.infer<typeof userFormSchema>;

// Interface for user data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const SettingsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("usuarios");
  
  // Estados para simulación
  const [notifyNewProspects, setNotifyNewProspects] = useState(true);
  const [notifyAppointments, setNotifyAppointments] = useState(true);
  const [googleCalendarSync, setGoogleCalendarSync] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Juan Pérez",
      email: "juan@tucasaideal.com",
      role: "Gerente",
      status: "Activo"
    },
    {
      id: "2",
      name: "Ana Rodríguez",
      email: "ana@tucasaideal.com",
      role: "Prospectador",
      status: "Activo"
    },
    {
      id: "3",
      name: "Pedro Ramírez",
      email: "pedro@tucasaideal.com",
      role: "Cerrador",
      status: "Activo"
    }
  ]);
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: ""
    }
  });

  const handleSaveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "La configuración se ha actualizado correctamente."
    });
  };
  
  const handleAddUser = (data: UserFormValues) => {
    // Create a new user with the form data
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: data.fullName,
      email: data.email,
      role: data.role,
      status: "Activo"
    };
    
    // Add the new user to the users array
    setUsers([...users, newUser]);
    
    // Show success toast
    toast({
      title: "Usuario añadido",
      description: "Se ha enviado un correo de invitación al nuevo usuario."
    });
    
    // Reset the form
    form.reset();
  };

  const handleEditUser = (userId: string) => {
    // This would open an edit dialog or form in a real implementation
    toast({
      title: "Editar usuario",
      description: `Editando el usuario con ID ${userId}`
    });
  };

  const handleToggleUserStatus = (userId: string) => {
    // Toggle the status of the user
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === "Activo" ? "Inactivo" : "Activo";
        return { ...user, status: newStatus };
      }
      return user;
    }));

    // Show status change toast
    const user = users.find(u => u.id === userId);
    const newStatus = user?.status === "Activo" ? "desactivado" : "activado";
    
    toast({
      title: "Estado actualizado",
      description: `El usuario ha sido ${newStatus} correctamente.`
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddUser)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="fullName">Nombre completo</Label>
                            <FormControl>
                              <Input id="fullName" placeholder="Juan Pérez" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <Label htmlFor="email">Correo electrónico</Label>
                            <FormControl>
                              <Input id="email" type="email" placeholder="juan@tucasaideal.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <Label htmlFor="role">Rol</Label>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger id="role">
                                <SelectValue placeholder="Selecciona un rol" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="prospectador">Prospectador</SelectItem>
                              <SelectItem value="cerrador">Cerrador</SelectItem>
                              <SelectItem value="gerente">Gerente</SelectItem>
                              <SelectItem value="admin">Administrador</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit">
                      <UserPlus className="mr-2 h-4 w-4" /> 
                      Añadir Usuario
                    </Button>
                  </form>
                </Form>
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
                      {users.map(user => (
                        <tr key={user.id} className="border-b">
                          <td className="p-2">{user.name}</td>
                          <td className="p-2">{user.email}</td>
                          <td className="p-2">{user.role}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === "Activo" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-2">
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleEditUser(user.id)}
                              >
                                Editar
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className={user.status === "Activo" 
                                  ? "text-red-600 border-red-600 hover:bg-red-50" 
                                  : "text-green-600 border-green-600 hover:bg-green-50"
                                }
                                onClick={() => handleToggleUserStatus(user.id)}
                              >
                                {user.status === "Activo" ? "Desactivar" : "Activar"}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
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
