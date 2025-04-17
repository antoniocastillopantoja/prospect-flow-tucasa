
import { User } from "@/types/settings";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface ConfirmToggleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onConfirm: () => void;
}

export const ConfirmToggleDialog = ({
  open,
  onOpenChange,
  user,
  onConfirm
}: ConfirmToggleDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {user?.status === "Activo" 
              ? "¿Desactivar usuario?" 
              : "¿Activar usuario?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {user?.status === "Activo" 
              ? `Esta acción impedirá que ${user?.name} inicie sesión en el sistema.` 
              : `Esta acción permitirá que ${user?.name} vuelva a iniciar sesión en el sistema.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className={user?.status === "Activo" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}
          >
            {user?.status === "Activo" ? "Desactivar" : "Activar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
