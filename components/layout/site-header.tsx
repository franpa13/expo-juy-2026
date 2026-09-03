import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";
import { PageContainer } from "./page-container";
import { SiteNav } from "./site-nav";
import { StrataDivider } from "./strata";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur">
      <PageContainer className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-4 py-0">
        <Link href="/" className="flex items-center gap-2" aria-label="ExpoJuy 2026, inicio">
          <Image
            src="/images/logos/expojuy26_isologotipo.png"
            alt=""
            width={38}
            height={38}
            priority
          />
        </Link>
        <SiteNav className="hidden justify-center lg:flex" />
        <div className="flex items-center justify-end gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </PageContainer>
      <StrataDivider className="h-0.75 rounded-none" />
    </header>
  );
}
