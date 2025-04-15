
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useProspects } from "@/hooks/useProspects";
import { ProspectStatus } from "@/models/Prospect";
import { useProspectEdit } from "@/hooks/useProspectEdit";
import { useProspectNotes, Note } from "@/hooks/useProspectNotes";
import { useAppointments, Appointment } from "@/hooks/useAppointments";

export function useProspectDetail(initialNotes: Note[] = [], initialAppointments: Appointment[] = []) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { prospects, updateProspect, updateProspectStatus, deleteProspect } = useProspects();
  
  const [prospect, setProspect] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Hooks
  const { notes, handleAddNote, setNotes } = useProspectNotes(initialNotes);
  const { 
    appointments, 
    isSchedulingAppointment, 
    appointmentLoading, 
    handleScheduleAppointment, 
    handleCancelAppointmentScheduling, 
    handleAppointmentSubmit,
    setAppointments
  } = useAppointments(initialAppointments);

  // Initialize the edit hook after prospect is defined
  const prospectEditHook = useProspectEdit(prospect, updateProspect);
  
  const handleStatusChange = (newStatus: ProspectStatus) => {
    if (prospect && id) {
      updateProspectStatus(parseInt(id), newStatus);
      setProspect({ ...prospect, status: newStatus });
    }
  };

  const onAppointmentSubmit = (data: any) => {
    const tabToSwitch = handleAppointmentSubmit(data);
    return tabToSwitch;
  };

  const handleDeleteProspect = () => {
    if (prospect && id) {
      deleteProspect(parseInt(id));
      navigate('/prospectos');
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
    prospectEditHook,
    handleStatusChange,
    onAppointmentSubmit,
    handleScheduleAppointment,
    handleCancelAppointmentScheduling,
    handleDeleteProspect,
    handleAddNote
  };
}
