
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProspects } from "@/hooks/useProspects";
import { ProspectStatus } from "@/models/Prospect";
import { useProspectEdit } from "@/hooks/useProspectEdit";
import { useProspectNotes, Note } from "@/hooks/useProspectNotes";
import { useAppointments, Appointment } from "@/hooks/useAppointments";
import { PropertyCommissionFormData } from "@/components/prospects/dialogs/PropertyCommissionDialog";

export function useProspectDetail(initialNotes: Note[] = [], initialAppointments: Appointment[] = []) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { prospects, updateProspect, updateProspectStatus, deleteProspect } = useProspects();
  
  const [prospect, setProspect] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCommissionDialogOpen, setIsCommissionDialogOpen] = useState(false);
  const [commissionLoading, setCommissionLoading] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState<ProspectStatus | null>(null);

  // Hooks
  const { notes, handleAddNote, setNotes } = useProspectNotes(initialNotes);
  const { 
    appointments, 
    isSchedulingAppointment, 
    appointmentLoading, 
    handleScheduleAppointment, 
    handleCancelAppointmentScheduling, 
    handleAppointmentSubmit,
    setAppointments,
    completeAppointment,
    cancelAppointment
  } = useAppointments(initialAppointments);

  // Initialize the edit hook after prospect is defined
  const prospectEditHook = useProspectEdit(prospect, updateProspect);
  
  const handleStatusChange = (newStatus: ProspectStatus) => {
    if (prospect && id) {
      if (newStatus === "closed") {
        setPendingStatusChange(newStatus);
        setIsCommissionDialogOpen(true);
      } else {
        updateProspectStatus(parseInt(id), newStatus);
        setProspect({ ...prospect, status: newStatus });
        
        // If setting to appointment status, check for existing appointments
        if (newStatus === "appointment" && appointments.length === 0) {
          handleScheduleAppointment();
        }
      }
    }
  };

  const handleCommissionSubmit = (data: PropertyCommissionFormData) => {
    if (prospect && id && pendingStatusChange === "closed") {
      setCommissionLoading(true);
      
      // Update prospect with property ID and commission percentage
      const updatedProspect = {
        ...prospect,
        propertyId: data.propertyId,
        commissionPercentage: data.commissionPercentage,
        status: pendingStatusChange
      };
      
      // Simulate API call delay
      setTimeout(() => {
        updateProspect(parseInt(id), updatedProspect);
        setProspect(updatedProspect);
        setCommissionLoading(false);
        setIsCommissionDialogOpen(false);
        setPendingStatusChange(null);
        
        toast({
          title: "Cliente cerrado exitosamente",
          description: `Propiedad ${data.propertyId} con ${data.commissionPercentage}% de comisión`
        });
      }, 500);
    }
  };

  const handleCommissionCancel = () => {
    setIsCommissionDialogOpen(false);
    setPendingStatusChange(null);
  };

  // Ensure this function returns the promise from handleAppointmentSubmit
  const onAppointmentSubmit = async (data: any) => {
    return await handleAppointmentSubmit(data);
  };

  const handleDeleteProspect = () => {
    if (prospect && id) {
      deleteProspect(parseInt(id));
      navigate('/prospectos');
    }
  };
  
  // Handle appointment status changes
  const handleCompleteAppointment = (appointmentId: number) => {
    completeAppointment(appointmentId);
    
    // If this is the only appointment and it's completed, also update prospect status
    if (appointments.length === 1 && prospect && prospect.status === "appointment") {
      updateProspectStatus(parseInt(id!), "closed");
      setProspect({ ...prospect, status: "closed" });
    }
  };
  
  const handleCancelAppointment = (appointmentId: number) => {
    cancelAppointment(appointmentId);
    
    // If this is the only appointment and it's canceled, also update prospect status
    if (appointments.length === 1 && prospect && prospect.status === "appointment") {
      updateProspectStatus(parseInt(id!), "canceled");
      setProspect({ ...prospect, status: "canceled" });
    }
  };

  // Load prospect data
  useEffect(() => {
    if (prospects.length > 0 && id) {
      const foundProspect = prospects.find(p => p.id === parseInt(id));
      if (foundProspect) {
        setProspect(foundProspect);
        prospectEditHook.resetForm(); // Reset the form with new prospect data
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No se encontró el prospecto solicitado."
        });
        navigate("/prospectos");
      }
      setLoading(false);
    }
  }, [prospects, id, navigate, toast]);

  return {
    prospect,
    loading,
    notes,
    appointments,
    isSchedulingAppointment,
    appointmentLoading,
    isCommissionDialogOpen,
    commissionLoading,
    prospectEditHook,
    handleStatusChange,
    onAppointmentSubmit,
    handleScheduleAppointment,
    handleCancelAppointmentScheduling,
    handleDeleteProspect,
    handleAddNote,
    handleCompleteAppointment,
    handleCancelAppointment,
    handleCommissionSubmit,
    handleCommissionCancel
  };
}
