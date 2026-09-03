"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NAV_LINKS, isNavLinkActive } from "./nav-links";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Abrir menú">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>ExpoJuy 2026</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 pb-6" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => {
            const active = isNavLinkActive(pathname, link.href);
            return (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                className={cn(
                  "group relative justify-start text-sm font-medium normal-case tracking-normal",
                  "text-foreground"
                )}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
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
      </SheetContent>
    </Sheet>
  );
}
