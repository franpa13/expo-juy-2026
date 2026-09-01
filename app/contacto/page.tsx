import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contacto | ExpoJuy 2026",
  description: "Contactate con la organización de ExpoJuy 2026.",
};

export default function ContactoPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Estamos para ayudarte"
        title="Contacto"
        description="¿Querés ser expositor, sos prensa o tenés una consulta? Escribinos."
      />
      <div className="mt-10 max-w-xl">
        <ContactForm />
      </div>
    </PageContainer>
  );
}
