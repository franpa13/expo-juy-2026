import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";
import { SiteNav } from "./site-nav";
import { StrataDivider } from "./strata";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur">
      {/* Full navbar width on purpose (unlike PageContainer elsewhere): the
          1fr/auto/1fr split is what keeps the nav mathematically centered
          in the middle regardless of how wide the logo or the toggle group
          are, and that center point already coincides with where every
          page's max-w-6xl content sits, since that content is itself
          centered in the same viewport via mx-auto — no need to nest it in
          the same container to make them line up. */}
      <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="ExpoJuy 2026, inicio">
          <Image
            src="/images/logos/expojuy26_isologotipo.png"
            alt=""
            width={40}
            height={40}
            priority
          />
        </Link>
        <SiteNav className="hidden lg:flex" />
        <div className="flex items-center justify-end gap-1">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
      <StrataDivider className="h-0.75 rounded-none" />
    </header>
  );
}
