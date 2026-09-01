export type SponsorTier = "platino" | "oro" | "plata";

export interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
}
