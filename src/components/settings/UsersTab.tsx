
import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UserForm, UserFormValues } from "./UserForm";
import { UserList } from "./users/UserList";
import { User } from "@/types/settings";
import { UserEditValues } from "./EditUserDialog";

// Sample data to simulate user relationships with other entities
const userRelationships = {
  "1": ["prospect_1", "appointment_2"], // User has relationships
  "2": [],  // User has no relationships
  "3": ["prospect_3", "prospect_4", "appointment_5"]  // User has relationships
};

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

  // Initialize temporary passwords from localStorage
  useEffect(() => {
    if (!localStorage.getItem("tempPasswords")) {
      localStorage.setItem("tempPasswords", JSON.stringify({}));
    }
  }, []);

  const handleAddUser = (data: UserFormValues & { temporaryPassword?: string }) => {
    // Create a new user with the form data
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: data.fullName,
      email: data.email,
      role: capitalizeFirstLetter(data.role),
      status: "Activo"
    };
    
    // Add the new user to the users array
    setUsers([...users, newUser]);
    
    // Save the temporary password in localStorage if provided
    if (data.temporaryPassword) {
      const tempPasswords = JSON.parse(localStorage.getItem("tempPasswords") || "{}");
      tempPasswords[data.email] = data.temporaryPassword;
      localStorage.setItem("tempPasswords", JSON.stringify(tempPasswords));
    }
  };

  const handleEditUser = (userId: string, userData: UserEditValues) => {
    // Update the user in the users array
    setUsers(users.map(user => {
      if (user.id === userId) {
        // Get old email before updating
        const oldEmail = user.email;
        
        // Update user
        const updatedUser = {
          ...user,
          name: userData.name,
          email: userData.email,
          role: capitalizeFirstLetter(userData.role)
        };
        
        // If email changed, update the temp password entry
        if (oldEmail !== userData.email) {
          const tempPasswords = JSON.parse(localStorage.getItem("tempPasswords") || "{}");
          if (tempPasswords[oldEmail]) {
            tempPasswords[userData.email] = tempPasswords[oldEmail];
            delete tempPasswords[oldEmail];
            localStorage.setItem("tempPasswords", JSON.stringify(tempPasswords));
          }
        }
        
        return updatedUser;
      }
      return user;
    }));
    
    // Show success toast
    toast({
      title: "Usuario actualizado",
      description: "Los datos del usuario han sido actualizados correctamente."
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
  
  const handleDeleteUser = (userId: string) => {
    // Delete the user from the users array
    setUsers(users.filter(user => user.id !== userId));
    
    // Update the temp passwords if needed
    const deletedUser = users.find(user => user.id === userId);
    if (deletedUser) {
      const tempPasswords = JSON.parse(localStorage.getItem("tempPasswords") || "{}");
      if (tempPasswords[deletedUser.email]) {
        delete tempPasswords[deletedUser.email];
        localStorage.setItem("tempPasswords", JSON.stringify(tempPasswords));
      }
    }
    
    // Show success toast
    toast({
      title: "Usuario eliminado",
      description: "El usuario ha sido eliminado correctamente."
    });
  };
  
  const checkUserCanBeDeleted = (userId: string): boolean => {
    // Check if the user has any relationships with other entities
    const relationships = userRelationships[userId as keyof typeof userRelationships] || [];
    return relationships.length === 0;
  };
  
  // Helper function to capitalize the first letter of each word
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
            onDeleteUser={handleDeleteUser}
            checkUserCanBeDeleted={checkUserCanBeDeleted}
          />
        </CardContent>
      </Card>
    </div>
  );
};
