
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
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/9cd54036-11d1-4009-85e7-62990da8b2c2.png" 
            alt="Tucasaideal Logo" 
            className="h-10 w-auto mr-2"
          />
          <h1 className="text-lg font-bold text-white">CRM</h1>
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
                        isActive ? "bg-sidebar-accent text-white" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
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
                <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-sidebar-foreground">Juan Pérez</p>
                <p className="text-xs text-sidebar-foreground/80">Gerente</p>
              </div>
            </div>
          </div>
          <div className="flex items-center p-2 text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-md cursor-pointer">
            <LogOut size={20} className="mr-2" />
            <span>Cerrar Sesión</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
