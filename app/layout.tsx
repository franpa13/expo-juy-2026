import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { THEME_STORAGE_KEY } from "@/components/layout/theme-toggle";
import { AssistantWidget } from "@/features/assistant";

// Runs before hydration so the page never paints the wrong theme and then
// flashes to the right one. Reads the stored choice, falling back to the
// OS preference the first time a visitor shows up. Mutates <html> outside
// React's render — paired with suppressHydrationWarning below.
const THEME_INIT_SCRIPT = `(function () {
  try {
    var stored = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (dark) document.documentElement.classList.add("dark");
  } catch (e) {}
})();`;

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ExpoJuy 2026 | Conectando países, creando oportunidades",
  description:
    "Sitio propuesta para ExpoJuy 2026 — Desafío Digital: expositores, agenda, mapa del predio y más.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_INIT_SCRIPT}
        </Script>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <AssistantWidget />
      </body>
    </html>
  );
}
