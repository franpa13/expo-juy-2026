import type { NextConfig } from "next";

/**
 * `STATIC_EXPORT=1 npm run build` emite el sitio como HTML plano en `out/`,
 * para publicarlo en cualquier hosting estático (GitHub Pages, Netlify, un
 * bucket) sin servidor Node. Queda detrás de una variable de entorno porque
 * la exportación obliga a servir las imágenes sin optimizar: en Vercel, que
 * ejecuta Next de forma nativa, conviene el build normal.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isStaticExport
  ? { output: "export", images: { unoptimized: true } }
  : {};

export default nextConfig;
