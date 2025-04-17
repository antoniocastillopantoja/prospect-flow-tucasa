
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

interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onConfirm: () => void;
  canDelete: boolean;
}

export const ConfirmDeleteDialog = ({
  open,
  onOpenChange,
  user,
  onConfirm,
  canDelete
}: ConfirmDeleteDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            ¿Eliminar usuario?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {canDelete 
              ? `Esta acción eliminará permanentemente a ${user?.name} del sistema. Esta acción no se puede deshacer.`
              : `No es posible eliminar a ${user?.name} porque tiene relaciones con otras entidades en el sistema.`
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          {canDelete && (
            <AlertDialogAction 
              onClick={onConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
