
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Plus, Search } from "lucide-react";
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
import { useProspects } from "@/hooks/useProspects";
import ProspectCard from "@/components/ProspectCard";
import { sectors } from "@/models/Prospect";

const Prospects = () => {
  const navigate = useNavigate();
  const { prospects, loading, updateProspectStatus } = useProspects();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  
  const handleNewProspect = () => {
    navigate("/prospectos/nuevo");
  };

  const filteredProspects = prospects.filter((prospect) => {
    const matchesSearch = searchQuery === "" || 
      prospect.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      prospect.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prospect.phone.includes(searchQuery);
      
    const matchesStatus = statusFilter === "" || prospect.status === statusFilter;
    const matchesSector = sectorFilter === "" || prospect.sector === sectorFilter;
    
    return matchesSearch && matchesStatus && matchesSector;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Prospectos</h1>
        <Button onClick={handleNewProspect}>
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
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Lista de prospectos en formato de tarjetas */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="h-64 animate-pulse">
              <CardContent className="p-4">
                <div className="w-1/2 h-4 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2">
                  <div className="w-full h-3 bg-gray-200 rounded"></div>
                  <div className="w-full h-3 bg-gray-200 rounded"></div>
                  <div className="w-2/3 h-3 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProspects.length > 0 ? (
            filteredProspects.map((prospect) => (
              <ProspectCard 
                key={prospect.id} 
                prospect={prospect}
                onStatusChange={updateProspectStatus}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No se encontraron prospectos con los filtros seleccionados
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Prospects;
