# Dónde puede destacar ExpoJuy 2026

**Desafío Digital ExpoJuy 2026 · Revisión competitiva**
Repo `franpa13/expo-juy-2026` · commit `4ff642f` · Stack Next.js 16 · React 19 · Tailwind 4
Revisado el **2 de septiembre de 2026**.

> **Cierre de presentación: 8 de septiembre, 23:59 hs.** Todo lo que sigue está
> filtrado por lo que entra en ese plazo.

Migrado desde el proyecto de claude.ai **"ExpoJujuy2026"** el 2026-09-06.
Página publicada: https://claude.ai/code/artifact/8f534a9b-a87e-46d4-8bd7-00708a256a98

## La lectura corta

El prototipo ya está por encima del promedio de la categoría en oficio técnico y
en una funcionalidad concreta: el **planificador de agenda que detecta choques de
horario**. Ninguno de los cuatro sitios de referencia tiene algo equivalente.

El problema no es de calidad, es de *foco de la narrativa*. Hoy el sitio se lee
como "una feria bien hecha": nueve secciones correctas, todas al mismo nivel de
énfasis. Un jurado que mira seis o diez propuestas en una tarde no recuerda un
sitio completo, recuerda **una idea**. Y falta una funcionalidad que las bases
listan como mínima — entradas — que es justamente la pieza que puede convertirse
en esa idea.

## Qué hace la categoría

Relevamiento de los cuatro sitios que las Consignas Técnicas (punto 10) proponen
como referencia, contra el estado actual del prototipo.

Leyenda: ● completo · ◐ parcial o rudimentario · ○ ausente · **○** ausente y exigido por las bases

| Funcionalidad | Prototipo | ExpoJuy 2024 | Argentina Mining | Expo Industrias | Expo Logisti-k |
|---|---|---|---|---|---|
| Catálogo de expositores | ● | ◐ | ● | ● | ● |
| Buscador / filtro por rubro | ● | ○ | ● | ○ | ◐ |
| Ficha individual de expositor | **○** | ○ | ● | ○ | ● |
| Agenda / cronograma | ● | ◐ | ● | ● | ● |
| **Itinerario personal sin choques** | **●** | ○ | ○ | ○ | ○ |
| Plano del predio | ◐ | ○ | ◐ | ○ | ● |
| Acreditación / entradas online | **○** | ◐ | ● | ● | ● |
| Matchmaking / rueda de negocios | ○ | ○ | ● | ◐ | ○ |
| Noticias / novedades | ● | ◐ | ● | ● | ● |
| Sponsors por tier | ● | ◐ | ● | ● | ● |
| Multiidioma | ○ | ○ | ◐ | ○ | ● |
| Galería de ediciones anteriores | ○ | ● | ● | ● | ● |
| Kit de prensa / difusión | ○ | ○ | ○ | ● | ● |
| Modo oscuro | ● | ○ | ○ | ○ | ○ |

Dos lecturas salen de la tabla. La primera: **acreditación online es piso de
categoría** — los cuatro la tienen de alguna forma, y el Anexo II la lista como
mínima. Es el único casillero donde el prototipo está por debajo del piso. La
segunda: **la columna del itinerario personal está vacía en toda la fila de
referencia**. Ahí hay aire.

## Estado del prototipo

**Fortaleza · Planificador de agenda sin superposición.** El visitante elige
rubros de interés y el sistema arma un itinerario descartando charlas que se
pisan. Está construido, testeado (`planner.test.ts`) y es el único diferencial
funcional real hoy.

**Fortaleza · Los datos ya están cruzados.** Cada expositor tiene rubro y número
de stand; cada charla tiene rubro y expositor. El modelo permite ir de una charla
al stand en el plano sin agregar nada nuevo — todavía no se aprovecha en la
interfaz.

**Obligatorio · Entradas / acreditación.** No hay sección ni página. Está en el
Anexo II de las Bases como funcionalidad mínima y lo tienen los cuatro sitios de
referencia. Es el hueco que hay que tapar sí o sí.

**Flojo · El plano del predio.** Hoy es una grilla de doce rectángulos de colores,
A1 a D3. Funciona como demo de interacción pero no se lee como un predio. La
Ciudad Cultural tiene una planta reconocible: dibujarla, aunque sea esquemática,
cambia por completo la percepción de la sección.

**Flojo · La imagen del hero.** Es un bloque degradado abstracto de relleno. Es
lo primero que ve el jurado y es el elemento menos trabajado del sitio. Hay video
real de ExpoJuy en `public/videos`, ya usado en la banda de estadísticas — el
hero pide ese mismo material.

**Flojo · Los números de la banda de estadísticas.** Muestra "12 expositores ·
8 speakers", que son los registros de prueba. En una feria que en 2024 fue la
16.ª edición del norte argentino, ese número contradice el relato. O se usan
cifras reales de la edición anterior, o la banda cuenta otra cosa.

## La apuesta: "Mi ExpoJuy" — el itinerario personal *es* la entrada

En vez de agregar una sección de entradas al lado de las otras nueve,
convertirla en el destino del planificador que ya existe. El visitante elige sus
rubros, el sistema arma su recorrido de cuatro días, y ese recorrido se acredita:
un pase con QR que lleva adentro su agenda y sus stands marcados en el plano.

