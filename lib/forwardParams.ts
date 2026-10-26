import { SIGNUP_URL } from "@/lib/links";

/** Paramètres de la pub transmis à l'inscription. */
const FORWARDED = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"] as const;

/**
 * Construit le lien d'inscription en y ajoutant les UTM et le fbclid de la
 * landing. `plan=free` est toujours conservé (et remis s'il manquait).
 */
export function buildSignupUrl(search: string): string {
  const url = new URL(SIGNUP_URL);
  const incoming = new URLSearchParams(search);
  for (const key of FORWARDED) {
    const value = incoming.get(key);
    if (value) url.searchParams.set(key, value);
  }
  url.searchParams.set("plan", "free");
  return url.toString();
}
