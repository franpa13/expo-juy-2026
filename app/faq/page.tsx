import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { FaqAccordion, FAQS } from "@/features/faq";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | ExpoJuy 2026",
  description: "Respuestas a las preguntas más comunes sobre ExpoJuy 2026.",
};

export default function FaqPage() {
  return (
    <PageContainer>
      <PageHeader eyebrow={`${FAQS.length} preguntas`} title="Preguntas frecuentes" />
      <div className="mt-10 max-w-3xl">
        <FaqAccordion items={FAQS} />
      </div>
    </PageContainer>
  );
}
