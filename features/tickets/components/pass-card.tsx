"use client";

import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { AGENDA_DAYS } from "@/features/agenda";
import { RUBRO_LABELS } from "@/lib/rubros";
import { passQrPayload } from "../lib/pass";
import { popItem, riseItem, staggerContainer } from "../lib/motion-presets";
import type { Pass } from "../types";
import { PassQr } from "./pass-qr";

function trackLabel(track: Pass["interests"][number]) {
  return track === "general" ? "General" : RUBRO_LABELS[track];
}

export function PassCard({ pass }: { pass: Pass }) {
  const reduced = useReducedMotion() ?? false;
  const item = riseItem(reduced, 16);
  const pop = popItem(reduced);

  const firstDay = pass.itinerary[0]?.day;

  return (
    <motion.div
      variants={staggerContainer(0.07)}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-5"
    >
      {/* The credential itself — deliberately the only dark object on the
          page below the hero, so it reads as a physical badge you were
          handed rather than one more panel. */}
      <motion.div
        variants={pop}
        className="relative isolate overflow-hidden bg-neutral-950 text-white"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(80% 70% at 100% 0%, color-mix(in oklch, var(--primary), transparent 65%) 0%, transparent 70%)",
          }}
        />

        <div className="relative flex flex-col gap-8 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-bold tracking-[0.16em] text-accent uppercase">
              Pase ExpoJuy 2026 · {pass.tier.name}
            </p>
            <p className="mt-3 truncate text-3xl font-extrabold tracking-tight sm:text-4xl">
              {pass.holderName}
            </p>
            <p className="mt-4 font-mono text-xl tracking-[0.18em] text-white/85 tabular-nums">
              {pass.code}
            </p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {pass.interests.length === 0 ? (
                <li className="border border-white/25 px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.1em] text-white/70 uppercase">
                  Todo el evento
                </li>
              ) : (
                pass.interests.map((track) => (
                  <li
                    key={track}
                    className="border border-accent/40 bg-accent/10 px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.1em] text-accent uppercase"
                  >
                    {trackLabel(track)}
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end">
            <div className="size-28 bg-white p-2 text-neutral-950 sm:size-32">
              <PassQr
                value={passQrPayload(pass.code)}
                label={`Código QR del pase ${pass.code}`}
              />
            </div>
            <p className="max-w-28 text-[0.6rem] leading-snug tracking-wide text-white/45 uppercase sm:text-right">
              Presentalo en el ingreso
            </p>
          </div>
        </div>

        {/* Perforation line, like a real tear-off badge stub. */}
        <div
          aria-hidden="true"
          className="relative h-px w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.35)_0_6px,transparent_6px_12px)]"
        />

        <dl className="relative grid grid-cols-3 divide-x divide-white/10">
          {[
            { label: "Actividades", value: pass.itinerary.length },
            { label: "Días con agenda", value: pass.daysCovered },
            { label: "Stands sugeridos", value: pass.stands.length },
          ].map((stat) => (
            <div key={stat.label} className="px-5 py-4 sm:px-8">
              <dd className="text-2xl font-extrabold tabular-nums">{stat.value}</dd>
              <dt className="mt-1 text-[0.6rem] font-bold tracking-[0.12em] text-white/50 uppercase">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </motion.div>

      {/* What the pass unlocks elsewhere in the site. */}
      <motion.div variants={item} className="grid gap-5 sm:grid-cols-2">
        <section className="border border-line bg-card p-5">
          <h3 className="flex items-center gap-2 text-sm font-bold tracking-[0.1em] uppercase">
            <CalendarDays className="size-4 text-accent" aria-hidden="true" />
            Tu itinerario
          </h3>
          {pass.itinerary.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              No hay actividades para los rubros elegidos. Probá sumando otro interés.
            </p>
          ) : (
            <>
              <p className="mt-3 text-sm text-muted-foreground">
                {pass.itinerary.length} actividades sin choques de horario
                {firstDay ? `, arrancando el ${AGENDA_DAYS[firstDay].toLowerCase()}` : ""}.
              </p>
              <ol className="mt-4 flex flex-col divide-y divide-line border-t border-line">
                {pass.itinerary.slice(0, 4).map((session) => (
                  <li key={session.id} className="flex items-baseline gap-3 py-2.5 text-sm">
                    <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                      D{session.day} · {session.startTime}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{session.title}</span>
                  </li>
                ))}
              </ol>
              {pass.itinerary.length > 4 ? (
                <p className="mt-3 text-xs text-muted-foreground">
                  Y {pass.itinerary.length - 4} más en{" "}
                  <Link className="underline underline-offset-2 hover:text-foreground" href="/agenda">
                    la agenda completa
                  </Link>
                  .
                </p>
              ) : null}
            </>
          )}
        </section>

        <section className="border border-line bg-card p-5">
          <h3 className="flex items-center gap-2 text-sm font-bold tracking-[0.1em] uppercase">
            <MapPin className="size-4 text-accent" aria-hidden="true" />
            Tus stands
          </h3>
          <p className="mt-3 text-sm text-muted-foreground">
            {pass.stands.length} stands de tus rubros, ya marcados en{" "}
            <Link className="underline underline-offset-2 hover:text-foreground" href="/mapa">
              el plano del predio
            </Link>
            .
          </p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {pass.stands.map((stand) => (
              <li
                key={stand.standId}
                className="flex items-baseline gap-1.5 border border-line px-2.5 py-1.5 text-xs"
                title={stand.exhibitorName}
              >
                <span className="font-mono font-semibold text-primary">{stand.standId}</span>
                <span className="max-w-32 truncate text-muted-foreground">
                  {stand.exhibitorName}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </motion.div>
    </motion.div>
  );
}
