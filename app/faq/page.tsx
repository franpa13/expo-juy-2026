import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { FaqAccordion, FAQS } from "@/features/faq";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | ExpoJuy 2026",
  description: "Respuestas a las preguntas más comunes sobre ExpoJuy 2026.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageHeader eyebrow={`${FAQS.length} preguntas`} title="Preguntas frecuentes" />
      <div className="mt-10">
        <FaqAccordion items={FAQS} />
      </div>
    </div>
  );
}
