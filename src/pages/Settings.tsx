
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersTab } from "@/components/settings/UsersTab";
import { NotificationsTab } from "@/components/settings/NotificationsTab";
import { IntegrationsTab } from "@/components/settings/IntegrationsTab";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("usuarios");
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Configuración</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="integraciones">Integraciones</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usuarios">
          <UsersTab />
        </TabsContent>
        
        <TabsContent value="notificaciones">
          <NotificationsTab />
        </TabsContent>
        
        <TabsContent value="integraciones">
          <IntegrationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
