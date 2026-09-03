"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS, isNavLinkActive } from "./nav-links";

export function SiteNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("items-center gap-1", className)} aria-label="Navegación principal">
      {NAV_LINKS.map((link) => {
        const active = isNavLinkActive(pathname, link.href);
        return (
          <Button
            key={link.href}
            asChild
            variant="ghost"
            size="sm"
            className={cn(
              "text-sm font-medium normal-case tracking-normal hover:underline",
              active ? "text-foreground underline" : "text-foreground/80"
            )}
          >
            <Link href={link.href} aria-current={active ? "page" : undefined}>
              {link.label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
