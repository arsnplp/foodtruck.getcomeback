"use client";

import { useEffect, useState } from "react";
import { LpCTA } from "@/components/lp/LpCTA";
import { CTA_REASSURANCE } from "@/lib/links";

/**
 * Barre CTA collante sur mobile : apparaît quand le hero sort de l'écran,
 * se cache quand le CTA final est visible.
 */
export function StickyCTA() {
  const [heroGone, setHeroGone] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const final = document.getElementById("cta-final");
    if (!hero || !final || !("IntersectionObserver" in window)) return;

    const heroObs = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting && e.boundingClientRect.top < 0));
    const finalObs = new IntersectionObserver(([e]) => setFinalVisible(e.isIntersecting), { rootMargin: "0px 0px 120px 0px" });
    heroObs.observe(hero);
    finalObs.observe(final);
    return () => {
      heroObs.disconnect();
      finalObs.disconnect();
    };
  }, []);

  const visible = heroGone && !finalVisible;

  return (
    <div
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <LpCTA position="lp-ft-sticky" size="lg" className="w-full" />
      <p className="mt-1.5 text-center text-xs text-ink-soft">{CTA_REASSURANCE}</p>
    </div>
  );
}
