import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { NewsList, NEWS } from "@/features/news";

export const metadata: Metadata = {
  title: "Noticias | ExpoJuy 2026",
  description: "Novedades y anuncios oficiales de ExpoJuy 2026.",
};

export default function NoticiasPage() {
  return (
    <PageContainer>
      <PageHeader eyebrow={`${NEWS.length} novedades`} title="Noticias" />
      <div className="mt-10 max-w-3xl">
        <NewsList items={NEWS} />
      </div>
    </PageContainer>
  );
}
