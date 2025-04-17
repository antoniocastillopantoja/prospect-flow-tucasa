
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Custom hooks
import { useProspectDetail } from "@/hooks/useProspectDetail";

// Components
import ProspectDetailLoading from "@/components/prospects/ProspectDetailLoading";
import ProspectDetailContent from "@/components/prospects/ProspectDetailContent";
import ProspectDetailDialogs from "@/components/prospects/ProspectDetailDialogs";
import { Appointment } from "@/hooks/useAppointments";

const ProspectDetail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  
  // Mock initial data
  const initialNotes = [
    {
      id: 1,
      date: "2025-04-09",
      time: "10:30 AM",
      text: "Cliente interesado en propiedades de 3 recámaras con estudio. Prefiere planta baja o con elevador.",
      author: "Ana Rodríguez"
    },
    {
      id: 2,
      date: "2025-04-08",
      time: "3:45 PM",
      text: "Primera llamada. Mostró interés en la zona sur, particularmente Del Valle y Narvarte.",
      author: "Juan Pérez"
    }
  ];

  // Fix the type by explicitly setting the status as a literal type
  const initialAppointments: Appointment[] = [
    {
      id: 1,
      date: "2025-04-12",
      time: "11:00 AM",
      location: "Propiedad en Av. División del Norte 1234",
      type: "visita",
      status: "scheduled" // Explicitly use the literal type
    }
  ];

  // Use our custom hook that encapsulates all prospect detail logic
  const {
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
    handleCommissionCancel,
    handleCommissionDialogOpenChange // Add this line to destructure the function
  } = useProspectDetail(initialNotes, initialAppointments);

  // Handle appointment submission and tab switching
  const handleAppointmentSubmit = async (data: any) => {
    const tabToSwitch = await onAppointmentSubmit(data);
    if (tabToSwitch) {
      setActiveTab(tabToSwitch);
    }
  };

  if (loading || !prospect) {
    return <ProspectDetailLoading />;
  }

  return (
    <div>
      <ProspectDetailContent
        prospect={prospect}
        notes={notes}
        appointments={appointments}
        onStatusChange={handleStatusChange}
        onScheduleAppointment={handleScheduleAppointment}
        onEdit={prospectEditHook.handleEdit}
        onAddNote={handleAddNote}
        onCompleteAppointment={handleCompleteAppointment}
        onCancelAppointment={handleCancelAppointment}
      />
      
      <ProspectDetailDialogs
        isSchedulingAppointment={isSchedulingAppointment}
        appointmentLoading={appointmentLoading}
        onAppointmentOpenChange={(open) => {
          if (!open) handleCancelAppointmentScheduling();
        }}
        onAppointmentSubmit={handleAppointmentSubmit}
        onAppointmentCancel={handleCancelAppointmentScheduling}
        prospectEditHook={prospectEditHook}
        onDeleteProspect={handleDeleteProspect}
        prospectId={prospect.id}
        isCommissionDialogOpen={isCommissionDialogOpen}
        onCommissionDialogOpenChange={handleCommissionDialogOpenChange} // Use the destructured function
        onCommissionSubmit={handleCommissionSubmit}
        onCommissionCancel={handleCommissionCancel}
        commissionLoading={commissionLoading}
      />
    </div>
  );
};

export default ProspectDetail;
