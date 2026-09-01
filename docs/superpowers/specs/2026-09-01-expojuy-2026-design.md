# ExpoJuy 2026 — Sitio web (Desafío Digital) — Diseño

**Fecha:** 2026-09-01
**Estado:** aprobado por el usuario

## 1. Contexto

Este repositorio es la entrega **opcional** (bonus, sección 4.1 de las consignas) del
"Desafío Digital ExpoJuy 2026": un prototipo funcional en Next.js que complementa el
mockup obligatorio (Figma/Penpot, fuera de este repo). No reemplaza al mockup ni debe
presentarse como el sitio de producción final — es la propuesta conceptual/visual de la
**primera etapa** del desafío, con datos simulados (mock), sin backend real.

### Qué es ExpoJuy (investigación, 2026-09-01)

- **ExpoJuy 2026** es la 17ª edición de la feria multisectorial más importante del norte
  argentino, organizada por la **Cámara de Comercio Exterior de Jujuy (CAMCOMEX)**.
  Se realiza del **9 al 12 de octubre de 2026** en **Ciudad Cultural, San Salvador de
  Jujuy**. Lema: **"Conectando países – creando oportunidades"**, con eje en el
  Corredor Bioceánico (Chile, Paraguay, Brasil) y el comercio internacional.
  Fuentes: [Pregón](https://www.pregon.com.ar/nota/30635/2026/08/presentaron-la-expojuy-2026-ante-empresarios-y-embajadores),
  [Jujuy al Momento](https://www.jujuyalmomento.com/expojuy/lanzaron-la-expojuy-2026-enfoque-el-comercio-internacional-y-el-corredor-bioceanico-n202133),
  [Las 24 Horas de Jujuy](https://las24horasdejujuy.com.ar/carlos-sadir-destaco-el-perfil-comercial-de-expojuy-2026-y-convoco-a-las-empresas-jujenas/).
- **ExpoJuy 2024** (edición anterior, "Creciendo Juntos hacia el Futuro"): +200 stands,
  rubros como energías renovables, minería, turismo, agro; rondas de negocios
  internacionales. Fuente: [Todo Jujuy](https://www.todojujuy.com/jujuy/inauguraron-la-expojuy-2024-ciudad-cultural-n259078).
- El **"Desafío Digital ExpoJuy 2026"** (las consignas en `AGENTS.md`/PDF del usuario) es
  una capa aparte, impulsada además por el Municipio y el Ministerio de Desarrollo
  Económico y Producción de Jujuy, con eje en innovación, tecnología, producción,
  desarrollo, vinculación empresarial y economía del conocimiento — complementaria al
  eje comercial de la feria real.

### Identidad visual oficial (extraída de `/public/images/logos/`)

Paleta muestreada por píxeles de los logos oficiales (`expojuy26_isologotipo.png`,
`expojuy26_horizontal.png`) y **confirmada por el usuario**:

| Token | HEX | Rol |
|---|---|---|
| Violeta profundo | `#820CD0` | Primario |
| Índigo / periwinkle | `#774FF0` | Primario alternativo, gradientes, hover |
| Lavanda | `#BB8CFF` | Acento claro, superficies, dark mode |
| Turquesa | `#25C0D4` | Contraste / highlight (links, badges, iconos) |
| Grafito | `#4B4B4D` | Texto principal |
| Gris línea | `#BDBFC1` | Separadores, texto secundario |

El logo de la Cámara de Comercio Exterior de Jujuy (rojo/negro/blanco) se usa **solo**
para atribución institucional (footer / sección sponsors), no integra la paleta del
sitio.

**Tipografía:** la marca pide **Ambit**, pero es una fuente comercial de la fundición
**CoType** y **no está disponible en Google Fonts** (confirmado por búsqueda:
[MaxiBestOf – Ambit pairings & alternatives](https://maxibestof.one/typefaces/ambit)).
Decisión (a pedido del usuario, instalar vía Google directamente): se usa
**Manrope** vía `next/font/google` como tipografía definitiva del sitio — es la
equivalencia geométrica más cercana a Ambit citada por comparadores tipográficos.
No se auto-hospedan archivos locales; no queda pendiente de assets adicionales.

## 2. Objetivos

- Prototipo navegable, no solo estático: interacciones reales donde aporten valor
  (buscador, filtros, planificador de agenda), no simulacros de funcionalidad.
- Reflejar identidad ExpoJuy 2026 real (paleta, tono) respetando la consigna de no
  copiar sitios de referencia.
- Demostrar un uso de IA "responsable" y honesto: un feature con lógica real (el
  planificador) + un concepto de asistente de IA claramente rotulado como demo.
- Base de código ordenada por features para que el jurado (y futuro equipo ganador)
  pueda entender y escalar el proyecto fácilmente.

## 3. Arquitectura

Next.js 16 (App Router) + React 19 + Tailwind v4 + shadcn (`radix-sera`, ya
inicializado). Organización **feature-based**:

```
app/                          → routing únicamente (páginas delgadas)
  layout.tsx, globals.css
  page.tsx                    → Inicio
  sobre-expojuy/page.tsx
  expositores/page.tsx
  agenda/page.tsx
  noticias/page.tsx
  mapa/page.tsx
  sponsors/page.tsx
  contacto/page.tsx
  faq/page.tsx

features/
  home/
  about/
  exhibitors/          → buscador + filtro por rubro
  agenda/               → agenda + planificador inteligente
  news/
  venue-map/            → mapa SVG interactivo
  sponsors/
  contact/              → formulario (validación cliente, sin envío real)
  faq/
  assistant/             → widget de asistente IA (cross-cutting, se monta en layout)
  → cada feature: components/, data/ (mock tipado), hooks/, lib/, types.ts,
    e index.ts como fachada pública

components/
  ui/          → primitivos shadcn (ya existe: button.tsx, se irán agregando)
  layout/      → Header, Footer, Nav, MobileMenu, SiteShell

lib/           → utils globales (cn() ya existe)
public/
  images/logos/  → ya poblado

docs/
  superpowers/specs/  → este documento y futuros
```

Regla de dependencia: `app/*` solo importa desde `features/*/index.ts` y
`components/layout`; una feature nunca importa internals de otra feature
directamente (si necesitan compartir algo, sube a `components/` o `lib/`).

## 4. Secciones (mínimas del PDF, todas cubiertas)

Inicio · Sobre ExpoJuy 2026 · Expositores · Agenda de actividades · Noticias · Mapa del
predio · Sponsors · Contacto · Preguntas frecuentes · Redes sociales (integradas en
footer/página de contacto, no como página aparte).

## 5. Funcionalidad diferencial (innovación)

1. **Planificador de Agenda Inteligente** (`features/agenda`): el visitante marca
   intereses/rubros; un motor de recomendación en cliente arma un itinerario sin
   solapamientos de horario. Lógica real (no maquetada), corre 100% en el navegador.
2. **Mapa interactivo del predio** (`features/venue-map`): SVG navegable con stands
   clickeables, filtro por rubro y buscador de expositores — unifica 3 secciones
   sugeridas del PDF (mapa, buscador, filtro) en una sola pieza.
3. **Asistente Virtual ExpoJuy** (`features/assistant`): widget de chat flotante con
   respuestas guiadas/scripted (no LLM real conectado). Rotulado explícitamente en la
   UI y en la memoria descriptiva como demo conceptual — evita afirmar una capacidad de
   IA que el prototipo estático no tiene. La memoria descriptiva documenta cómo se
   conectaría a un LLM real (p. ej. Claude API) en una fase de producción.

## 6. Datos mock

Cada feature con contenido variable expone `data/*.ts` tipado (TypeScript, sin
fetch), con contenido de ejemplo realista basado en los rubros reales de ExpoJuy
(minería, energías renovables, turismo, agro, tecnología, industria) — fácil de
reemplazar por un fetch a una API real después.

## 7. CLAUDE.md

Se reescribe `CLAUDE.md` (mantiene el `@AGENTS.md` existente vía import, no se toca
ese archivo por ser regenerado por `next dev`) agregando una sección de contexto de
proyecto: qué es ExpoJuy y el desafío, valores institucionales, arquitectura de
carpetas y su regla de dependencia, convenciones (server components por defecto,
shadcn, patrón de mock data, ubicación de assets), estado del kit de diseño (paleta y
tipografía confirmadas), y reglas para agentes de IA trabajando en el repo (no
inventar funcionalidad no pedida, no romper la identidad visual, no reproducir los
sitios de referencia listados en las consignas).

## 8. Skills de Claude Code recomendadas

- **frontend-design** (ya instalada) — usarla activamente en cada pantalla nueva para
  evitar la estética "shadcn por defecto".
- **code-review** / **security-review** — antes de cerrar cada feature grande.
- **dataviz** — si se agrega algún panel con métricas (ediciones anteriores, sponsors).
- **design** (Claude Design canvas) — para mockear pantallas puntuales antes de
  codearlas, si hace falta iterar visualmente antes de comprometerse a un layout.

## 9. Pendientes / abierto

- Confirmar si el manual de marca trae HEX oficiales distintos a los muestreados (el
  usuario confirmó los muestreados como válidos por ahora).
- Contenido de mock (nombres reales de expositores/sponsors) queda ficticio/genérico —
  no se inventan marcas reales sin autorización.
