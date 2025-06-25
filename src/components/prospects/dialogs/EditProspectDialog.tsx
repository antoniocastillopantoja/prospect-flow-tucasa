import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ProspectForm } from "@/components/prospects/ProspectForm";
import { UseFormReturn } from "react-hook-form";
import { ProspectFormData } from "@/types/prospects";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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
import { ProspectStatus } from "@/models/Prospect";

interface EditProspectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<ProspectFormData>;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
  onDelete?: () => void;
  prospectId?: string;
  prospectStatus?: ProspectStatus;
}

const EditProspectDialog: React.FC<EditProspectDialogProps> = ({
  isOpen,
  onOpenChange,
  form,
  onSubmit,
  onCancel,
  isLoading,
  onDelete,
  prospectId,
  prospectStatus = "new"
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete();
    }
    setIsDeleteDialogOpen(false);
  };

  // Only show delete button if the prospect status is "new"
  const canDelete = prospectStatus === "new";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Editar Prospecto</DialogTitle>
            <DialogDescription>
              Modifica la información del prospecto{canDelete ? " o haz clic en el botón de borrar para eliminarlo" : ""}.
            </DialogDescription>
          </DialogHeader>
          {canDelete && (
            <div className="flex justify-end mb-4">
              <Button 
                variant="destructive" 
                onClick={handleDeleteClick}
                className="flex items-center gap-2"
              >
                <Trash2 size={16} />
                Borrar Prospecto
              </Button>
            </div>
          )}
          <ProspectForm 
            form={form}
            onSubmit={onSubmit}
            onCancel={onCancel}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el prospecto
              y toda la información relacionada con él.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditProspectDialog;
