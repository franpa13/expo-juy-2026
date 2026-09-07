import type { ActivityTrack, AgendaSession } from "@/features/agenda";
import type { Rubro } from "@/lib/rubros";

export const TICKET_TIER_IDS = ["general", "profesional", "institucional"] as const;

export type TicketTierId = (typeof TICKET_TIER_IDS)[number];

export interface TicketTier {
  id: TicketTierId;
  name: string;
  /**
   * Who the pass is for, in two or three words. Carries the job a "most
   * popular" ribbon would otherwise do, without ranking the options for the
   * visitor: each tier says who it is for and they pick.
   */
  audience: string;
  /** Human-readable price. Free and by-invitation tiers say so in words. */
  price: string;
  priceNote: string;
  summary: string;
  includes: string[];
  /** Whether a visitor can accredit themselves online, or has to be invited. */
  selfService: boolean;
  featured?: boolean;
}

/** What the visitor fills in to accredit. */
export interface PassRequest {
  fullName: string;
  email: string;
  tierId: TicketTierId;
  interests: ActivityTrack[];
}

/** A stand the pass holder should visit, given their interests. */
export interface PassStand {
  standId: string;
  exhibitorName: string;
  rubro: Rubro;
}

/**
 * The credential itself. It is not just an admission token: it carries the
 * visitor's itinerary and the stands matching their interests, which is what
 * lets the agenda, the exhibitor catalogue and the venue map filter down to
 * "lo tuyo" once a pass exists.
 */
export interface Pass {
  code: string;
  holderName: string;
  tier: TicketTier;
  interests: ActivityTrack[];
  itinerary: AgendaSession[];
  stands: PassStand[];
  daysCovered: number;
}
