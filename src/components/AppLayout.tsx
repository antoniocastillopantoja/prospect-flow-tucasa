
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import AIAgentButton from "@/components/ai-agent/AIAgentButton";
import { useAuth } from "@/contexts/AuthContext";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
        {/* AI Agent Button - Available on all pages */}
        <AIAgentButton />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
