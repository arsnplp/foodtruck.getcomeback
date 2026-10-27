"use client";

import { useEffect, useState } from "react";
import { OPEN_CONSENT_EVENT, readConsent, writeConsent, type ConsentValue } from "@/lib/consent";
import { META_PIXEL_ID } from "@/lib/metaPixel";

/**
 * Bannière cookies conforme aux recommandations CNIL :
 * - rien n'est déposé avant le choix ;
 * - « Refuser » aussi visible et aussi simple que « Accepter » ;
 * - choix modifiable à tout moment (lien « Cookies » du pied de page).
 * N'apparaît pas si aucun pixel n'est configuré (rien à consentir).
 */
export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    if (readConsent() !== null) return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);

    /* Affichée après un premier scroll ou 6 s, pour ne pas masquer l'offre
       et le bouton du premier écran. Rien n'est déposé en attendant. */
    const show = () => {
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
    const onScroll = () => {
      if (window.scrollY > 200) show();
    };
    const timer = window.setTimeout(show, 6000);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, []);

  if (!open) return null;

  const choose = (v: ConsentValue) => {
    writeConsent(v);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-text"
      className="fixed inset-x-3 top-3 z-50 mx-auto max-w-xl rounded-2xl bg-white p-3.5 shadow-card-lg ring-1 ring-ink/10 sm:bottom-4 sm:top-auto sm:p-5"
    >
      <p id="consent-title" className="sr-only">
        Cookies de mesure publicitaire
      </p>
      <p id="consent-text" className="text-sm text-ink-soft">
        Acceptez-vous le pixel Meta pour mesurer nos publicités Facebook et Instagram ? Modifiable à tout moment
        (lien « Cookies » en bas de page).{" "}
        <a href="https://getcomeback.fr/politique-confidentialite" className="underline underline-offset-2">
          En savoir plus
        </a>
      </p>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="min-h-11 rounded-full border-2 border-ink px-4 text-sm font-semibold text-ink"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="min-h-11 rounded-full border-2 border-ink bg-ink px-4 text-sm font-semibold text-white"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}

/** Lien du pied de page pour rouvrir la bannière. */
export function ConsentSettingsLink() {
  if (!META_PIXEL_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className="py-2 underline-offset-4 hover:underline"
    >
      Cookies
    </button>
  );
}
