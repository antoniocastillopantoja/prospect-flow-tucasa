
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AIAgentChat } from "./AIAgentChat";

const AIAgentButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón flotante */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
          size="icon"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Ventana de chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40">
          <AIAgentChat onClose={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default AIAgentButton;
