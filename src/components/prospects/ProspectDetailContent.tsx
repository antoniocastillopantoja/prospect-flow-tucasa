
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProspectHeader from "@/components/prospects/ProspectHeader";
import ProspectInfoTab from "@/components/prospects/ProspectInfoTab";
import ProspectNotesTab from "@/components/prospects/ProspectNotesTab";
import ProspectAppointmentsTab from "@/components/prospects/ProspectAppointmentsTab";
import ProspectActivityFeed from "@/components/prospects/ProspectActivityFeed";
import { Note } from "@/hooks/useProspectNotes";

interface ProspectDetailContentProps {
  prospect: any;
  notes: Note[];
  appointments: any[];
  onStatusChange: (status: any) => void;
  onScheduleAppointment: () => void;
  onEdit: () => void;
  onAddNote: (note: string) => void;
}

const ProspectDetailContent: React.FC<ProspectDetailContentProps> = ({
  prospect,
  notes,
  appointments,
  onStatusChange,
  onScheduleAppointment,
  onEdit,
  onAddNote
}) => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || "info";
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <>
      <ProspectHeader 
        prospect={prospect}
        onStatusChange={onStatusChange}
        onScheduleAppointment={onScheduleAppointment}
        onEdit={onEdit}
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
                onAddNote={onAddNote}
              />
            </TabsContent>
            
            <TabsContent value="appointments" className="mt-6">
              <ProspectAppointmentsTab 
                appointments={appointments}
                onScheduleAppointment={onScheduleAppointment}
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
    </>
  );
};

export default ProspectDetailContent;
