import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";
import { SiteNav } from "./site-nav";
import { StrataDivider } from "./strata";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
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
        <SiteNav className="hidden lg:flex" />
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
      <StrataDivider className="h-0.75 rounded-none" />
    </header>
  );
}
