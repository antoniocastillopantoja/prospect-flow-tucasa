
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useProspects } from "@/hooks/useProspects";
import ProspectSearchBar from "@/components/prospects/ProspectSearchBar";
import ProspectFilters from "@/components/prospects/ProspectFilters";
import ProspectList from "@/components/prospects/ProspectList";

const Prospects = () => {
  const { prospects, loading, updateProspectStatus } = useProspects();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");

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
      <div className="flex justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Prospectos</h1>
      </div>
      
      {/* Filtros y búsqueda */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <ProspectSearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            <ProspectFilters
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sectorFilter={sectorFilter}
              setSectorFilter={setSectorFilter}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Lista de prospectos */}
      <ProspectList
        prospects={filteredProspects}
        loading={loading}
        onStatusChange={updateProspectStatus}
      />
    </div>
  );
};

export default Prospects;

