
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/settings";
import { SearchBox } from "@/components/header/SearchBox";
import { Search, Download, UserCheck, UserX, Edit } from "lucide-react";
import { convertToCSV } from "@/components/reports/utils/csvUtils";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { EditUserDialog, UserEditValues } from "./EditUserDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

interface UserListProps {
  users: User[];
  onToggleStatus: (userId: string) => void;
  onEditUser: (userId: string, userData: UserEditValues) => void;
}

export const UserList = ({ users, onToggleStatus, onEditUser }: UserListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // State for the edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // State for confirmation dialog
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [userToToggle, setUserToToggle] = useState<User | null>(null);
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  });

  const handleExportCSV = () => {
    try {
      // Convert users to CSV format
      const csv = convertToCSV(filteredUsers);
      
      // Create a download link
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      // Create an anchor element and trigger download
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "usuarios.csv");
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      // Show success toast
      toast({
        title: "Exportación exitosa",
        description: "La lista de usuarios ha sido exportada a CSV"
      });
    } catch (error) {
      toast({
        title: "Error de exportación",
        description: "No se pudo exportar la lista de usuarios",
        variant: "destructive"
      });
      console.error("Error exporting users to CSV:", error);
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleToggleStatusClick = (user: User) => {
    setUserToToggle(user);
    setConfirmDialogOpen(true);
  };

  const confirmToggleStatus = () => {
    if (userToToggle) {
      onToggleStatus(userToToggle.id);
      setConfirmDialogOpen(false);
      setUserToToggle(null);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <SearchBox 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Buscar usuario..."
          />
          <div className="text-sm text-muted-foreground">
            {filteredUsers.length} {filteredUsers.length === 1 ? "usuario" : "usuarios"}
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" /> Exportar CSV
        </Button>
      </div>
      
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
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditClick(user)}
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
                        onClick={() => handleToggleStatusClick(user)}
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
      
      {/* Edit User Dialog */}
      <EditUserDialog 
        user={selectedUser}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdateUser={onEditUser}
      />
      
      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {userToToggle?.status === "Activo" 
                ? "¿Desactivar usuario?" 
                : "¿Activar usuario?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {userToToggle?.status === "Activo" 
                ? `Esta acción impedirá que ${userToToggle?.name} inicie sesión en el sistema.` 
                : `Esta acción permitirá que ${userToToggle?.name} vuelva a iniciar sesión en el sistema.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmToggleStatus}
              className={userToToggle?.status === "Activo" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
            >
              {userToToggle?.status === "Activo" ? "Desactivar" : "Activar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
