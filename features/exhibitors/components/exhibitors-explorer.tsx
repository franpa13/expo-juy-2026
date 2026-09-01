"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RUBROS, RUBRO_LABELS, type Rubro } from "@/lib/rubros";
import { filterExhibitors } from "../lib/filter";
import { ExhibitorCard } from "./exhibitor-card";
import type { Exhibitor } from "../types";

export function ExhibitorsExplorer({ exhibitors }: { exhibitors: Exhibitor[] }) {
  const [query, setQuery] = useState("");
  const [rubro, setRubro] = useState<Rubro | "all">("all");

  const results = useMemo(
    () => filterExhibitors(exhibitors, query, rubro),
    [exhibitors, query, rubro]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar expositor por nombre o descripción..."
          aria-label="Buscar expositor"
          className="sm:max-w-sm"
        />
        <Select value={rubro} onValueChange={(v) => setRubro(v as Rubro | "all")}>
          <SelectTrigger className="sm:w-56" aria-label="Filtrar por rubro">
            <SelectValue placeholder="Todos los rubros" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los rubros</SelectItem>
            {RUBROS.map((r) => (
              <SelectItem key={r} value={r}>
                {RUBRO_LABELS[r]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground" role="status">
        {results.length} {results.length === 1 ? "expositor encontrado" : "expositores encontrados"}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((exhibitor) => (
          <ExhibitorCard key={exhibitor.id} exhibitor={exhibitor} />
        ))}
      </div>
    </div>
  );
}
