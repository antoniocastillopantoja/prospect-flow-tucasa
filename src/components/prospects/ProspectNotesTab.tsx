
import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Note {
  id: number;
  date: string;
  time: string;
  text: string;
  author: string;
}

interface ProspectNotesTabProps {
  notes: Note[];
  onAddNote: (note: string) => void;
}

const ProspectNotesTab: React.FC<ProspectNotesTabProps> = ({ notes, onAddNote }) => {
  const [note, setNote] = useState("");
  const { toast } = useToast();

  const handleAddNote = () => {
    if (note.trim() !== "") {
      onAddNote(note);
      setNote("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Agregar Nota</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Escribe una nota sobre este prospecto..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-24"
          />
          <Button onClick={handleAddNote}>Guardar Nota</Button>
        </div>
        
        <div className="mt-8 space-y-4">
          <h3 className="font-medium">Historial de Notas</h3>
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="font-medium">{note.author}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {note.date} - {note.time}
                  </div>
                </div>
                <p className="mt-2">{note.text}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No hay notas registradas para este prospecto
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProspectNotesTab;
