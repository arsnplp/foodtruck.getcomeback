"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/* Une seule page vue par chargement, même si React monte deux fois en dev. */
let pageviewSent = false;

/**
 * Mesure maison de la landing : une page vue au chargement, puis
 * « scroll_75 » la première fois que le visiteur a parcouru les trois quarts
 * de la page. Le clic sur le bouton est envoyé par LpCTA.
 */
export function Tracker() {
  useEffect(() => {
    if (!pageviewSent) {
      pageviewSent = true;
      trackEvent("pageview");
    }

    let done = false;
    const onScroll = () => {
      if (done) return;
      const doc = document.documentElement;
      const seen = (window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1);
      if (seen >= 0.75) {
        done = true;
        trackEvent("scroll_75");
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
