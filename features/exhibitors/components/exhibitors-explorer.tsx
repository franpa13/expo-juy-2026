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
import { PassScopeBar } from "@/components/pass/pass-scope-bar";
import { passCoversEverything, passMatches } from "@/lib/pass-scope";
import { usePass } from "@/lib/pass-store";
import { filterExhibitors } from "../lib/filter";
import { ExhibitorCard } from "./exhibitor-card";
import type { Exhibitor } from "../types";

export function ExhibitorsExplorer({ exhibitors }: { exhibitors: Exhibitor[] }) {
  const [query, setQuery] = useState("");
  const [rubro, setRubro] = useState<Rubro | "all">("all");
  const pass = usePass();
  const [onlyMine, setOnlyMine] = useState(true);

  // Only a pass that narrows the catalogue scopes it: no rubros chosen means
  // the visitor asked for the whole event.
  const scopingPass =
    pass && onlyMine && !passCoversEverything(pass) ? pass : null;

  const results = useMemo(() => {
    const found = filterExhibitors(exhibitors, query, rubro);
    return scopingPass
      ? found.filter((exhibitor) => passMatches(scopingPass, exhibitor.rubro))
      : found;
  }, [exhibitors, query, rubro, scopingPass]);

  return (
    <div className="space-y-6">
      <PassScopeBar
        noun={{ one: "expositor", other: "expositores" }}
        count={results.length}
        onlyMine={onlyMine}
        onOnlyMineChange={setOnlyMine}
      />
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
          <ExhibitorCard
            key={exhibitor.id}
            exhibitor={exhibitor}
            inPass={
              pass && !passCoversEverything(pass)
                ? passMatches(pass, exhibitor.rubro)
                : false
            }
          />
        ))}
      </div>
    </div>
  );
}
