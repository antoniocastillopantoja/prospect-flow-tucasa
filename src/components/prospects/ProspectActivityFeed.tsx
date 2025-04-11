
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Prospect } from "@/models/Prospect";

interface Note {
  id: number;
  date: string;
  time: string;
  text: string;
  author: string;
}

interface Appointment {
  id: number;
  date: string;
  time: string;
  location: string;
  status: string;
}

interface ProspectActivityFeedProps {
  prospect: Prospect;
  notes: Note[];
  appointments: Appointment[];
}

const ProspectActivityFeed: React.FC<ProspectActivityFeedProps> = ({ 
  prospect, 
  notes, 
  appointments 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-l-2 border-blue-500 pl-3 py-1">
            <p className="text-sm font-medium">Cambio de estado</p>
            <p className="text-xs text-gray-500">09/04/2025 - 10:30 AM</p>
            <p className="mt-1 text-sm">
              Estado actualizado a <span className="font-medium">{prospect.status === "contacted" ? "Contactado" : "Nuevo"}</span>
            </p>
          </div>
          
          {notes.length > 0 && (
            <div className="border-l-2 border-green-500 pl-3 py-1">
              <p className="text-sm font-medium">Nota añadida</p>
              <p className="text-xs text-gray-500">{notes[0].date} - {notes[0].time}</p>
              <p className="mt-1 text-sm">
                {notes[0].author} añadió una nueva nota
              </p>
            </div>
          )}
          
          {appointments.length > 0 && (
            <div className="border-l-2 border-purple-500 pl-3 py-1">
              <p className="text-sm font-medium">Cita agendada</p>
              <p className="text-xs text-gray-500">08/04/2025 - 3:45 PM</p>
              <p className="mt-1 text-sm">
                Cita programada para el {appointments[0].date}
              </p>
            </div>
          )}
          
          <div className="border-l-2 border-orange-500 pl-3 py-1">
            <p className="text-sm font-medium">Contacto inicial</p>
            <p className="text-xs text-gray-500">{prospect.contactDate} - 3:30 PM</p>
            <p className="mt-1 text-sm">
              Prospecto registrado por {prospect.agent}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProspectActivityFeed;
