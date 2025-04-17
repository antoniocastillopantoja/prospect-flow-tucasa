
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AppointmentForm from "@/components/prospects/AppointmentForm";
import { useToast } from "@/hooks/use-toast";

interface NewAppointmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}

const NewAppointmentDialog: React.FC<NewAppointmentDialogProps> = ({
  isOpen,
  onOpenChange,
  onSubmit,
  onCancel,
  isLoading
}) => {
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    // Add the Google Calendar flag to the data
    onSubmit({ ...data, useGoogleCalendar: true });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nueva Cita</DialogTitle>
          <DialogDescription>
            Complete los datos para programar una nueva cita en el calendario.
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

export default NewAppointmentDialog;
