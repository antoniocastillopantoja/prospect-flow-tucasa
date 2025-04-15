
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProspectForm } from "@/components/prospects/ProspectForm";
import { UseFormReturn } from "react-hook-form";
import { ProspectFormData } from "@/types/prospects";

interface EditProspectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<ProspectFormData>;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

const EditProspectDialog: React.FC<EditProspectDialogProps> = ({
  isOpen,
  onOpenChange,
  form,
  onSubmit,
  onCancel,
  isLoading
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Editar Prospecto</DialogTitle>
        </DialogHeader>
        <ProspectForm 
          form={form}
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProspectDialog;