```
  Elegís tus rubros  →  Itinerario sin choques  →  Pase acreditado  →  ┬→ Agenda
  minería · turismo     4 días, sin superposición   QR con tu agenda   ├→ Expositores
  · agro…               (YA EXISTE)                 adentro (FALTA)    └→ Plano del predio
                                                                          (las tres se
                                                                          filtran por tu pase)
```

El movimiento es barato y el efecto es grande: **ya está construido el 60 %**. Lo
que falta es la pantalla de acreditación, el objeto "pase" y hacer que expositores
y plano lean ese pase para resaltar lo tuyo. Para el mockup del entregable, ni
siquiera hace falta que funcione de verdad.

| Por qué | |
|---|---|
| **Tapa el hueco** | Cumple la funcionalidad mínima de entradas del Anexo II sin agregar una sección genérica más. |
| **Nadie lo tiene** | Argentina Mining cobra USD 600 por el networking; los otros tres acreditan con un formulario suelto. Ninguno conecta acreditación con recorrido. |
| **Da una frase** | "El sitio no te informa de la feria, te arma tu feria." Eso es lo que el jurado repite en la deliberación. |
| **Puntúa donde se evalúa** | Toca cuatro criterios del punto 11 a la vez: experiencia de usuario, arquitectura de información, innovación y factibilidad técnica. |

## Segundo nivel

Tres apuestas menores, ordenadas por relación esfuerzo/impacto. Ninguna compite
con la principal; la acompañan.

**Bilingüe ES / EN** *(alto impacto, bajo esfuerzo)* — El eslogan del propio
sitio es "Conectando países" y hay expositores de Chile y Paraguay en los datos.
Logisti-k tiene tres idiomas; ExpoJuy no tiene ninguno. Un selector de idioma es
de las señales institucionales más baratas que existen.

**Rueda de negocios digital** *(alineado con el evento)* — La agenda ya incluye
una "Rueda de Negocios Internacional" como actividad presencial, sin ningún
soporte digital. Un formulario para solicitar reunión B2B con un expositor cae
exactamente en el valor "vinculación empresarial" que las consignas nombran.

**Accesibilidad declarada** *(puntúa dos veces)* — Aparece como criterio en las
Bases y en las Consignas, y ninguno de los cuatro referentes la trabaja. Una
página de declaración de accesibilidad — contraste AA, navegación por teclado,
`prefers-reduced-motion` — es visible, verificable y respalda la memoria
descriptiva.

## Riesgos de credibilidad

**El asistente conversacional.** Hoy es coincidencia de palabras clave sobre seis
respuestas fijas (`assistant/lib/script.ts`). Presentarlo como "asistente con IA"
ante un jurado técnico es un riesgo innecesario: o se conecta a un modelo real
— el Artículo 11 lo permite y lo valora — o se lo llama por lo que es, un buscador
de respuestas frecuentes. La declaración de uso de IA es obligatoria y el jurado
la va a leer.

**El repo no reemplaza al mockup.** El punto 4.1 es explícito: el desarrollo
funcional en GitHub es *opcional* y **no otorga ventaja en la evaluación**. El
entregable central del Anexo III sigue siendo el mockup navegable. Presentar solo
el repo es entregar lo accesorio.

**Kit de Diseño oficial.** La organización publica logotipos, paleta
institucional y tipografías en un Drive, y puede actualizarlos durante el
concurso. Conviene verificar que el violeta `#820cd0` y las fuentes actuales
coincidan antes de congelar el mockup: la identidad institucional es criterio de
evaluación en las Bases.

## Plan de seis días

1. **Mockup primero.** Trasladar las pantallas actuales a Figma y diseñar ahí las
   tres nuevas: acreditación, pase y plano marcado. Es el entregable que se evalúa.
2. **Flujo "Mi ExpoJuy".** Diseñar el recorrido completo de punta a punta,
   incluido el estado del plano y del catálogo cuando ya tenés pase.
3. **Plano real y hero.** Redibujar el predio con una planta reconocible y
   reemplazar el degradado del hero por material real de la feria.
4. **Memoria descriptiva.** Los ocho puntos del apartado 4.2, con "Mi ExpoJuy"
   como concepto rector y las estrategias de accesibilidad y responsive escritas.
5. **Declaración de IA y README.** Qué herramienta, para qué tarea, con qué
   criterio. Y las instrucciones de ejecución si se comparte el repo.
6. **Revisión y envío.** Contraste, teclado, móvil, links del formulario. Enviar
   el 7, no el 8: el sistema registra fecha y hora.

---

**Fuentes:** BASES Y CONDICIONES.pdf y CONSIGNAS TÉCNICAS DEL DESAFÍO.pdf
(organización del desafío) · relevamiento de expojuy.camcomexjujuy.com.ar,
argentinaminingonline.com, expoindustrias.com.ar y expologisti-k.com.ar ·
inspección del repositorio `franpa13/expo-juy-2026` en el commit `4ff642f`,
ejecutado localmente para revisión visual.
