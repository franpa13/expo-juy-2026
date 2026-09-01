"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = Math.max(0, new Date(targetDate).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));
    const interval = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

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
