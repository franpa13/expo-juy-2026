import { cn } from "@/lib/utils";
import { StrataDivider } from "./strata";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

/**
 * Shared header for every inner page: an eyebrow line carrying real
 * information (a date range, a count, a status), a display title, and the
 * strata-divider signature marking where the page's own content begins.
 */
export function PageHeader({ eyebrow, title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      {description ? <p className="mt-4 text-lg text-muted-foreground">{description}</p> : null}
      <StrataDivider className="mt-6 max-w-24" />
    </div>
  );
}
