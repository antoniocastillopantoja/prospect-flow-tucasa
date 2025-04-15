
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Note {
  id: number;
  date: string;
  time: string;
  text: string;
  author: string;
}

export function useProspectNotes(initialNotes: Note[] = []) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const { toast } = useToast();

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

      toast({
        title: "Nota añadida",
        description: "La nota ha sido añadida correctamente."
      });
    }
  };

  return {
    notes,
    handleAddNote,
    setNotes
  };
}
