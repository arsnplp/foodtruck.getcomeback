import type { ReactNode } from "react";

/**
 * Pictogrammes maison — trait 1.8, bouts ronds, grille 24×24.
 * Même langage graphique que le motif tampon (Stamps.tsx) et que les
 * icônes de la section Bénéfices. Toute nouvelle icône s'ajoute ICI,
 * jamais depuis un pack externe, pour garder l'harmonie du site.
 */
const icons = {
  /* --- Produit --- */
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
  qr: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1.2" />
      <rect x="14" y="4" width="6" height="6" rx="1.2" />
      <rect x="4" y="14" width="6" height="6" rx="1.2" />
      <path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20v.01" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
      <path d="M7 12h10" />
    </>
  ),
  smartphone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 17.5h2" />
    </>
  ),
  bell: (
    <>
      <path d="M12 4a6 6 0 0 0-6 6v3l-1.5 3h15L18 13v-3a6 6 0 0 0-6-6Z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M12 11v9" />
      <path d="M12 11C9.5 11 7 10.2 7 8.3a1.9 1.9 0 0 1 3.6-.8c.6.9 1.4 2.3 1.4 3.5Zm0 0c2.5 0 5-.8 5-2.7a1.9 1.9 0 0 0-3.6-.8c-.6.9-1.4 2.3-1.4 3.5Z" />
    </>
  ),
  send: (
    <>
      <path d="m4 11 16-7-5.5 16-3-6.5L4 11Z" />
      <path d="M11.5 13.5 20 4" />
    </>
  ),
  megaphone: (
    <>
      <path d="M4 11v3l10 4V6L4 11Z" />
      <path d="M14 8.5c2 .5 3 1.5 3 3s-1 2.5-3 3" />
      <path d="M6 15.5V18a1.5 1.5 0 0 0 3 0v-1.4" />
    </>
  ),
  /* --- Chiffres & données --- */
  chart: <path d="M4 19V9m5.3 10V5m5.4 14v-8m5.3 8V11" />,
  trend: (
    <>
      <path d="m4 17 5.5-5.5 3.5 3.5L20 8" />
      <path d="M15 8h5v5" />
    </>
  ),
  euro: (
    <>
      <path d="M17.5 6.5a7 7 0 1 0 0 11" />
      <path d="M4.5 10.5h9m-9 3h8" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9.5" r="2.5" />
      <path d="M15.5 14.5a4.5 4.5 0 0 1 5 4.5" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v10m0 0 4-4m-4 4-4-4" />
      <path d="M5 19h14" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  /* --- Confiance & réassurance --- */
  shield: (
    <>
      <path d="M12 3.5 5 6v5.5c0 4.4 3 7.6 7 9 4-1.4 7-4.6 7-9V6l-7-2.5Z" />
      <path d="m9 12 2.2 2.2 4.3-4.7" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5V17" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.2-3.8-8.5s1.3-6.2 3.8-8.5Z" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.5 12.5 2.4 2.4 4.8-5.3" />
    </>
  ),
  xCircle: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m9.5 9.5 5 5m0-5-5 5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  zap: <path d="M13 3 5 13.5h5L11 21l8-10.5h-5L13 3Z" />,
  spark: <path d="M12 4c.6 3.8 2.2 5.4 6 6-3.8.6-5.4 2.2-6 6-.6-3.8-2.2-5.4-6-6 3.8-.6 5.4-2.2 6-6Z" />,
  star: <path d="m12 4 2.3 4.9 5.2.7-3.8 3.7.9 5.2L12 16l-4.6 2.5.9-5.2L4.5 9.6l5.2-.7L12 4Z" />,
  heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.2 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />,
  leaf: (
    <>
      <path d="M6 20c8 0 13-5 13-14-9 0-14 5-14 13" />
      <path d="M6 20c0-6 3-10 8-12" />
    </>
  ),
  repeat: (
    <>
      <path d="M4 12a8 8 0 0 1 13.6-5.7L20 8.5M20 4v4.5h-4.5" />
      <path d="M20 12a8 8 0 0 1-13.6 5.7L4 15.5M4 20v-4.5h4.5" />
    </>
  ),
  sliders: (
    <>
      <path d="M5 6h2m4 0h8M5 12h8m4 0h2M5 18h1m4 0h9" />
      <circle cx="9" cy="6" r="2" />
      <circle cx="15" cy="12" r="2" />
      <circle cx="8" cy="18" r="2" />
    </>
  ),
  /* --- Contact & entreprise --- */
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M5 4h4l1.5 4L8 9.5a12 12 0 0 0 6.5 6.5l1.5-2.5 4 1.5v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  message: (
    <>
      <path d="M20 14.5a2.5 2.5 0 0 1-2.5 2.5H9l-5 4V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8Z" />
      <path d="M8.5 9h7M8.5 12.5h4.5" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-6.5-5.3-6.5-10a6.5 6.5 0 0 1 13 0c0 4.7-6.5 10-6.5 10Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 10h17M8 3v4m8-4v4" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
    </>
  ),
  arrowRight: <path d="M4 12h16m-6-6 6 6-6 6" />,
  /* --- Secteurs --- */
  utensils: (
    <>
      <path d="M7 3v7a2 2 0 0 0 2 2 2 2 0 0 0 2-2V3" />
      <path d="M9 12v9" />
      <path d="M17 3c-1.7 1.9-2.5 4.4-2.5 7 0 1.7 1 2.5 2.5 2.5V21" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <path d="M8.7 8.2 20 19M20 5 8.7 15.8" />
    </>
  ),
  bread: (
    <>
      <path d="M4 13c0-4 3.5-7 8-7s8 3 8 7v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4Z" />
      <path d="M9 10.5v4m3-4v4m3-4v4" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </>
  ),
  coffee: (
    <>
      <path d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9Z" />
      <path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8.5 3.5v2M12 3.5v2" />
    </>
  ),
  truck: (
    <>
      <rect x="3" y="6.5" width="11" height="9.5" rx="1.5" />
      <path d="M14 10h3.5L20 13v3h-6" />
      <circle cx="7.5" cy="18" r="1.8" />
      <circle cx="16.5" cy="18" r="1.8" />
    </>
  ),
  store: (
    <>
      <path d="M5.5 10V20h13V10" />
      <path d="M4 9.5 6 4h12l2 5.5" />
      <path d="M10 20v-5.5h4V20" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="1.5" />
      <path d="M9 8.5h1.5M13.5 8.5H15M9 12h1.5M13.5 12H15M10.5 21v-4h3v4" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

type IconTileProps = {
  name: IconName;
  /** leaf = fond clair (défaut) · gold = accent · dark = sections sombres */
  tone?: "leaf" | "gold" | "dark";
  className?: string;
};

/** Tuile d'icône — le conteneur standard des grilles de bénéfices/fonctionnalités. */
export function IconTile({ name, tone = "leaf", className = "" }: IconTileProps) {
  const tones = {
    leaf: "bg-leaf-50 text-leaf-700 ring-1 ring-leaf-200",
    gold: "bg-gold-100 text-gold-700 ring-1 ring-gold-300",
    dark: "bg-white/10 text-leaf-100 ring-1 ring-white/15",
  }[tone];

  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110 ${tones} ${className}`}
    >
      <Icon name={name} />
    </span>
  );
}
