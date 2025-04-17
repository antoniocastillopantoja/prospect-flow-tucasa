export type ProspectStatus = "new" | "contacted" | "appointment" | "canceled" | "closed";

export interface Prospect {
  id: number;
  name: string;
  phone: string;
  email?: string;
  location: string;
  sector: string;
  priceRange: string;
  creditType: string;
  contactDate: string;
  agent: string;
  source?: string;
  status: ProspectStatus;
  notes?: string;
  propertyId?: string;
  commissionPercentage?: string;
  negotiatedPrice?: string;
}

// Mock data for prospects
export const mockProspects: Prospect[] = [
  {
    id: 1,
    name: "Carlos Vega",
    phone: "555-111-2222",
    email: "carlos.vega@example.com",
    location: "Col. Del Valle",
    sector: "Sur",
    priceRange: "$2M - $3M",
    creditType: "Bancario",
    contactDate: "2025-04-09",
    agent: "Ana Rodríguez",
    source: "Facebook",
    status: "new"
  },
  {
    id: 2,
    name: "María López",
    phone: "555-333-4444",
    email: "maria.lopez@example.com",
    location: "Col. Condesa",
    sector: "Centro",
    priceRange: "$3M - $4M",
    creditType: "Infonavit",
    contactDate: "2025-04-08",
    agent: "Juan Pérez",
    source: "Instagram",
    status: "contacted"
  },
  {
    id: 3,
    name: "Roberto Sánchez",
    phone: "555-555-6666",
    email: "roberto.sanchez@example.com",
    location: "Col. Polanco",
    sector: "Norte",
    priceRange: "$5M - $7M",
    creditType: "Contado",
    contactDate: "2025-04-07",
    agent: "Ana Rodríguez",
    source: "Referidos",
    status: "appointment"
  },
  {
    id: 4,
    name: "Laura Martínez",
    phone: "555-777-8888",
    email: "laura.martinez@example.com",
    location: "Col. Roma Norte",
    sector: "Centro",
    priceRange: "$2.5M - $3.5M",
    creditType: "Fovissste",
    contactDate: "2025-04-06",
    agent: "Pedro Ramírez",
    source: "TikTok",
    status: "closed",
    propertyId: "PROP-2025-042",
    commissionPercentage: "3.5",
    negotiatedPrice: "2750000"
  },
  {
    id: 5,
    name: "Javier Luna",
    phone: "555-999-0000",
    email: "javier.luna@example.com",
    location: "Col. Narvarte",
    sector: "Sur",
    priceRange: "$1.8M - $2.5M",
    creditType: "Bancario",
    contactDate: "2025-04-05",
    agent: "Juan Pérez",
    source: "Sitio Web",
    status: "canceled"
  },
  {
    id: 6,
    name: "Ana Torres",
    phone: "555-222-3333",
    email: "ana.torres@example.com",
    location: "Col. Escandón",
    sector: "Centro",
    priceRange: "$3M - $4.5M",
    creditType: "Infonavit",
    contactDate: "2025-04-04",
    agent: "Pedro Ramírez",
    source: "Facebook",
    status: "contacted"
  }
];

export const sectors = ["Norte", "Sur", "Centro"];
export const creditTypes = ["Bancario", "Infonavit", "Fovissste", "Contado", "Otro"];
export const agents = ["Juan Pérez", "Ana Rodríguez", "Pedro Ramírez"];
