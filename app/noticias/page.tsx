import type { Metadata } from "next";
import { NewsList, NEWS } from "@/features/news";

export const metadata: Metadata = {
  title: "Noticias | ExpoJuy 2026",
  description: "Novedades y anuncios oficiales de ExpoJuy 2026.",
};

export default function NoticiasPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Noticias</h1>
      <div className="mt-8">
        <NewsList items={NEWS} />
      </div>
    </div>
  );
}
