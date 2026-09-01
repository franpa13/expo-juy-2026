import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { NewsList, NEWS } from "@/features/news";

export const metadata: Metadata = {
  title: "Noticias | ExpoJuy 2026",
  description: "Novedades y anuncios oficiales de ExpoJuy 2026.",
};

export default function NoticiasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageHeader eyebrow={`${NEWS.length} novedades`} title="Noticias" />
      <div className="mt-10">
        <NewsList items={NEWS} />
      </div>
    </div>
  );
}
