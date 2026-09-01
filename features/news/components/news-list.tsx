import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NewsItem } from "../types";

export function NewsList({ items }: { items: NewsItem[] }) {
  const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <ul className="space-y-4">
      {sorted.map((item) => (
        <li key={item.id}>
          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-2">
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <Badge variant="secondary">{item.tag}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.summary}</p>
              <time dateTime={item.date} className="mt-2 block text-xs text-muted-foreground">
                {new Date(item.date + "T00:00:00").toLocaleDateString("es-AR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}
