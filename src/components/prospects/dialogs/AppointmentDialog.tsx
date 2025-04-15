
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AppointmentForm from "@/components/prospects/AppointmentForm";

interface AppointmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const AppointmentDialog: React.FC<AppointmentDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  onCancel,
  isLoading
}) => {
  const handleSubmit = (data: any) => {
    // Add the Google Calendar flag to the data
    onSubmit({ ...data, useGoogleCalendar: true });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Programar Cita</DialogTitle>
          <DialogDescription>
            Complete los datos para programar una nueva cita con el prospecto.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm 
          onSubmit={handleSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
          useGoogleCalendar={true}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
