/**
 * Tracking centralisé, provider branchable (Plausible par défaut).
 * Aucun cookie, pas de bannière nécessaire.
 * Le script n'est chargé que si NEXT_PUBLIC_PLAUSIBLE_DOMAIN est défini
 * (voir components/seo/Analytics.tsx).
 */

type EventName =
  | "cta_click" // props: { position: "header" | "hero" | "calculator" | ... }
  | "calculator_used"
  | "lead_submitted"
  | "scroll_75";

type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (name: string, options?: { props?: EventProps }) => void;
    gtag?: (command: "event", name: string, params?: EventProps) => void;
  }
}

export function trackEvent(name: EventName, props?: EventProps): void {
  if (typeof window === "undefined") return;
  window.plausible?.(name, props ? { props } : undefined);
  window.gtag?.("event", name, props);
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, props ?? {});
  }
}
