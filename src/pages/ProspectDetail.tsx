
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProspects } from "@/hooks/useProspects";
import { ProspectStatus } from "@/models/Prospect";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Refactored components
import ProspectHeader from "@/components/prospects/ProspectHeader";
import ProspectInfoTab from "@/components/prospects/ProspectInfoTab";
import ProspectNotesTab from "@/components/prospects/ProspectNotesTab";
import ProspectAppointmentsTab from "@/components/prospects/ProspectAppointmentsTab";
import ProspectActivityFeed from "@/components/prospects/ProspectActivityFeed";
import { ProspectForm } from "@/components/prospects/ProspectForm";
import AppointmentForm from "@/components/prospects/AppointmentForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ProspectFormData } from "@/types/prospects";
import { format } from "date-fns";

// Define the validation schema using zod
const prospectFormSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  phone: z.string().min(1, { message: "El teléfono es obligatorio" }),
  email: z.string().email({ message: "Email inválido" }).or(z.string().length(0)),
  location: z.string(),
  sector: z.string(),
  minPrice: z.string(),
  maxPrice: z.string(),
  creditType: z.string(),
  assignedTo: z.string(),
  notes: z.string()
});

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
  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [isSchedulingAppointment, setIsSchedulingAppointment] = useState(false);
  const [appointmentLoading, setAppointmentLoading] = useState(false);

  // Notes and appointments data
  const [notes, setNotes] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  
  const form = useForm<ProspectFormData>({
    resolver: zodResolver(prospectFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      sector: "",
      minPrice: "",
      maxPrice: "",
      creditType: "",
      assignedTo: "",
      notes: ""
    },
  });

  useEffect(() => {
    if (prospects.length > 0 && id) {
      const foundProspect = prospects.find(p => p.id === parseInt(id));
      if (foundProspect) {
        setProspect(foundProspect);
        
        // Set form default values when prospect is loaded
        if (foundProspect) {
          const minMaxPrice = foundProspect.priceRange
            .replace('$', '')
            .split(' - ')
            .map(p => p.replace('$', '').replace('M', ''));
            
          form.reset({
            name: foundProspect.name,
            phone: foundProspect.phone,
            email: foundProspect.email || "",
            location: foundProspect.location,
            sector: foundProspect.sector,
            minPrice: minMaxPrice[0] || "",
            maxPrice: minMaxPrice[1]?.replace('M', '') || "",
            creditType: foundProspect.creditType,
            assignedTo: foundProspect.agent,
            notes: foundProspect.notes || ""
          });
        }
        
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
  }, [prospects, id, navigate, toast, form]);
  
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
    setIsSchedulingAppointment(true);
  };

  const handleAppointmentSubmit = (data: any) => {
    setAppointmentLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const newAppointment = {
        id: appointments.length + 1,
        date: format(data.date, 'yyyy-MM-dd'),
        time: data.time,
        location: data.location,
        type: data.type,
        notes: data.notes,
        status: "scheduled"
      };
      
      setAppointments([newAppointment, ...appointments]);
      setAppointmentLoading(false);
      setIsSchedulingAppointment(false);
      
      toast({
        title: "Cita programada",
        description: `Se ha programado una cita para el ${format(data.date, 'dd/MM/yyyy')} a las ${data.time}.`
      });
      
      // Switch to appointments tab after scheduling
      setActiveTab("appointments");
    }, 500);
  };

  const handleCancelAppointmentScheduling = () => {
    setIsSchedulingAppointment(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSaveEdit = form.handleSubmit((data) => {
    if (prospect && id) {
      setEditLoading(true);
      
      const priceRange = data.minPrice && data.maxPrice 
        ? `$${data.minPrice}M - $${data.maxPrice}M` 
        : "";
      
      const updatedProspect = {
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        location: data.location,
        sector: data.sector,
        priceRange,
        creditType: data.creditType,
        agent: data.assignedTo,
        notes: data.notes
      };
      
      updateProspect(parseInt(id), updatedProspect);
      setProspect({ ...prospect, ...updatedProspect });
      
      setTimeout(() => {
        setEditLoading(false);
        setIsEditing(false);
        
        toast({
          title: "Prospecto actualizado",
          description: "La información ha sido actualizada correctamente."
        });
      }, 500);
    }
  });

  const closeEditDialog = () => {
    setIsEditing(false);
    // Reset form when closing the dialog
    if (prospect) {
      const minMaxPrice = prospect.priceRange
        .replace('$', '')
        .split(' - ')
        .map(p => p.replace('$', '').replace('M', ''));
        
      form.reset({
        name: prospect.name,
        phone: prospect.phone,
        email: prospect.email || "",
        location: prospect.location,
        sector: prospect.sector,
        minPrice: minMaxPrice[0] || "",
        maxPrice: minMaxPrice[1]?.replace('M', '') || "",
        creditType: prospect.creditType,
        assignedTo: prospect.agent,
        notes: prospect.notes || ""
      });
    }
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
        onEdit={handleEdit}
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
      
      {/* Edit Prospect Dialog */}
      <Dialog open={isEditing} onOpenChange={closeEditDialog}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Editar Prospecto</DialogTitle>
          </DialogHeader>
          <ProspectForm 
            form={form}
            onSubmit={handleSaveEdit}
            onCancel={closeEditDialog}
            isLoading={editLoading}
          />
        </DialogContent>
      </Dialog>
      
      {/* Schedule Appointment Dialog */}
      <Dialog open={isSchedulingAppointment} onOpenChange={setIsSchedulingAppointment}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Programar Cita</DialogTitle>
          </DialogHeader>
          <AppointmentForm 
            onSubmit={handleAppointmentSubmit}
            onCancel={handleCancelAppointmentScheduling}
            isLoading={appointmentLoading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProspectDetail;
