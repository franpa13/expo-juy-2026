"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type EventStatus = "upcoming" | "live" | "ended";

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function getStatus(targetDate: string, endDate?: string): EventStatus {
  const now = Date.now();
  if (now < new Date(targetDate).getTime()) return "upcoming";
  if (endDate && now > new Date(endDate).getTime()) return "ended";
  return "live";
}

export function Countdown({
  targetDate,
  endDate,
}: {
  targetDate: string;
  /** Optional end of the event — once passed, shows an "ended" message instead of a frozen 00:00:00:00 countdown. */
  endDate?: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [status, setStatus] = useState<EventStatus>("upcoming");

  useEffect(() => {
    const tick = () => {
      setStatus(getStatus(targetDate, endDate));
      setTimeLeft(getTimeLeft(targetDate));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate, endDate]);

  if (status === "live") {
    return (
      <p className="text-lg font-semibold text-primary" role="status">
        ¡El evento está en curso! Te esperamos en Ciudad Cultural.
      </p>
    );
  }

  if (status === "ended") {
    return (
      <p className="text-lg font-semibold text-muted-foreground" role="status">
        ExpoJuy 2026 finalizó. ¡Gracias por participar!
      </p>
    );
  }

  const units: { label: string; value: number }[] = timeLeft
    ? [
        { label: "días", value: timeLeft.days },
        { label: "horas", value: timeLeft.hours },
        { label: "minutos", value: timeLeft.minutes },
        { label: "segundos", value: timeLeft.seconds },
      ]
    : [];

  return (
    <div className="flex gap-6" role="timer" aria-live="off">
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="text-3xl font-bold tabular-nums text-foreground">
            {String(unit.value).padStart(2, "0")}
          </div>
          <div className="text-xs tracking-wide text-muted-foreground uppercase">
            {unit.label}
          </div>
        </div>
      ))}
    </div>
  );
}
