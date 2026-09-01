import type { Metadata } from "next";
import { ContactForm } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contacto | ExpoJuy 2026",
  description: "Contactate con la organización de ExpoJuy 2026.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Contacto</h1>
      <p className="mt-2 text-muted-foreground">
        ¿Querés ser expositor, sos prensa o tenés una consulta? Escribinos.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
