
import { SearchBox } from "@/components/header/SearchBox";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/settings";
import { convertToCSV } from "@/components/reports/utils/csvUtils";

interface UserListHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredUsers: User[];
}

export const UserListHeader = ({
  searchQuery,
  setSearchQuery,
  filteredUsers,
}: UserListHeaderProps) => {
  const { toast } = useToast();
  
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
  );
};
