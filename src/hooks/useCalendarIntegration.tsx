
import { useState } from "react";

interface GoogleCalendarEventDetails {
  summary: string;
  location: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

export function useCalendarIntegration() {
  const [isGoogleCalendarSyncing, setIsGoogleCalendarSyncing] = useState(false);
  
  // Utility function to add one hour to a time string in format "HH:MM"
  const addOneHour = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    date.setHours(date.getHours() + 1);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // Create Google Calendar event
  const createGoogleCalendarEvent = async (eventData: {
    title: string;
    location: string;
    description: string;
    date: Date;
    time: string;
    type: string;
  }): Promise<string> => {
    setIsGoogleCalendarSyncing(true);
    
    try {
      // Prepare event details for Google Calendar API
      const eventDetails: GoogleCalendarEventDetails = {
        summary: `Cita: ${eventData.type} - ${eventData.title}`,
        location: eventData.location,
        description: eventData.description || "Cita programada desde el CRM",
        start: {
          dateTime: `${eventData.date.toISOString().split('T')[0]}T${eventData.time}:00`,
          timeZone: 'America/Mexico_City',
        },
        end: {
          dateTime: `${eventData.date.toISOString().split('T')[0]}T${addOneHour(eventData.time)}:00`,
          timeZone: 'America/Mexico_City',
        }
      };
      
      // Simulate Google Calendar API call (in real implementation, this would be an actual API call)
      const eventId = await simulateGoogleCalendarAPI(eventDetails);
      return eventId;
    } finally {
      setIsGoogleCalendarSyncing(false);
    }
  };

  // Simulate Google Calendar API response
  const simulateGoogleCalendarAPI = async (eventDetails: GoogleCalendarEventDetails): Promise<string> => {
    return new Promise<string>((resolve) => {
      // Log the event details to simulate what would be sent to Google Calendar
      console.log("Creating Google Calendar event:", eventDetails);
      
      // Simulate API delay
      setTimeout(() => {
        // Generate a mock Google Calendar event ID
        const eventId = `gc-event-${Math.random().toString(36).substring(2, 11)}`;
        console.log("Google Calendar event created with ID:", eventId);
        resolve(eventId);
      }, 800);
    });
  };

  return {
    isGoogleCalendarSyncing,
    createGoogleCalendarEvent
  };
}
