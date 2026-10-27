/**
 * Pixel Meta, chargé uniquement :
 * - si NEXT_PUBLIC_META_PIXEL_ID est défini au moment du build ;
 * - et après que le visiteur a accepté les cookies (lib/consent.ts).
 * PageView au chargement, Lead au clic sur le CTA. Le vrai événement de
 * conversion (StartTrial) est envoyé par l'app après l'inscription.
 */
declare global {
  interface Window {
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[] };
    _fbq?: unknown;
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

let loaded = false;

export function loadMetaPixel(): void {
  if (loaded || !META_PIXEL_ID || typeof window === "undefined") return;
  loaded = true;

  /* Snippet officiel Meta, réécrit sans eval */
  const queue: unknown[][] = [];
  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) (fbq.callMethod as (...a: unknown[]) => void)(...args);
    else queue.push(args);
  }) as NonNullable<Window["fbq"]> & { push?: unknown; loaded?: boolean; version?: string };
  fbq.queue = queue;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;

  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/fr_FR/fbevents.js";
  document.head.appendChild(s);

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

export function trackMetaLead(position: string): void {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", "Lead", { content_name: "lp-food-truck", position });
}
