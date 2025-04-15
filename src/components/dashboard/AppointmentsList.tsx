
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Phone, User } from "lucide-react";
import { toast } from "sonner";

interface Appointment {
  id: number;
  name: string;
  time: string;
  phone: string;
  location: string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({ appointments }) => {
  const handleCall = (phone: string, name: string) => {
    // Use the tel: protocol to initiate a phone call
    window.location.href = `tel:${phone}`;
    
    // Show a toast notification
    toast.success(`Llamando a ${name}`, {
      description: phone,
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Citas de Hoy</CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div 
                key={appointment.id}
                className="p-3 border rounded-lg hover:bg-gray-50 transition-colors flex justify-between items-center"
              >
                <div className="flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.name}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{appointment.time}</span>
                      <span className="mx-1">•</span>
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center"
                  onClick={() => handleCall(appointment.phone, appointment.name)}
                >
                  <Phone className="h-3 w-3 mr-1" />
                  Llamar
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No tienes citas programadas para hoy
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;
