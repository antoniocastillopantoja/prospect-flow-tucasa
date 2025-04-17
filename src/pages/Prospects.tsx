
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useProspects } from "@/hooks/useProspects";
import ProspectSearchBar from "@/components/prospects/ProspectSearchBar";
import ProspectFilters from "@/components/prospects/ProspectFilters";
import ProspectList from "@/components/prospects/ProspectList";
import { useSearchContext } from "@/contexts/SearchContext";

const Prospects = () => {
  const { prospects, loading, updateProspectStatus } = useProspects();
  const { searchQuery } = useSearchContext();
  const location = useLocation();
  
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [agentFilter, setAgentFilter] = useState("all");

  // Sync the local search with the global search context
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);
  
  // Apply filter if provided in navigation state
  useEffect(() => {
    if (location.state && location.state.filter) {
      setStatusFilter(location.state.filter);
    }
  }, [location.state]);
  
  const filteredProspects = prospects.filter((prospect) => {
    const matchesSearch = localSearchQuery === "" || 
      prospect.name.toLowerCase().includes(localSearchQuery.toLowerCase()) || 
      prospect.location.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      prospect.phone.includes(localSearchQuery);
      
    const matchesStatus = statusFilter === "" || statusFilter === "all" || prospect.status === statusFilter;
    const matchesSector = sectorFilter === "" || sectorFilter === "all" || prospect.sector === sectorFilter;
    const matchesAgent = agentFilter === "all" || prospect.agent === agentFilter;
    
    return matchesSearch && matchesStatus && matchesSector && matchesAgent;
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
              searchQuery={localSearchQuery}
              setSearchQuery={setLocalSearchQuery}
            />
            
            <ProspectFilters
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sectorFilter={sectorFilter}
              setSectorFilter={setSectorFilter}
              agentFilter={agentFilter}
              setAgentFilter={setAgentFilter}
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
