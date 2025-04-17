
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useCalendarIntegration } from "@/hooks/useCalendarIntegration";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar,
  Facebook,
  Link,
  LoaderCircle,
  MessageSquare,
  Save,
  Smartphone,
  Check
} from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Integration schemas
const googleCalendarSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  calendarId: z.string().optional(),
});

const facebookLeadFormsSchema = z.object({
  accessToken: z.string().min(1, "Access token is required"),
  pageId: z.string().min(1, "Page ID is required"),
});

const whatsAppSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  apiKey: z.string().min(1, "API key is required"),
});

type GoogleCalendarFormValues = z.infer<typeof googleCalendarSchema>;
type FacebookLeadFormsFormValues = z.infer<typeof facebookLeadFormsSchema>;
type WhatsAppFormValues = z.infer<typeof whatsAppSchema>;

// The main integration types
interface IntegrationStates {
  googleCalendar: boolean;
  facebookLeadForms: boolean;
  whatsAppBusiness: boolean;
}

export const IntegrationsTab = () => {
  const { toast } = useToast();
  const { createGoogleCalendarEvent, isGoogleCalendarSyncing } = useCalendarIntegration();
  
  // States for each integration
  const [integrations, setIntegrations] = useState<IntegrationStates>(() => {
    const saved = localStorage.getItem("crmIntegrations");
    return saved ? JSON.parse(saved) : {
      googleCalendar: false,
      facebookLeadForms: false,
      whatsAppBusiness: false
    };
  });
  
  // Dialog states
  const [configDialogOpen, setConfigDialogOpen] = useState<{
    google: boolean;
    facebook: boolean;
    whatsapp: boolean;
  }>({
    google: false,
    facebook: false,
    whatsapp: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [configStatus, setConfigStatus] = useState<{
    google: 'idle' | 'success' | 'error';
    facebook: 'idle' | 'success' | 'error';
    whatsapp: 'idle' | 'success' | 'error';
  }>({
    google: 'idle',
    facebook: 'idle',
    whatsapp: 'idle'
  });
  
  // Forms
  const googleForm = useForm<GoogleCalendarFormValues>({
    resolver: zodResolver(googleCalendarSchema),
    defaultValues: {
      apiKey: localStorage.getItem("googleCalendarApiKey") || "",
      calendarId: localStorage.getItem("googleCalendarId") || "",
    }
  });

  const facebookForm = useForm<FacebookLeadFormsFormValues>({
    resolver: zodResolver(facebookLeadFormsSchema),
    defaultValues: {
      accessToken: localStorage.getItem("facebookAccessToken") || "",
      pageId: localStorage.getItem("facebookPageId") || "",
    }
  });

  const whatsAppForm = useForm<WhatsAppFormValues>({
    resolver: zodResolver(whatsAppSchema),
    defaultValues: {
      phoneNumber: localStorage.getItem("whatsAppPhoneNumber") || "",
      apiKey: localStorage.getItem("whatsAppApiKey") || "",
    }
  });
  
  // Toggle handlers
  const toggleGoogleCalendar = (checked: boolean) => {
    setIntegrations(prev => ({ ...prev, googleCalendar: checked }));
    
    if (checked && !localStorage.getItem("googleCalendarApiKey")) {
      setConfigDialogOpen(prev => ({ ...prev, google: true }));
    } else {
      saveIntegrationsToLocalStorage({ ...integrations, googleCalendar: checked });
      
      toast({
        title: checked ? "Google Calendar activado" : "Google Calendar desactivado",
        description: checked 
          ? "Ahora podrás sincronizar tus citas con Google Calendar." 
          : "Ya no se sincronizarán tus citas con Google Calendar.",
      });
    }
  };

  const toggleFacebookLeadForms = (checked: boolean) => {
    setIntegrations(prev => ({ ...prev, facebookLeadForms: checked }));
    
    if (checked && !localStorage.getItem("facebookAccessToken")) {
      setConfigDialogOpen(prev => ({ ...prev, facebook: true }));
    } else {
      saveIntegrationsToLocalStorage({ ...integrations, facebookLeadForms: checked });
      
      toast({
        title: checked ? "Facebook Lead Forms activado" : "Facebook Lead Forms desactivado",
        description: checked 
          ? "Ahora podrás importar leads automáticamente desde Facebook." 
          : "Ya no se importarán leads automáticamente desde Facebook.",
      });
    }
  };

  const toggleWhatsAppBusiness = (checked: boolean) => {
    setIntegrations(prev => ({ ...prev, whatsAppBusiness: checked }));
    
    if (checked && !localStorage.getItem("whatsAppApiKey")) {
      setConfigDialogOpen(prev => ({ ...prev, whatsapp: true }));
    } else {
      saveIntegrationsToLocalStorage({ ...integrations, whatsAppBusiness: checked });
      
      toast({
        title: checked ? "WhatsApp Business activado" : "WhatsApp Business desactivado",
        description: checked 
          ? "Ahora podrás enviar mensajes a prospectos vía WhatsApp." 
          : "Ya no podrás enviar mensajes a prospectos vía WhatsApp.",
      });
    }
  };
  
  // Save config handlers
  const saveGoogleCalendarConfig = async (data: GoogleCalendarFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to validate credentials
      await simulateApiCall("google");
      
      // Save credentials to localStorage (in production this should be secured)
      localStorage.setItem("googleCalendarApiKey", data.apiKey);
      if (data.calendarId) {
        localStorage.setItem("googleCalendarId", data.calendarId);
      }
      
      // Update integration status
      setIntegrations(prev => ({ ...prev, googleCalendar: true }));
      saveIntegrationsToLocalStorage({ ...integrations, googleCalendar: true });
      
      setConfigStatus(prev => ({ ...prev, google: 'success' }));
      
      toast({
        title: "Google Calendar conectado",
        description: "La integración con Google Calendar se ha configurado correctamente.",
      });
      
      setTimeout(() => {
        setConfigDialogOpen(prev => ({ ...prev, google: false }));
      }, 1500);
      
    } catch (error) {
      console.error("Error al configurar Google Calendar:", error);
      setConfigStatus(prev => ({ ...prev, google: 'error' }));
      
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con Google Calendar. Verifica tus credenciales.",
        variant: "destructive",
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  const saveFacebookLeadFormsConfig = async (data: FacebookLeadFormsFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to validate credentials
      await simulateApiCall("facebook");
      
      // Save credentials to localStorage (in production this should be secured)
      localStorage.setItem("facebookAccessToken", data.accessToken);
      localStorage.setItem("facebookPageId", data.pageId);
      
      // Update integration status
      setIntegrations(prev => ({ ...prev, facebookLeadForms: true }));
      saveIntegrationsToLocalStorage({ ...integrations, facebookLeadForms: true });
      
      setConfigStatus(prev => ({ ...prev, facebook: 'success' }));
      
      toast({
        title: "Facebook Lead Forms conectado",
        description: "La integración con Facebook Lead Forms se ha configurado correctamente.",
      });
      
      setTimeout(() => {
        setConfigDialogOpen(prev => ({ ...prev, facebook: false }));
      }, 1500);
      
    } catch (error) {
      console.error("Error al configurar Facebook Lead Forms:", error);
      setConfigStatus(prev => ({ ...prev, facebook: 'error' }));
      
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con Facebook Lead Forms. Verifica tus credenciales.",
        variant: "destructive",
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  const saveWhatsAppBusinessConfig = async (data: WhatsAppFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call to validate credentials
      await simulateApiCall("whatsapp");
      
      // Save credentials to localStorage (in production this should be secured)
      localStorage.setItem("whatsAppPhoneNumber", data.phoneNumber);
      localStorage.setItem("whatsAppApiKey", data.apiKey);
      
      // Update integration status
      setIntegrations(prev => ({ ...prev, whatsAppBusiness: true }));
      saveIntegrationsToLocalStorage({ ...integrations, whatsAppBusiness: true });
      
      setConfigStatus(prev => ({ ...prev, whatsapp: 'success' }));
      
      toast({
        title: "WhatsApp Business conectado",
        description: "La integración con WhatsApp Business se ha configurado correctamente.",
      });
      
      setTimeout(() => {
        setConfigDialogOpen(prev => ({ ...prev, whatsapp: false }));
      }, 1500);
      
    } catch (error) {
      console.error("Error al configurar WhatsApp Business:", error);
      setConfigStatus(prev => ({ ...prev, whatsapp: 'error' }));
      
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con WhatsApp Business. Verifica tus credenciales.",
        variant: "destructive",
      });
      
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper functions
  const saveIntegrationsToLocalStorage = (data: IntegrationStates) => {
    localStorage.setItem("crmIntegrations", JSON.stringify(data));
  };
  
  const simulateApiCall = (service: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate API validation with 80% success rate
      setTimeout(() => {
        const success = Math.random() > 0.2;
        if (success) {
          console.log(`${service} credentials validated successfully`);
          resolve();
        } else {
          console.error(`${service} validation failed`);
          reject(new Error("Validation failed"));
        }
      }, 1500);
    });
  };
  
  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate saving settings
    setTimeout(() => {
      saveIntegrationsToLocalStorage(integrations);
      
      toast({
        title: "Configuración guardada",
        description: "La configuración de integraciones se ha actualizado correctamente."
      });
      
      setIsLoading(false);
    }, 800);
  };
  
  const getConnectionStatus = (integration: keyof IntegrationStates): string => {
    // Check if the integration is active and credentials are stored
    if (integrations[integration]) {
      switch (integration) {
        case 'googleCalendar':
          return localStorage.getItem("googleCalendarApiKey") ? "Conectado" : "Pendiente";
        case 'facebookLeadForms':
          return localStorage.getItem("facebookAccessToken") ? "Conectado" : "Pendiente";
        case 'whatsAppBusiness':
          return localStorage.getItem("whatsAppApiKey") ? "Conectado" : "Pendiente";
        default:
          return "No conectado";
      }
    }
    return "No conectado";
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integraciones</CardTitle>
        <CardDescription>
          Conecta el CRM con otras herramientas y servicios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Google Calendar Integration */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                <h3 className="font-medium">Google Calendar</h3>
              </div>
              <p className="text-sm text-gray-500">
                Sincroniza citas con Google Calendar
              </p>
              {integrations.googleCalendar && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <Check className="h-3 w-3" /> {getConnectionStatus('googleCalendar')}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={integrations.googleCalendar}
                onCheckedChange={toggleGoogleCalendar}
              />
              {integrations.googleCalendar ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setConfigDialogOpen(prev => ({ ...prev, google: true }))}
                >
                  Configurar
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setConfigDialogOpen(prev => ({ ...prev, google: true }))}
                >
                  Conectar
                </Button>
              )}
            </div>
          </div>
          
          {/* Facebook Lead Forms Integration */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Facebook className="h-5 w-5 text-blue-700" />
                <h3 className="font-medium">Facebook Lead Forms</h3>
              </div>
              <p className="text-sm text-gray-500">
                Importa leads automáticamente desde Facebook
              </p>
              {integrations.facebookLeadForms && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <Check className="h-3 w-3" /> {getConnectionStatus('facebookLeadForms')}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={integrations.facebookLeadForms}
                onCheckedChange={toggleFacebookLeadForms}
              />
              {integrations.facebookLeadForms ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setConfigDialogOpen(prev => ({ ...prev, facebook: true }))}
                >
                  Configurar
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setConfigDialogOpen(prev => ({ ...prev, facebook: true }))}
                >
                  Conectar
                </Button>
              )}
            </div>
          </div>
          
          {/* WhatsApp Business Integration */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                <h3 className="font-medium">WhatsApp Business</h3>
              </div>
              <p className="text-sm text-gray-500">
                Envía mensajes a prospectos vía WhatsApp
              </p>
              {integrations.whatsAppBusiness && (
                <span className="text-xs text-green-600 flex items-center gap-1">
                  <Check className="h-3 w-3" /> {getConnectionStatus('whatsAppBusiness')}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Switch 
                checked={integrations.whatsAppBusiness}
                onCheckedChange={toggleWhatsAppBusiness}
              />
              {integrations.whatsAppBusiness ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setConfigDialogOpen(prev => ({ ...prev, whatsapp: true }))}
                >
                  Configurar
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setConfigDialogOpen(prev => ({ ...prev, whatsapp: true }))}
                >
                  Conectar
                </Button>
              )}
            </div>
          </div>
          
          <Button 
            onClick={handleSaveSettings} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Guardar Configuración
              </>
            )}
          </Button>
        </div>
      </CardContent>

      {/* Google Calendar Configuration Dialog */}
      <Dialog open={configDialogOpen.google} onOpenChange={(open) => setConfigDialogOpen(prev => ({ ...prev, google: open }))}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              Configurar Google Calendar
            </DialogTitle>
            <DialogDescription>
              Ingresa tus credenciales de la API de Google Calendar para sincronizar tus citas.
            </DialogDescription>
          </DialogHeader>
          
          {configStatus.google === 'success' ? (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 font-medium">¡Conexión exitosa!</h3>
              <p className="text-sm text-gray-500 mt-2">
                Tu cuenta de Google Calendar ha sido conectada correctamente.
              </p>
            </div>
          ) : (
            <Form {...googleForm}>
              <form onSubmit={googleForm.handleSubmit(saveGoogleCalendarConfig)} className="space-y-4">
                <FormField
                  control={googleForm.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresa tu API Key de Google" {...field} />
                      </FormControl>
                      <FormDescription>
                        Obtén tu API Key desde la Google Cloud Console.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={googleForm.control}
                  name="calendarId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID del Calendario (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="ejemplo@gmail.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Conectando...
                      </div>
                    ) : (
                      'Conectar'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Facebook Lead Forms Configuration Dialog */}
      <Dialog open={configDialogOpen.facebook} onOpenChange={(open) => setConfigDialogOpen(prev => ({ ...prev, facebook: open }))}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Facebook className="h-5 w-5 text-blue-700" />
              Configurar Facebook Lead Forms
            </DialogTitle>
            <DialogDescription>
              Conecta tu página de Facebook para importar automáticamente los leads generados.
            </DialogDescription>
          </DialogHeader>
          
          {configStatus.facebook === 'success' ? (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 font-medium">¡Conexión exitosa!</h3>
              <p className="text-sm text-gray-500 mt-2">
                Tu página de Facebook ha sido conectada correctamente.
              </p>
            </div>
          ) : (
            <Form {...facebookForm}>
              <form onSubmit={facebookForm.handleSubmit(saveFacebookLeadFormsConfig)} className="space-y-4">
                <FormField
                  control={facebookForm.control}
                  name="accessToken"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Access Token</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresa tu Access Token de Facebook" {...field} />
                      </FormControl>
                      <FormDescription>
                        Genera un token desde Facebook for Developers.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={facebookForm.control}
                  name="pageId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID de Página</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: 123456789" {...field} />
                      </FormControl>
                      <FormDescription>
                        El ID numérico de tu página de Facebook.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Conectando...
                      </div>
                    ) : (
                      'Conectar'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
      
      {/* WhatsApp Business Configuration Dialog */}
      <Dialog open={configDialogOpen.whatsapp} onOpenChange={(open) => setConfigDialogOpen(prev => ({ ...prev, whatsapp: open }))}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              Configurar WhatsApp Business
            </DialogTitle>
            <DialogDescription>
              Configura la API de WhatsApp Business para enviar mensajes automáticos a tus prospectos.
            </DialogDescription>
          </DialogHeader>
          
          {configStatus.whatsapp === 'success' ? (
            <div className="py-6 flex flex-col items-center justify-center text-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 font-medium">¡Conexión exitosa!</h3>
              <p className="text-sm text-gray-500 mt-2">
                Tu cuenta de WhatsApp Business ha sido conectada correctamente.
              </p>
            </div>
          ) : (
            <Form {...whatsAppForm}>
              <form onSubmit={whatsAppForm.handleSubmit(saveWhatsAppBusinessConfig)} className="space-y-4">
                <FormField
                  control={whatsAppForm.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="+52 1234567890" {...field} />
                      </FormControl>
                      <FormDescription>
                        El número de teléfono asociado a tu cuenta de WhatsApp Business.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={whatsAppForm.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="Ingresa tu API Key" {...field} />
                      </FormControl>
                      <FormDescription>
                        Obtén tu API Key desde la plataforma de WhatsApp Business.
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Conectando...
                      </div>
                    ) : (
                      'Conectar'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

