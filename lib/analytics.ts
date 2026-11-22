/**
 * Tracking centralisé.
 *
 * 1. Mesure maison (toujours active) : chaque évènement est envoyé à l'app
 *    (app.getcomeback.fr/api/track), qui le range dans sa base. Aucun cookie,
 *    aucun identifiant stocké chez le visiteur, aucun outil tiers : pas de
 *    bannière nécessaire. Le résultat se lit dans l'admin de l'app, bloc
 *    « Acquisition ».
 * 2. Plausible / gtag, s'ils sont chargés un jour (voir app/layout.tsx).
 */

/** Identifiant de cette landing côté app (lib/acquisition.ts de l'app). */
export const LP_SITE = "foodtruck";

const TRACK_URL = "https://app.getcomeback.fr/api/track";

/** Évènements envoyés à l'app. Les autres restent réservés à Plausible. */
const APP_EVENTS = new Set<string>(["pageview", "cta_click", "scroll_75"]);

type EventName =
  | "pageview"
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

/**
 * Envoi à l'app. JSON en `text/plain` : requête « simple », donc sans
 * pré-requête CORS. `keepalive` laisse partir l'envoi même si la page est
 * quittée juste après (clic sur le bouton). Un échec est toujours silencieux.
 */
function sendToApp(name: EventName, props?: EventProps): void {
  if (!APP_EVENTS.has(name)) return;
  // En local, l'app refuserait l'origine : inutile d'envoyer.
  if (/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) return;
  try {
    const q = new URLSearchParams(window.location.search);
    const payload = {
      site: LP_SITE,
      event: name,
      position: typeof props?.position === "string" ? props.position : undefined,
      etape: q.get("etape") ?? undefined,
      utm_source: q.get("utm_source") ?? undefined,
      utm_medium: q.get("utm_medium") ?? undefined,
      utm_campaign: q.get("utm_campaign") ?? undefined,
      utm_content: q.get("utm_content") ?? undefined,
      referrer: document.referrer || undefined,
    };
    void fetch(TRACK_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
      keepalive: true,
      credentials: "omit",
    }).catch(() => {});
  } catch {
    /* la mesure ne doit jamais gêner la page */
  }
}

export function trackEvent(name: EventName, props?: EventProps): void {
  if (typeof window === "undefined") return;
  sendToApp(name, props);
  window.plausible?.(name, props ? { props } : undefined);
  window.gtag?.("event", name, props);
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, props ?? {});
  }
}
