
import MetricsCards from "@/components/dashboard/MetricsCards";
import AppointmentsList from "@/components/dashboard/AppointmentsList";
import RecentProspects from "@/components/dashboard/RecentProspects";
import { useSearchContext } from "@/contexts/SearchContext";
import { useProspects } from "@/hooks/useProspects";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { searchQuery } = useSearchContext();
  const { prospects, loading } = useProspects();
  const [metrics, setMetrics] = useState({
    nuevos: 0,
    contactados: 0,
    citas: 0,
    cerrados: 0
  });
  
  // Calculate metrics based on prospect data
  useEffect(() => {
    if (prospects.length > 0) {
      const newMetrics = {
        nuevos: prospects.filter(p => p.status === "new").length,
        contactados: prospects.filter(p => p.status === "contacted").length,
        citas: prospects.filter(p => p.status === "appointment").length,
        cerrados: prospects.filter(p => p.status === "closed").length
      };
      setMetrics(newMetrics);
    }
  }, [prospects]);
  
  const appointments = [
    { 
      id: 1, 
      name: "María Gómez", 
      time: "10:00 AM", 
      phone: "555-123-4567", 
      location: "Col. Roma Norte"
    },
    { 
      id: 2, 
      name: "Roberto Sánchez", 
      time: "3:00 PM", 
      phone: "555-987-6543", 
      location: "Col. Condesa"
    },
    { 
      id: 3, 
      name: "Laura Martínez", 
      time: "5:30 PM", 
      phone: "555-345-6789", 
      location: "Col. Polanco"
    }
  ];
  
  // Filter data based on search query
  const filteredAppointments = appointments.filter(appointment => 
    searchQuery.trim() === "" || 
    appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    appointment.phone.includes(searchQuery)
  );
  
  const filteredProspects = prospects.filter(prospect => 
    searchQuery.trim() === "" || 
    prospect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prospect.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prospect.phone.includes(searchQuery) ||
    (prospect.priceRange && prospect.priceRange.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel de Control</h1>
      </div>
      
      {/* Metrics Cards */}
      <MetricsCards metrics={metrics} loading={loading} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <AppointmentsList appointments={filteredAppointments} />
        
        {/* Recent Prospects */}
        <RecentProspects allProspects={filteredProspects} />
      </div>
    </div>
  );
};

export default Dashboard;
