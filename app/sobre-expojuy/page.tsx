import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { AboutContent } from "@/features/about";

export const metadata: Metadata = {
  title: "Sobre ExpoJuy 2026",
  description: "Qué es ExpoJuy 2026, su historia y los valores que la impulsan.",
};

export default function SobreExpoJuyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <PageHeader eyebrow="17ª edición · CAMCOMEX" title="Sobre ExpoJuy 2026" />
      <div className="mt-10">
        <AboutContent />
      </div>
    </div>
  );
}
