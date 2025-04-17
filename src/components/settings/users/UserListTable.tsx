
import { User } from "@/types/settings";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { UserListActions } from "./UserListActions";

interface UserListTableProps {
  filteredUsers: User[];
  onEditClick: (user: User) => void;
  onToggleStatusClick: (user: User) => void;
  onDeleteClick: (user: User) => void;
}

export const UserListTable = ({ 
  filteredUsers, 
  onEditClick, 
  onToggleStatusClick,
  onDeleteClick
}: UserListTableProps) => {
  return (
    <div className="overflow-x-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === "Activo" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <UserListActions 
                    user={user} 
                    onEditClick={onEditClick} 
                    onToggleStatusClick={onToggleStatusClick}
                    onDeleteClick={onDeleteClick} 
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-4">
                No se encontraron usuarios que coincidan con la búsqueda
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
