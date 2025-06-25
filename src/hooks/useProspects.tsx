import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Prospect, ProspectStatus } from "@/models/Prospect";
import { supabase } from "@/lib/supabaseClient";

// Utilidad para obtener los catálogos relacionados
async function getCatalogMap(table: string) {
  const { data, error } = await supabase.from(table).select('*');
  if (error || !data) return {};
  // Asume que los catálogos tienen id y name
  const map: Record<number, string> = {};
  data.forEach((item: any) => { map[item.id] = item.name; });
  return map;
}

export const useProspects = () => {
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Cargar prospectos desde Supabase
  useEffect(() => {
    const fetchProspects = async () => {
      setLoading(true);
      // Obtener catálogos
      const [statusMap, sectorMap, sourceMap] = await Promise.all([
        getCatalogMap('prospect_status'),
        getCatalogMap('property_sectors'),
        getCatalogMap('sources')
      ]);
      // Obtener usuarios para mapear agente
      const { data: usersData } = await supabase.from('users').select('id, full_name');
      const userMap: Record<string, string> = {};
      (usersData || []).forEach((u: any) => { userMap[u.id] = u.full_name; });
      // Traer prospectos
      const { data, error } = await supabase.from('prospects').select('*').order('id', { ascending: true });
      if (error) {
        toast({ title: 'Error al cargar prospectos', description: error.message, variant: 'destructive' });
      } else {
        // Mapear los campos al modelo del frontend
        const mapped = (data || []).map((p: any) => ({
          id: p.id,
          name: p.full_name,
          phone: p.phone,
          email: p.email,
          location: '-', // No hay campo location en la tabla
          sector: sectorMap[p.sector_id] || '',
          priceRange: '', // No hay campo priceRange
          creditType: '', // No hay campo creditType
          contactDate: p.created_at,
          agent: userMap[p.assigned_user_id] || '',
          source: sourceMap[p.source_id] || '',
          status: statusMap[p.status_id] || '',
          notes: p.notes || ''
        }));
        setProspects(mapped);
      }
      setLoading(false);
    };
    fetchProspects();
  }, []);

  // Agregar prospecto a Supabase
  const addProspect = async (prospect: Omit<Prospect, 'id'>) => {
    const { data, error } = await supabase.from('prospects').insert([prospect]).select();
    if (error) {
      toast({ title: 'Error al crear prospecto', description: error.message, variant: 'destructive' });
      return null;
    }
    if (data && data[0]) {
      setProspects(prev => [...prev, data[0]]);
      toast({ title: 'Prospecto creado', description: `${data[0].name} ha sido registrado correctamente.` });
      return data[0];
    }
    return null;
  };

  // Actualizar prospecto en Supabase
  const updateProspect = async (id: string, updates: Partial<Prospect>) => {
    const { data, error } = await supabase.from('prospects').update(updates).eq('id', id).select();
    if (error) {
      toast({ title: 'Error al actualizar prospecto', description: error.message, variant: 'destructive' });
      return;
    }
    setProspects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    toast({ title: 'Prospecto actualizado', description: 'La información ha sido actualizada correctamente.' });
  };

  // Actualizar status de un prospecto
  const updateProspectStatus = async (id: string, status: ProspectStatus) => {
    await updateProspect(id, { status });
  };

  // Eliminar prospecto en Supabase
  const deleteProspect = async (id: string) => {
    const prospect = prospects.find(p => p.id === id);
    if (!prospect) return;
    const { error } = await supabase.from('prospects').delete().eq('id', id);
    if (error) {
      toast({ title: 'Error al eliminar prospecto', description: error.message, variant: 'destructive' });
      return;
    }
    setProspects(prev => prev.filter(p => p.id !== id));
    toast({ title: 'Prospecto eliminado', description: `${prospect.name} ha sido eliminado correctamente.` });
  };

  // Filtrar prospectos por búsqueda
  const filterProspects = (query: string) => {
    if (!query.trim()) return prospects;
    return prospects.filter(prospect => 
      prospect.name.toLowerCase().includes(query.toLowerCase()) ||
      prospect.location.toLowerCase().includes(query.toLowerCase()) ||
      prospect.phone.includes(query) ||
      (prospect.priceRange && prospect.priceRange.toLowerCase().includes(query.toLowerCase()))
    );
  };

  return {
    prospects,
    loading,
    addProspect,
    updateProspect,
    updateProspectStatus,
    deleteProspect,
    filterProspects
  };
};
