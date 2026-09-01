import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { AboutContent } from "@/features/about";

export const metadata: Metadata = {
  title: "Sobre ExpoJuy 2026",
  description: "Qué es ExpoJuy 2026, su historia y los valores que la impulsan.",
};

export default function SobreExpoJuyPage() {
  return (
    <PageContainer>
      <PageHeader eyebrow="17ª edición · CAMCOMEX" title="Sobre ExpoJuy 2026" />
      <div className="mt-10 max-w-3xl">
        <AboutContent />
      </div>
    </PageContainer>
  );
}
