
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarCheck } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Appointment } from "@/hooks/useCalendarPage";

interface CalendarSidebarProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  getDateWithAppointments: (date: Date) => boolean;
  appointments: Appointment[];
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  date,
  onDateSelect,
  getDateWithAppointments,
  appointments
}) => {
  return (
    <Card className="col-span-1">
      <CardContent className="p-4">
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={onDateSelect}
          className="rounded-md border"
          modifiers={{
            hasAppointment: (date) => getDateWithAppointments(date)
          }}
          modifiersStyles={{
            hasAppointment: { 
              backgroundColor: "#e2f1fe", 
              fontWeight: "bold",
              color: "#1e40af",
              position: "relative"
            }
          }}
          modifiersClassNames={{
            hasAppointment: "relative has-appointment"
          }}
          components={{
            DayContent: (props) => {
              const hasAppointment = getDateWithAppointments(props.date);
              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  {props.date.getDate()}
                  {hasAppointment && (
                    <CalendarCheck 
                      className="absolute bottom-0 right-0 h-3 w-3 text-blue-600" 
                      aria-label="Día con citas"
                    />
                  )}
                </div>
              );
            }
          }}
          locale={es}
        />
        
        <div className="mt-4 space-y-1">
          <p className="text-sm text-gray-500">Leyenda:</p>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#e2f1fe] rounded-sm mr-2 relative">
              <CalendarCheck className="absolute -bottom-1 -right-1 h-3 w-3 text-blue-600" />
            </div>
            <span className="text-sm">Día con citas</span>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">Vista Rápida de la Semana</p>
          <div className="space-y-2">
            {Array.from(Array(7).keys()).map((dayOffset) => {
              const dayDate = new Date();
              dayDate.setDate(dayDate.getDate() + dayOffset);
              
              const dayAppointments = appointments.filter(
                app => 
                  app.date.getDate() === dayDate.getDate() &&
                  app.date.getMonth() === dayDate.getMonth() &&
                  app.date.getFullYear() === dayDate.getFullYear()
              );
              
              const dayStr = format(dayDate, 'EEEE, d MMM', { locale: es });
              
              return (
                <div 
                  key={dayOffset}
                  className={`flex justify-between items-center text-sm p-2 hover:bg-gray-50 rounded-md cursor-pointer ${
                    date && 
                    date.getDate() === dayDate.getDate() && 
                    date.getMonth() === dayDate.getMonth() && 
                    date.getFullYear() === dayDate.getFullYear() 
                      ? 'bg-blue-50 border border-blue-200' 
                      : ''
                  }`}
                  onClick={() => {
                    // Only select the date if there's at least one appointment
                    if (dayAppointments.length > 0) {
                      onDateSelect(new Date(dayDate));
                    }
                  }}
                >
                  <span className="flex items-center gap-1">
                    {dayStr}
                    {dayAppointments.length > 0 && (
                      <CalendarCheck className="h-4 w-4 text-blue-600" />
                    )}
                  </span>
                  <span 
                    className={`px-2 py-1 ${
                      dayAppointments.length > 0 
                        ? 'bg-blue-100 text-blue-800 cursor-pointer' 
                        : 'bg-gray-100 text-gray-800'
                    } rounded-full text-xs`}
                    onClick={(e) => {
                      // Prevent the parent onClick from firing
                      if (dayAppointments.length > 0) {
                        e.stopPropagation();
                        onDateSelect(new Date(dayDate));
                      }
                    }}
                  >
                    {dayAppointments.length} {dayAppointments.length === 1 ? 'cita' : 'citas'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarSidebar;
