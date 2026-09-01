import type { Metadata } from "next";
import { FaqAccordion, FAQS } from "@/features/faq";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | ExpoJuy 2026",
  description: "Respuestas a las preguntas más comunes sobre ExpoJuy 2026.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Preguntas frecuentes</h1>
      <div className="mt-8">
        <FaqAccordion items={FAQS} />
      </div>
    </div>
  );
}
