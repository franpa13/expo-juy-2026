import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Ingresá tu nombre completo."),
  email: z.string().email("Ingresá un email válido."),
  topic: z.enum(["expositor", "prensa", "visitante", "otro"], {
    message: "Elegí un motivo de contacto.",
  }),
  message: z.string().min(10, "Contanos un poco más (mínimo 10 caracteres)."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const CONTACT_TOPICS: { value: ContactFormValues["topic"]; label: string }[] = [
  { value: "expositor", label: "Quiero ser expositor" },
  { value: "prensa", label: "Prensa" },
  { value: "visitante", label: "Consulta general de visitante" },
  { value: "otro", label: "Otro" },
];
