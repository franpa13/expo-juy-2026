import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NewsItem } from "../types";

export function NewsList({ items }: { items: NewsItem[] }) {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <ul className="space-y-4">
      {sorted.map((item) => (
        <li key={item.id}>
          <Card className="transition-colors hover:border-primary/40">
            <CardHeader className="gap-1.5">
              <div className="flex items-center gap-3">
                <p className="text-xs font-bold tracking-[0.14em] text-accent uppercase">
                  {item.tag}
                </p>
                <time dateTime={item.date} className="text-xs text-muted-foreground">
                  {new Date(item.date + "T00:00:00").toLocaleDateString("es-AR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.summary}</p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
