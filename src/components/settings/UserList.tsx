
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/settings";
import { SearchBox } from "@/components/header/SearchBox";
import { Search, Download } from "lucide-react";
import { convertToCSV } from "@/components/reports/utils/csvUtils";

interface UserListProps {
  users: User[];
  onToggleStatus: (userId: string) => void;
  onEditUser: (userId: string) => void;
}

export const UserList = ({ users, onToggleStatus, onEditUser }: UserListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
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
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-muted-foreground">
                  No se encontraron usuarios que coincidan con la búsqueda
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
