
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface IntegrationConfig {
  googleCalendar: boolean;
  facebookLeadForms: boolean;
  whatsAppBusiness: boolean;
}

export type IntegrationType = 'googleCalendar' | 'facebookLeadForms' | 'whatsAppBusiness';

export interface GoogleCalendarConfig {
  apiKey: string;
  calendarId?: string;
}

export interface FacebookLeadFormsConfig {
  accessToken: string;
  pageId: string;
}

export interface WhatsAppConfig {
  phoneNumber: string;
  apiKey: string;
}

