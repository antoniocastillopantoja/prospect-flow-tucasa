
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/settings";

interface UserListProps {
  users: User[];
  onToggleStatus: (userId: string) => void;
  onEditUser: (userId: string) => void;
}

export const UserList = ({ users, onToggleStatus, onEditUser }: UserListProps) => {
  return (
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
                    onClick={() => onEditUser(user.id)}
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
                    onClick={() => onToggleStatus(user.id)}
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
  );
};
