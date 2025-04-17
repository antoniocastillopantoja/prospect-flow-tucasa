
import { Button } from "@/components/ui/button";
import { User } from "@/types/settings";
import { Edit, UserCheck, UserX } from "lucide-react";

interface UserListActionsProps {
  user: User;
  onEditClick: (user: User) => void;
  onToggleStatusClick: (user: User) => void;
}

export const UserListActions = ({ user, onEditClick, onToggleStatusClick }: UserListActionsProps) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => onEditClick(user)}
      >
        <Edit className="h-4 w-4 mr-1" /> Editar
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className={user.status === "Activo" 
          ? "text-red-600 border-red-600 hover:bg-red-50" 
          : "text-green-600 border-green-600 hover:bg-green-50"
        }
        onClick={() => onToggleStatusClick(user)}
      >
        {user.status === "Activo" ? (
          <>
            <UserX className="h-4 w-4 mr-1" /> Desactivar
          </>
        ) : (
          <>
            <UserCheck className="h-4 w-4 mr-1" /> Activar
          </>
        )}
      </Button>
    </div>
  );
};
