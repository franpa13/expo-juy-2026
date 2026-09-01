import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "./nav-links";
import { MobileNav } from "./mobile-nav";
import { StrataDivider } from "./strata";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="ExpoJuy 2026, inicio">
          <Image
            src="/images/logos/expojuy26_isologotipo.png"
            alt=""
            width={32}
            height={32}
            priority
          />
          <span className="font-extrabold tracking-tight">ExpoJuy 2026</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </div>
      <StrataDivider className="h-0.75 rounded-none" />
    </header>
  );
}
