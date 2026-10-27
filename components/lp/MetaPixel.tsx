"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";
import { META_PIXEL_ID, loadMetaPixel } from "@/lib/metaPixel";

/** Charge le pixel Meta dès que (et seulement si) le visiteur a accepté. */
export function MetaPixel() {
  useEffect(() => {
    if (!META_PIXEL_ID) return;
    if (readConsent() === "granted") loadMetaPixel();
    const onChange = (e: Event) => {
      if ((e as CustomEvent).detail === "granted") loadMetaPixel();
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return null;
}
