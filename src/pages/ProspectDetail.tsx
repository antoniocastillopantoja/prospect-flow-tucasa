
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProspects } from "@/hooks/useProspects";
import { ProspectStatus } from "@/models/Prospect";
import { useToast } from "@/hooks/use-toast";

// Refactored components
import ProspectHeader from "@/components/prospects/ProspectHeader";
import ProspectInfoTab from "@/components/prospects/ProspectInfoTab";
import ProspectNotesTab from "@/components/prospects/ProspectNotesTab";
import ProspectAppointmentsTab from "@/components/prospects/ProspectAppointmentsTab";
import ProspectActivityFeed from "@/components/prospects/ProspectActivityFeed";

const ProspectDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || "info";
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { prospects, updateProspect, updateProspectStatus } = useProspects();
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [prospect, setProspect] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Notes and appointments data
  const [notes, setNotes] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    if (prospects.length > 0 && id) {
      const foundProspect = prospects.find(p => p.id === parseInt(id));
      if (foundProspect) {
        setProspect(foundProspect);
        
        // Mock data for notes and appointments
        setNotes([
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
        ]);
        
        setAppointments([
          {
            id: 1,
            date: "2025-04-12",
            time: "11:00 AM",
            location: "Propiedad en Av. División del Norte 1234",
            status: "scheduled"
          }
        ]);
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
  
  const handleStatusChange = (newStatus: ProspectStatus) => {
    if (prospect && id) {
      updateProspectStatus(parseInt(id), newStatus);
      setProspect({ ...prospect, status: newStatus });
    }
  };
  
  const handleAddNote = (noteText: string) => {
    if (noteText.trim() !== "") {
      const newNote = {
        id: notes.length + 1,
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: noteText,
        author: "Juan Pérez" // Current user (hardcoded for demo)
      };
      
      setNotes([newNote, ...notes]);
    }
  };
  
  const handleScheduleAppointment = () => {
    // Here would be a modal to schedule appointment
    toast({
      title: "Programar cita",
      description: "Funcionalidad en desarrollo."
    });
  };

  if (loading || !prospect) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Cargando información del prospecto...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProspectHeader 
        prospect={prospect}
        onStatusChange={handleStatusChange}
        onScheduleAppointment={handleScheduleAppointment}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="info">Información</TabsTrigger>
              <TabsTrigger value="notes">Notas</TabsTrigger>
              <TabsTrigger value="appointments">Citas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="mt-6">
              <ProspectInfoTab prospect={prospect} />
            </TabsContent>
            
            <TabsContent value="notes" className="mt-6">
              <ProspectNotesTab 
                notes={notes}
                onAddNote={handleAddNote}
              />
            </TabsContent>
            
            <TabsContent value="appointments" className="mt-6">
              <ProspectAppointmentsTab 
                appointments={appointments}
                onScheduleAppointment={handleScheduleAppointment}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <ProspectActivityFeed 
            prospect={prospect}
            notes={notes}
            appointments={appointments}
          />
        </div>
      </div>
    </div>
  );
};

export default ProspectDetail;
