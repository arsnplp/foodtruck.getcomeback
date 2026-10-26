"use client";

import { useEffect } from "react";

/**
 * Effets au scroll, sans librairie :
 * - ajoute la classe `fx` sur <html> (le contenu reste visible sans JS) ;
 * - passe `.in` sur chaque [data-reveal] quand il entre à l'écran ;
 * - parallaxe douce du visuel du hero ([data-parallax]).
 * Rien ne bouge si l'utilisateur a demandé moins d'animations.
 */
export function ScrollFx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    root.classList.add("fx");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        for (const el of parallax) {
          const speed = Number(el.dataset.parallax) || 0.1;
          el.style.transform = `translate3d(0, ${Math.min(y, 900) * speed}px, 0)`;
        }
        ticking = false;
      });
    };
    if (parallax.length) window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
