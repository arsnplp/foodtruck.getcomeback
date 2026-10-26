import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Landing statique : `next build` génère le dossier `out/`, servi tel quel
 * par nginx sur foodtruck.getcomeback.fr. Aucun serveur Node à faire tourner.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  outputFileTracingRoot: __dirname,
  images: { unoptimized: true },
};

export default nextConfig;
