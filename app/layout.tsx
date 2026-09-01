import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { THEME_STORAGE_KEY } from "@/components/layout/theme-constants";
import { AssistantWidget } from "@/features/assistant";

// Runs before first paint so the page never flashes the wrong theme.
// Rendered as a plain <script> (not next/script) guarded to the server:
// React 19 warns ("Encountered a script tag while rendering React
// component") on ANY inline <script> a component renders, next/script's
// beforeInteractive included — a known, still-open friction point between
// React 19 and Next 16 (tracked upstream in next-themes, shadcn/ui, and
// others). Since this element only ever needs to exist in the
// server-rendered HTML — browsers execute it there the instant it's
// parsed, and it has nothing left to do afterward — rendering `null` on
// the client sidesteps the warning entirely instead of fighting it.
// Mutates <html> outside React's render — paired with
// suppressHydrationWarning below.
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
        {typeof window === "undefined" ? (
          <script
            id="theme-init"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
          />
        ) : null}
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <AssistantWidget />
      </body>
    </html>
  );
}
