
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, MapPin, Clock, User, Search, SortAsc, SortDesc, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Appointment } from "@/hooks/useCalendarPage";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  sortAppointments,
  filterAppointmentsByType,
  filterAppointmentsBySearch,
  getUniqueAppointmentTypes,
  SortOption,
  SortDirection
} from "@/utils/appointmentUtils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AppointmentsListProps {
  date: Date | undefined;
  appointments: Appointment[];
  onGoToClient: (clientId: string) => void;
  onCompleteAppointment?: (id: number) => void;
  onCancelAppointment?: (id: number) => void;
}

const AppointmentsList: React.FC<AppointmentsListProps> = ({
  date,
  appointments,
  onGoToClient,
  onCompleteAppointment,
  onCancelAppointment
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("time");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(appointments);
  const uniqueTypes = getUniqueAppointmentTypes(appointments);
  
  // Estado para el diálogo de confirmación de cancelación
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);
  
  useEffect(() => {
    let result = [...appointments];
    
    // Apply type filter
    result = filterAppointmentsByType(result, typeFilter);
    
    // Apply search filter
    result = filterAppointmentsBySearch(result, searchTerm);
    
    // Apply sorting
    result = sortAppointments(result, sortBy, sortDirection);
    
    setFilteredAppointments(result);
  }, [appointments, searchTerm, typeFilter, sortBy, sortDirection]);
  
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  };
  
  const handleSortChange = (option: SortOption) => {
    if (sortBy === option) {
      toggleSortDirection();
    } else {
      setSortBy(option);
      setSortDirection("asc");
    }
  };

  // Manejadores para los botones de completar y cancelar
  const handleComplete = (id: number) => {
    if (onCompleteAppointment) {
      onCompleteAppointment(id);
    }
  };

  const handleCancelClick = (id: number) => {
    setAppointmentToCancel(id);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = () => {
    if (appointmentToCancel !== null && onCancelAppointment) {
      onCancelAppointment(appointmentToCancel);
      setAppointmentToCancel(null);
    }
    setCancelDialogOpen(false);
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium">
            Citas para {date ? format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: es }) : "el día seleccionado"}
          </h2>
          <Button variant="outline" size="sm">
            <CalendarIcon className="h-4 w-4 mr-2" /> 
            Sincronizar con Google
          </Button>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-4 space-y-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-8"
                placeholder="Buscar citas..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select
              value={typeFilter || ""}
              onValueChange={(value) => setTypeFilter(value === "all" ? null : value)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  {sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                  Ordenar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleSortChange("time")}>
                  Por hora {sortBy === "time" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("client")}>
                  Por cliente {sortBy === "client" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("type")}>
                  Por tipo {sortBy === "type" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSortChange("location")}>
                  Por ubicación {sortBy === "location" && (sortDirection === "asc" ? "↑" : "↓")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div 
                key={appointment.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{appointment.title}</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-2 text-gray-500 shrink-0" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500 shrink-0" />
                        <span>{appointment.location}</span>
                      </div>
                      {appointment.clientId && (
                        <div 
                          className="flex items-center text-sm text-blue-600 cursor-pointer hover:text-blue-800"
                          onClick={() => onGoToClient(appointment.clientId)}
                        >
                          <User className="h-4 w-4 mr-2 shrink-0" />
                          <span className="underline">{appointment.client}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {appointment.status === "scheduled" ? (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => handleComplete(appointment.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Completada
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => handleCancelClick(appointment.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        appointment.status === "completed" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {appointment.status === "completed" ? "Completada" : "Cancelada"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            {searchTerm || typeFilter 
              ? "No se encontraron citas que coincidan con los filtros actuales" 
              : "No hay citas programadas para este día"}
          </div>
        )}
      </CardContent>

      {/* Diálogo de confirmación para cancelar cita */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción cancelará la cita y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Volver</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmCancel} className="bg-red-600 hover:bg-red-700">
              Confirmar cancelación
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default AppointmentsList;
