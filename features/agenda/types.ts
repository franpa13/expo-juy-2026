import type { Rubro } from "@/lib/rubros";

export type ActivityTrack = Rubro | "general";

export interface AgendaSession {
  id: string;
  title: string;
  description: string;
  track: ActivityTrack;
  day: 1 | 2 | 3 | 4;
  startTime: string;
  endTime: string;
  location: string;
  speaker?: string;
}

export const AGENDA_DAYS: Record<AgendaSession["day"], string> = {
  1: "Viernes 9 de octubre",
  2: "Sábado 10 de octubre",
  3: "Domingo 11 de octubre",
  4: "Lunes 12 de octubre",
};
