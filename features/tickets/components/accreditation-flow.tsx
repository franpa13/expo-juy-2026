"use client";

import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ActivityTrack, AgendaSession } from "@/features/agenda";
import type { Exhibitor } from "@/features/exhibitors";
import { RUBROS, RUBRO_LABELS } from "@/lib/rubros";
import { usePass, usePassActions } from "@/lib/pass-store";
import { findTier } from "../data/tiers";
import { buildPass, restorePass } from "../lib/pass";
import { riseItem, staggerContainer } from "../lib/motion-presets";
import { accreditationSchema, type AccreditationFormValues } from "../lib/schema";
import type { Pass, TicketTier } from "../types";
import { PassCard } from "./pass-card";
import { TierGrid } from "./tier-grid";

const TRACK_OPTIONS: { value: ActivityTrack; label: string }[] = [
  { value: "general", label: "General" },
  ...RUBROS.map((rubro) => ({ value: rubro as ActivityTrack, label: RUBRO_LABELS[rubro] })),
];

function StepHeading({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <span
        aria-hidden="true"
        className="mt-1 flex size-7 shrink-0 items-center justify-center border border-primary/40 font-mono text-xs font-semibold text-primary tabular-nums"
      >
        {step}
      </span>
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          <span className="sr-only">Paso {step}: </span>
          {title}
        </h2>
        <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export function AccreditationFlow({
  tiers,
  sessions,
  exhibitors,
}: {
  tiers: TicketTier[];
  sessions: AgendaSession[];
  exhibitors: Exhibitor[];
}) {
  const reduced = useReducedMotion() ?? false;
  const item = riseItem(reduced, 16);
  const [issuedPass, setIssuedPass] = useState<Pass | null>(null);
  // Set when the visitor starts a new accreditation on this page, so the pass
  // they are replacing stops reappearing under the form.
  const [restoreDismissed, setRestoreDismissed] = useState(false);
  const storedPass = usePass();
  const { savePass } = usePassActions();

  // A visitor who accredited, walked through the agenda and came back has to
  // find their pass here — otherwise "Ver mi pase" leads to an empty page.
  // Only identity and interests were stored; the itinerary and the stands are
  // rebuilt from the live programme.
  const restoredPass = useMemo(() => {
    if (!storedPass || restoreDismissed) return null;
    const tier = findTier(storedPass.tierId);
    if (!tier) return null;
    return restorePass({ stored: storedPass, tier, sessions, exhibitors });
  }, [storedPass, restoreDismissed, sessions, exhibitors]);

  const pass = issuedPass ?? restoredPass;

  const form = useForm<AccreditationFormValues>({
    resolver: zodResolver(accreditationSchema),
    defaultValues: { fullName: "", email: "", tierId: "general", interests: [] },
  });

  // useWatch (not form.watch) so the React Compiler can memoize this
  // component — form.watch returns a fresh function on every render.
  const tierId = useWatch({ control: form.control, name: "tierId" });
  const interests = useWatch({ control: form.control, name: "interests" });

  function onSubmit(values: AccreditationFormValues) {
    const tier = findTier(values.tierId);
    if (!tier) return;
    // Prototype: no backend. In production this would POST to an API route
    // and the pass code would come back from the server, not from the client.
    const issued = buildPass({ request: values, tier, sessions, exhibitors });
    setIssuedPass(issued);
    // Hand the credential to the rest of the site: from here the agenda, the
    // catalogue and the map can show this visitor their own ExpoJuy. Only the
    // identity and the interests travel — itinerary and stands are derived.
    savePass({
      code: issued.code,
      holderName: issued.holderName,
      tierId: tier.id,
      interests: values.interests,
    });
  }

  return (
    <div className="flex flex-col gap-16">
      <section id="pases" className="scroll-mt-24">
        <StepHeading
          step={1}
          title="Elegí tu pase"
          description="Los tres cubren los cuatro días. Cambian las instancias de negocios y el acceso al auditorio."
        />
        <div className="mt-8">
          <TierGrid
            tiers={tiers}
            selectedId={tierId}
            onSelect={(id) => {
              form.setValue("tierId", id, { shouldValidate: true });
              setIssuedPass(null);
              setRestoreDismissed(true);
            }}
          />
        </div>
      </section>

      <section id="acreditacion" className="scroll-mt-24">
        <StepHeading
          step={2}
          title="Contanos qué te interesa"
          description="Con esto armamos tu itinerario y marcamos tus stands. Si no elegís nada, el pase cubre todo el evento."
        />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-8">
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold tracking-[0.12em] uppercase">
                    Rubros de interés
                  </FormLabel>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value as ActivityTrack[]);
                        setIssuedPass(null);
                        setRestoreDismissed(true);
                      }}
                      className="flex flex-wrap justify-start gap-2"
                      aria-label="Rubros de interés"
                    >
                      {TRACK_OPTIONS.map((option) => (
                        <ToggleGroupItem key={option.value} value={option.value} variant="outline">
                          {option.label}
                        </ToggleGroupItem>
                      ))}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              animate="show"
              className="border border-line bg-card p-6 sm:p-8"
            >
              <motion.div variants={item}>
                <StepHeading
                  step={3}
                  title="Acreditate"
                  description="Con tu nombre y tu email generamos el pase. No hace falta crear una cuenta."
                />
              </motion.div>

              <motion.div variants={item} className="mt-8 grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" autoComplete="name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="tu@email.com"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>

              <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
                <Button type="submit" size="lg">
                  {pass ? "Actualizar mi pase" : "Generar mi pase"}
                </Button>
                <p className="text-sm text-muted-foreground">
                  {interests.length === 0
                    ? "Sin rubros elegidos: tu pase va a cubrir todo el evento."
                    : `${interests.length} ${interests.length === 1 ? "rubro elegido" : "rubros elegidos"}.`}
                </p>
              </motion.div>
            </motion.div>
          </form>
        </Form>
      </section>

      <AnimatePresence mode="wait">
        {pass ? (
          <motion.section
            key={pass.code}
            id="pase"
            className="scroll-mt-24"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <StepHeading
              step={4}
              title="Listo, este es tu pase"
              description="Guardalo o mostralo desde el teléfono. Lleva adentro tu itinerario y tus stands."
            />
            <div className="mt-8">
              <PassCard pass={pass} />
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
