"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Chiffre qui monte de 0 à sa valeur au chargement. Le rendu serveur affiche
 * déjà la valeur finale : sans JS (ou avec moins d'animations), rien ne change.
 */
export function CountUp({ to, prefix = "", suffix = "", duration = 1200 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(to);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const t0 = performance.now() + 350;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / duration));
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    setValue(0);
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return (
    <span>
      <span className="sr-only">
        {prefix}
        {to}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {value}
        {suffix}
      </span>
    </span>
  );
}
