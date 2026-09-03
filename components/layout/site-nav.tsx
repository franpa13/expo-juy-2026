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
              "group relative text-sm font-medium normal-case tracking-normal",
              active ? "text-foreground" : "text-foreground/80"
            )}
          >
            <Link href={link.href} aria-current={active ? "page" : undefined}>
              {link.label}
              {/* Grows from the left on hover, in the palette's highlight color —
                  stays fully drawn when this is the active route. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-4 bottom-1 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100",
                  active && "scale-x-100"
                )}
              />
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
