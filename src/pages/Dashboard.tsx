
import { useState } from "react";
import MetricsCards from "@/components/dashboard/MetricsCards";
import AppointmentsList from "@/components/dashboard/AppointmentsList";
import RecentProspects from "@/components/dashboard/RecentProspects";

const Dashboard = () => {
  // Mock data
  const metrics = {
    nuevos: 8,
    contactados: 15,
    citas: 5,
    cerrados: 3
  };
  
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
  
  // Full prospect data with dates
  const allProspects = [
    { 
      id: 1, 
      name: "Carlos Vega", 
      phone: "555-111-2222", 
      location: "Col. Del Valle", 
      priceRange: "$2M - $3M",
      status: "new",
      createdAt: new Date() // Today
    },
    { 
      id: 2, 
      name: "Ana Torres", 
      phone: "555-333-4444", 
      location: "Col. Narvarte", 
      priceRange: "$1.5M - $2.5M",
      status: "contacted",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    { 
      id: 3, 
      name: "Javier Luna", 
      phone: "555-555-6666", 
      location: "Col. Escandón", 
      priceRange: "$3M - $4M",
      status: "appointment",
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000) // 8 days ago
    },
    { 
      id: 4, 
      name: "Sofía García", 
      phone: "555-777-8888", 
      location: "Col. Juárez", 
      priceRange: "$2.5M - $3.5M",
      status: "closed",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000) // 20 days ago
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Panel de Control</h1>
      </div>
      
      {/* Metrics Cards */}
      <MetricsCards metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <AppointmentsList appointments={appointments} />
        
        {/* Recent Prospects */}
        <RecentProspects allProspects={allProspects} />
      </div>
    </div>
  );
};

export default Dashboard;
