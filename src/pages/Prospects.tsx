
import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Calendar,
  Filter,
  Home,
  MapPin,
  Phone,
  Plus,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tipos de datos para los prospectos
interface Prospect {
  id: number;
  name: string;
  phone: string;
  location: string;
  sector: string;
  priceRange: string;
  creditType: string;
  contactDate: string;
  agent: string;
  status: string;
}

const Prospects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [sortField, setSortField] = useState("contactDate");
  const [sortDirection, setSortDirection] = useState("desc");
  
  // Datos de ejemplo
  const prospects: Prospect[] = [
    {
      id: 1,
      name: "Carlos Vega",
      phone: "555-111-2222",
      location: "Col. Del Valle",
      sector: "Sur",
      priceRange: "$2M - $3M",
      creditType: "Bancario",
      contactDate: "2025-04-09",
      agent: "Ana Rodríguez",
      status: "new"
    },
    {
      id: 2,
      name: "María López",
      phone: "555-333-4444",
      location: "Col. Condesa",
      sector: "Centro",
      priceRange: "$3M - $4M",
      creditType: "Infonavit",
      contactDate: "2025-04-08",
      agent: "Juan Pérez",
      status: "contacted"
    },
    {
      id: 3,
      name: "Roberto Sánchez",
      phone: "555-555-6666",
      location: "Col. Polanco",
      sector: "Norte",
      priceRange: "$5M - $7M",
      creditType: "Contado",
      contactDate: "2025-04-07",
      agent: "Ana Rodríguez",
      status: "appointment"
    },
    {
      id: 4,
      name: "Laura Martínez",
      phone: "555-777-8888",
      location: "Col. Roma Norte",
      sector: "Centro",
      priceRange: "$2.5M - $3.5M",
      creditType: "Fovissste",
      contactDate: "2025-04-06",
      agent: "Pedro Ramírez",
      status: "closed"
    },
    {
      id: 5,
      name: "Javier Luna",
      phone: "555-999-0000",
      location: "Col. Narvarte",
      sector: "Sur",
      priceRange: "$1.8M - $2.5M",
      creditType: "Bancario",
      contactDate: "2025-04-05",
      agent: "Juan Pérez",
      status: "canceled"
    },
    {
      id: 6,
      name: "Ana Torres",
      phone: "555-222-3333",
      location: "Col. Escandón",
      sector: "Centro",
      priceRange: "$3M - $4.5M",
      creditType: "Infonavit",
      contactDate: "2025-04-04",
      agent: "Pedro Ramírez",
      status: "contacted"
    }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "new": return "status-new";
      case "contacted": return "status-contacted";
      case "appointment": return "status-appointment";
      case "canceled": return "status-canceled";
      case "closed": return "status-closed";
      default: return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "new": return "Nuevo";
      case "contacted": return "Contactado";
      case "appointment": return "Cita Agendada";
      case "canceled": return "Cita Cancelada";
      case "closed": return "Cliente Cerrado";
      default: return status;
    }
  };

  const filteredProspects = prospects
    .filter((prospect) => {
      const matchesSearch = searchQuery === "" || 
        prospect.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        prospect.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prospect.phone.includes(searchQuery);
        
      const matchesStatus = statusFilter === "" || prospect.status === statusFilter;
      const matchesSector = sectorFilter === "" || prospect.sector === sectorFilter;
      
      return matchesSearch && matchesStatus && matchesSector;
    })
    .sort((a, b) => {
      const fieldA = a[sortField as keyof Prospect];
      const fieldB = b[sortField as keyof Prospect];
      
      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Prospectos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Prospecto
        </Button>
      </div>
      
      {/* Filtros y búsqueda */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Buscar por nombre, ubicación o teléfono..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Filtrar:</span>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="new">Nuevo</SelectItem>
                  <SelectItem value="contacted">Contactado</SelectItem>
                  <SelectItem value="appointment">Cita Agendada</SelectItem>
                  <SelectItem value="canceled">Cita Cancelada</SelectItem>
                  <SelectItem value="closed">Cliente Cerrado</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="Norte">Norte</SelectItem>
                  <SelectItem value="Sur">Sur</SelectItem>
                  <SelectItem value="Centro">Centro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Lista de prospectos en formato de tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProspects.length > 0 ? (
          filteredProspects.map((prospect) => (
            <Card 
              key={prospect.id} 
              className="prospect-card-hover cursor-pointer transition-all"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium">{prospect.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone className="h-3 w-3 mr-1" />
                      <span>{prospect.phone}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(prospect.status)}`}>
                    {getStatusText(prospect.status)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{prospect.sector} - {prospect.location}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Home className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{prospect.priceRange} • {prospect.creditType}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{new Date(prospect.contactDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <User className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{prospect.agent}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3 pt-3 border-t">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Phone className="h-3 w-3 mr-1" /> Llamar
                  </Button>
                  <Button size="sm" variant="default" className="flex-1">
                    <Calendar className="h-3 w-3 mr-1" /> Agendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            No se encontraron prospectos con los filtros seleccionados
          </div>
        )}
      </div>
    </div>
  );
};

export default Prospects;
