import type { Exhibitor } from "../types";
import type { Rubro } from "@/lib/rubros";

export function filterExhibitors(
  exhibitors: Exhibitor[],
  query: string,
  rubro: Rubro | "all"
): Exhibitor[] {
  const q = query.trim().toLowerCase();

  return exhibitors.filter((exhibitor) => {
    const matchesQuery =
      q === "" ||
      exhibitor.name.toLowerCase().includes(q) ||
      exhibitor.description.toLowerCase().includes(q);
    const matchesRubro = rubro === "all" || exhibitor.rubro === rubro;
    return matchesQuery && matchesRubro;
  });
}
