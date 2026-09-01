import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { NAV_LINKS } from "./nav-links";

const SOCIAL_LINKS = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://x.com", label: "X (Twitter)" },
  { href: "https://linkedin.com", label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <Image
              src="/images/logos/expojuy26_horizontal.png"
              alt="ExpoJuy 2026 — Conectando países, creando oportunidades"
              width={180}
              height={78}
              className="h-auto w-40"
            />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              9 al 12 de octubre de 2026 · Ciudad Cultural, San Salvador de Jujuy.
            </p>
          </div>
          <nav aria-label="Enlaces del sitio">
            <h3 className="text-sm font-semibold text-foreground">Sitio</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Redes sociales</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            Organiza: Cámara de Comercio Exterior de Jujuy. Prototipo del Desafío
            Digital ExpoJuy 2026 — no es el sitio oficial de producción.
          </p>
          <Image
            src="/images/logos/logo_camcomext.png"
            alt="Cámara de Comercio Exterior de Jujuy"
            width={48}
            height={48}
            className="h-10 w-auto opacity-80"
          />
        </div>
      </div>
    </footer>
  );
}
