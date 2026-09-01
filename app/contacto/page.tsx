import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contacto | ExpoJuy 2026",
  description: "Contactate con la organización de ExpoJuy 2026.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Estamos para ayudarte"
        title="Contacto"
        description="¿Querés ser expositor, sos prensa o tenés una consulta? Escribinos."
      />
      <div className="mt-10">
        <ContactForm />
      </div>
    </div>
  );
}
