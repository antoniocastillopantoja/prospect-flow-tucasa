
import { useCalendarPage } from "@/hooks/useCalendarPage";
import { useToast } from "@/hooks/use-toast";
import CalendarSidebar from "@/components/calendar/CalendarSidebar";
import AppointmentsList from "@/components/calendar/AppointmentsList";

const CalendarPage = () => {
  const { 
    date, 
    setDate, 
    appointments, 
    selectedDateAppointments, 
    getDateWithAppointments,
    handleGoToClient
  } = useCalendarPage();
  const { toast } = useToast();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Calendario</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CalendarSidebar
          date={date}
          onDateSelect={setDate}
          getDateWithAppointments={getDateWithAppointments}
          appointments={appointments}
        />
        
        <AppointmentsList
          date={date}
          appointments={selectedDateAppointments}
          onGoToClient={handleGoToClient}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
