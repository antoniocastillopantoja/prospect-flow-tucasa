
import React from "react";
import AppointmentDialog from "@/components/prospects/dialogs/AppointmentDialog";
import EditProspectDialog from "@/components/prospects/dialogs/EditProspectDialog";
import PropertyCommissionDialog, { PropertyCommissionFormData } from "@/components/prospects/dialogs/PropertyCommissionDialog";

interface ProspectDetailDialogsProps {
  isSchedulingAppointment: boolean;
  appointmentLoading: boolean;
  onAppointmentOpenChange: (open: boolean) => void;
  onAppointmentSubmit: (data: any) => void;
  onAppointmentCancel: () => void;
  prospectEditHook: any;
  onDeleteProspect: () => void;
  prospectId: number;
  isCommissionDialogOpen?: boolean;
  onCommissionDialogOpenChange?: (open: boolean) => void;
  onCommissionSubmit?: (data: PropertyCommissionFormData) => void;
  onCommissionCancel?: () => void;
  commissionLoading?: boolean;
}

const ProspectDetailDialogs: React.FC<ProspectDetailDialogsProps> = ({
  isSchedulingAppointment,
  appointmentLoading,
  onAppointmentOpenChange,
  onAppointmentSubmit,
  onAppointmentCancel,
  prospectEditHook,
  onDeleteProspect,
  prospectId,
  isCommissionDialogOpen = false,
  onCommissionDialogOpenChange = () => {},
  onCommissionSubmit = () => {},
  onCommissionCancel = () => {},
  commissionLoading = false
}) => {
  return (
    <>
      <EditProspectDialog 
        isOpen={prospectEditHook.isEditing}
        onOpenChange={prospectEditHook.closeEditDialog}
        form={prospectEditHook.form}
        onSubmit={prospectEditHook.handleSaveEdit}
        onCancel={prospectEditHook.closeEditDialog}
        isLoading={prospectEditHook.editLoading}
        onDelete={onDeleteProspect}
        prospectId={prospectId}
      />
      
      <AppointmentDialog 
        isOpen={isSchedulingAppointment}
        onOpenChange={(open) => {
          if (!open) onAppointmentCancel();
        }}
        onSubmit={onAppointmentSubmit}
        onCancel={onAppointmentCancel}
        isLoading={appointmentLoading}
      />

      <PropertyCommissionDialog
        isOpen={isCommissionDialogOpen}
        onOpenChange={onCommissionDialogOpenChange}
        onSubmit={onCommissionSubmit}
        onCancel={onCommissionCancel}
        isLoading={commissionLoading}
      />
    </>
  );
};

export default ProspectDetailDialogs;
