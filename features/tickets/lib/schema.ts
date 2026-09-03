import { z } from "zod";
import { RUBROS } from "@/lib/rubros";
import { TICKET_TIER_IDS } from "../types";

export const accreditationSchema = z.object({
  fullName: z.string().min(2, "Ingresá tu nombre completo."),
  email: z.string().email("Ingresá un email válido."),
  tierId: z.enum(TICKET_TIER_IDS, { message: "Elegí un tipo de pase." }),
  interests: z.array(z.enum(["general", ...RUBROS])),
});

export type AccreditationFormValues = z.infer<typeof accreditationSchema>;
