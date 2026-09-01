import type { Metadata } from "next";
import { AboutContent } from "@/features/about";

export const metadata: Metadata = {
  title: "Sobre ExpoJuy 2026",
  description: "Qué es ExpoJuy 2026, su historia y los valores que la impulsan.",
};

export default function SobreExpoJuyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Sobre ExpoJuy 2026</h1>
      <div className="mt-8">
        <AboutContent />
      </div>
    </div>
  );
}
