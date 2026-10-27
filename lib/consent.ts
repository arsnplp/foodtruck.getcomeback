/**
 * Consentement cookies (règles CNIL) : le pixel Meta ne se charge qu'après
 * un « Accepter » explicite. Le choix est gardé 6 mois dans le navigateur,
 * puis redemandé. Refuser est aussi simple qu'accepter.
 */
export type ConsentValue = "granted" | "denied";

const KEY = "cb-consent";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182; // 6 mois
export const CONSENT_EVENT = "cb-consent-change";
export const OPEN_CONSENT_EVENT = "cb-consent-open";

export function readConsent(): ConsentValue | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const { v, t } = JSON.parse(raw) as { v: ConsentValue; t: number };
    if (Date.now() - t > MAX_AGE_MS) return null;
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(v: ConsentValue): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ v, t: Date.now() }));
  } catch {
    /* navigation privée : le choix vaut pour la visite en cours */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: v }));
}

export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}
