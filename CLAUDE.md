@AGENTS.md

# ExpoJuy 2026 — Sitio del Desafío Digital

## Qué es esto

Prototipo funcional (Next.js) para el "Desafío Digital ExpoJuy 2026": la entrega
**opcional** (bonus) de la primera etapa del desafío, que complementa el mockup
obligatorio en Figma/Penpot (fuera de este repo). Usa datos mock, sin backend real.
No es el sitio de producción de ExpoJuy 2026.

ExpoJuy 2026 es la 17ª edición de la feria multisectorial más importante del norte
argentino (Cámara de Comercio Exterior de Jujuy), 9 al 12 de octubre de 2026, en
Ciudad Cultural (San Salvador de Jujuy). Lema: "Conectando países – creando
oportunidades", con eje en el Corredor Bioceánico y el comercio internacional. El
desafío digital en sí tiene eje en innovación, tecnología, producción, desarrollo,
vinculación empresarial y economía del conocimiento.

Spec completo: `docs/superpowers/specs/2026-09-01-expojuy-2026-design.md`.

## Identidad visual (obligatoria, no se improvisa)

Paleta (extraída por muestreo de píxeles de los logos oficiales en
`/public/images/logos/`, confirmada por el organizador del proyecto):

- Violeta profundo `#820CD0` — primario
- Índigo `#774FF0` — primario alternativo, foco/ring, hovers
- Lavanda `#BB8CFF` — acentos claros, superficies en dark mode
- Turquesa `#25C0D4` — highlight/contraste (badges, links, iconos)
- Grafito `#4B4B4D` — texto principal
- Gris línea `#BDBFC1` — separadores, texto secundario

Tipografía: **Manrope** (`next/font/google`), elegida como equivalente geométrico de
Ambit — la fuente de marca real no está disponible en Google Fonts.

No usar colores fuera de esta paleta para elementos de marca (botones primarios,
encabezados de sección, acentos). Grises neutros de Tailwind están permitidos para
texto secundario y fondos si no rompen el contraste con la paleta.

El logo de la Cámara de Comercio Exterior de Jujuy (rojo/negro) es **solo** para
atribución institucional (footer / sección sponsors) — nunca como color de marca
del sitio.

## Arquitectura (feature-based)

```
app/               → routing únicamente, páginas delgadas que importan de features/
features/<name>/   → components/, data/, hooks/, lib/, types.ts, index.ts (fachada)
components/ui/     → primitivos shadcn
components/layout/ → Header, Footer, Nav (cross-feature)
lib/                → utils y tipos globales (ej. Rubro)
```

Regla de dependencia: `app/*` solo importa `features/*/index.ts` y
`components/layout`. Una feature nunca importa internals de otra feature
directamente — si necesitan compartir algo, sube a `components/` o `lib/`.

## Convenciones

- Server Components por defecto; `"use client"` solo donde hay estado o
  interactividad real.
- Estilo con Tailwind v4 + shadcn (`components.json`, estilo `radix-sera`). Agregar
  primitivos con `npx shadcn add <componente>`, nunca copiar/pegar a mano.
- Datos: cada feature con contenido variable expone `data/*.ts` tipado (mock, sin
  fetch). Rubros de ejemplo: minería, energías renovables, turismo, agroindustria,
  tecnología, industria, comercio exterior — reales del sector de ExpoJuy, sin usar
  nombres de empresas reales sin autorización.
- Tests con Vitest para lógica pura (filtros, planificador de agenda, guion del
  asistente). No es obligatorio testear JSX puramente presentacional.
- Este es Next.js **16** — hay cambios importantes respecto a versiones previas
  (Turbopack por defecto, Async Request APIs, `middleware` → `proxy`, etc.). Leer
  `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md` antes de
  usar `params`, `searchParams`, `cookies()` o `headers()`.

## Reglas para agentes de IA en este repo

- No inventar funcionalidad que no esté en las consignas o en el spec sin
  consultarlo antes.
- No romper la identidad visual (paleta/tipografía definidas arriba).
- No reproducir textualmente el diseño, estructura o contenido de los sitios de
  referencia citados en las consignas (ExpoJuy 2024, Argentina Mining, Expo
  Industrias, Expo Logisti-k) — son solo orientativos.
- El widget "Asistente Virtual ExpoJuy" es una demo con respuestas guionadas — no
  afirmar en la UI ni en el copy que está conectado a un LLM real.
