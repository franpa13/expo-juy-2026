import { cn } from "@/lib/utils";

/**
 * The one outer wrapper every inner route uses — same max-width, same
 * horizontal and vertical padding everywhere, so no page's content module
 * sits in a differently-sized box than any other. Content that needs a
 * narrower reading width (prose, a form, an accordion) constrains itself
 * with its own inner wrapper — this component only owns the shared outer
 * rhythm.
 */
export function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto max-w-6xl px-4 py-12 sm:px-6", className)}>{children}</div>;
}
