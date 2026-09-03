"use client";

import { useMemo } from "react";
import qrcode from "qrcode-generator";
import { cn } from "@/lib/utils";

/**
 * A real QR, drawn as one SVG path rather than hundreds of rects. Error
 * correction level M is the usual choice for a printed or on-screen badge:
 * enough redundancy to survive a scuffed lanyard, without inflating the
 * module count past what reads on a phone screen.
 */
export function PassQr({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const { path, modules } = useMemo(() => {
    const qr = qrcode(0, "M");
    qr.addData(value);
    qr.make();
    const count = qr.getModuleCount();
    let d = "";
    for (let row = 0; row < count; row++) {
      for (let col = 0; col < count; col++) {
        if (qr.isDark(row, col)) d += `M${col} ${row}h1v1h-1z`;
      }
    }
    return { path: d, modules: count };
  }, [value]);

  return (
    <svg
      viewBox={`0 0 ${modules} ${modules}`}
      className={cn("size-full", className)}
      role="img"
      aria-label={label}
      shapeRendering="crispEdges"
    >
      <path d={path} fill="currentColor" />
    </svg>
  );
}
