
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserForm, UserFormValues } from "./UserForm";
import { UserList } from "./UserList";
import { User } from "@/types/settings";

export const UsersTab = () => {
  const { toast } = useToast();
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Agregar Usuario</CardTitle>
          <CardDescription>
            Añade nuevos usuarios al sistema y asígnales roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm onAddUser={handleAddUser} />
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
          <UserList 
            users={users}
            onToggleStatus={handleToggleUserStatus}
            onEditUser={handleEditUser}
          />
        </CardContent>
      </Card>
    </div>
  );
};
