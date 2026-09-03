import type { TicketTier } from "../types";

/**
 * Mock accreditation scheme. The real one is defined by the Cámara de
 * Comercio Exterior de Jujuy — these three tiers exist to show the flow,
 * not to announce prices.
 */
export const TICKET_TIERS: TicketTier[] = [
  {
    id: "general",
    name: "Entrada general",
    price: "Sin cargo",
    priceNote: "Acreditación previa obligatoria",
    summary:
      "Para visitantes, estudiantes y público general. Cubre los cuatro días de feria.",
    includes: [
      "Acceso al salón de expositores, los 4 días",
      "Charlas y paneles de acceso abierto",
      "Itinerario personalizado en tu pase",
      "Stands sugeridos según tus intereses",
    ],
    selfService: true,
  },
  {
    id: "profesional",
    name: "Pase profesional",
    price: "$ 12.000",
    priceNote: "Por persona · los 4 días",
    summary:
      "Para quienes vienen a hacer negocios: suma las instancias B2B y el acceso prioritario al auditorio.",
    includes: [
      "Todo lo de la entrada general",
      "Rueda de Negocios Internacional",
      "Acceso prioritario al Auditorio Principal",
      "Certificado de participación",
      "Kit del visitante profesional",
    ],
    selfService: true,
    featured: true,
  },
  {
    id: "institucional",
    name: "Expositor / institucional",
    price: "Por gestión",
    priceNote: "Con la Cámara de Comercio Exterior",
    summary:
      "Para empresas, cámaras y organismos que participan con stand o delegación.",
    includes: [
      "Stand en el predio y ficha en el catálogo",
      "Credenciales para todo el equipo",
      "Participación en la Rueda de Negocios",
      "Difusión en los canales del evento",
    ],
    selfService: false,
  },
];

export function findTier(id: string): TicketTier | undefined {
  return TICKET_TIERS.find((tier) => tier.id === id);
}
