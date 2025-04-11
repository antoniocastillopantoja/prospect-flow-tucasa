
import { 
  Home, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppSidebar() {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Users, label: "Prospectos", path: "/prospectos" },
    { icon: Calendar, label: "Calendario", path: "/calendario" },
    { icon: BarChart3, label: "Reportes", path: "/reportes" },
    { icon: Settings, label: "Configuración", path: "/configuracion" },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center">
            <img 
              src="/lovable-uploads/b569cc80-e658-4bff-950f-e93c7fbbcfb5.png" 
              alt="Tu Casa Ideal Logo" 
              className="h-12 object-contain"
            />
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4 p-2 rounded-md hover:bg-sidebar-accent/50 cursor-pointer">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Juan Pérez</p>
                <p className="text-xs text-muted-foreground">Gerente</p>
              </div>
            </div>
          </div>
          <div className="flex items-center p-2 hover:bg-sidebar-accent/50 rounded-md cursor-pointer">
            <LogOut size={20} className="mr-2" />
            <span>Cerrar Sesión</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
