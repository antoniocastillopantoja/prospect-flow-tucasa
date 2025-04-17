
import { Appointment } from "@/hooks/useCalendarPage";

export type SortOption = "time" | "client" | "type" | "location";
export type SortDirection = "asc" | "desc";

export const sortAppointments = (
  appointments: Appointment[],
  sortBy: SortOption,
  sortDirection: SortDirection
): Appointment[] => {
  return [...appointments].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "time":
        comparison = a.time.localeCompare(b.time);
        break;
      case "client":
        comparison = a.client.localeCompare(b.client);
        break;
      case "type":
        comparison = a.type.localeCompare(b.type);
        break;
      case "location":
        comparison = a.location.localeCompare(b.location);
        break;
      default:
        comparison = 0;
    }

    return sortDirection === "asc" ? comparison : -comparison;
  });
};

export const filterAppointmentsByType = (
  appointments: Appointment[],
  typeFilter: string | null
): Appointment[] => {
  if (!typeFilter) return appointments;
  return appointments.filter(appointment => appointment.type === typeFilter);
};

export const filterAppointmentsBySearch = (
  appointments: Appointment[],
  searchTerm: string
): Appointment[] => {
  if (!searchTerm.trim()) return appointments;
  
  const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
  return appointments.filter(appointment => 
    appointment.title.toLowerCase().includes(lowerCaseSearchTerm) ||
    appointment.client.toLowerCase().includes(lowerCaseSearchTerm) ||
    appointment.location.toLowerCase().includes(lowerCaseSearchTerm)
  );
};

export const getUniqueAppointmentTypes = (appointments: Appointment[]): string[] => {
  return Array.from(new Set(appointments.map(appointment => appointment.type)));
};
