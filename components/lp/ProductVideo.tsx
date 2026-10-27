"use client";

import { useRef, useState } from "react";

/**
 * Vidéo produit, chargée seulement au clic (rien n'est téléchargé avant).
 * Pour l'activer : déposer un VRAI enregistrement d'écran de l'app
 * (30 à 60 s, mp4 H.264, 720p, < 8 Mo) dans public/demo.mp4 et son image
 * d'aperçu dans public/demo-poster.jpg, puis passer DEMO_VIDEO à true.
 */
export const DEMO_VIDEO = false;

export function ProductVideo() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  if (!DEMO_VIDEO) return null;

  return (
    <div className="relative mx-auto mt-12 aspect-video w-full max-w-3xl overflow-hidden rounded-[1.75rem] bg-ink shadow-card-lg">
      {playing ? (
        <video
          ref={ref}
          src="/demo.mp4"
          poster="/demo-poster.jpg"
          controls
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative block h-full w-full"
          aria-label="Lire la vidéo de démonstration"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/demo-poster.jpg" alt="" loading="lazy" className="h-full w-full object-cover opacity-90" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-ink bg-gold-400 shadow-[0_5px_0_var(--color-ink)] transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" aria-hidden="true">
                <path d="M7 4.5v15l12-7.5-12-7.5Z" fill="currentColor" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
