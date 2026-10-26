/**
 * Pixel Meta : ne fait rien tant que NEXT_PUBLIC_META_PIXEL_ID n'est pas
 * défini au moment du build (voir components/lp/MetaPixel.tsx).
 * Le vrai événement de conversion (démarrage d'essai) sera envoyé par l'app.
 */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

export function trackMetaLead(position: string): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "Lead", { content_name: "lp-food-truck", position });
}
