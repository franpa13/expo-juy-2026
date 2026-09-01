import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "./nav-links";
import { StrataDivider } from "./strata";

const SOCIAL_LINKS = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://x.com", label: "X (Twitter)" },
  { href: "https://linkedin.com", label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <footer className="bg-muted/40">
      <StrataDivider className="h-1 rounded-none" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <Image
              src="/images/logos/expojuy26_horizontal.png"
              alt="ExpoJuy 2026 — Conectando países, creando oportunidades"
              width={180}
              height={78}
              className="h-auto w-40"
            />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              9 al 12 de octubre de 2026 · Ciudad Cultural, San Salvador de Jujuy.
            </p>
          </div>
          <nav aria-label="Enlaces del sitio">
            <h3 className="text-xs font-bold tracking-[0.14em] text-accent uppercase">Sitio</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
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
            <h3 className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
              Redes sociales
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
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
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
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
