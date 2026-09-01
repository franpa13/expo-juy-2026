import type { Rubro } from "@/lib/rubros";

export interface Exhibitor {
  id: string;
  name: string;
  rubro: Rubro;
  standId: string;
  description: string;
  country: string;
}
