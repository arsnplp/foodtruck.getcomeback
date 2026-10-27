import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { MetaPixel } from "@/components/lp/MetaPixel";
import { ConsentBanner } from "@/components/lp/ConsentBanner";
import "./globals.css";

/* Fontes auto-hébergées, identiques à getcomeback.fr : zéro requête externe */
const bricolage = localFont({
  src: "./fonts/bricolage-grotesque-latin.woff2",
  weight: "200 800",
  variable: "--font-bricolage",
  display: "swap",
});

const figtree = localFont({
  src: "./fonts/figtree-latin.woff2",
  weight: "300 900",
  variable: "--font-figtree",
  display: "swap",
});

const URL_LP = "https://foodtruck.getcomeback.fr";
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const TITLE = "Carte de fidélité pour food truck | Comeback";
const DESCRIPTION =
  "Faites revenir vos clients plus souvent : votre plat du jour et vos offres sur leur écran verrouillé. 30 jours gratuits, 0 € aujourd'hui.";

export const metadata: Metadata = {
  metadataBase: new URL(URL_LP),
  title: TITLE,
  description: DESCRIPTION,
  /* Landing réservée aux pubs : ne pas concurrencer getcomeback.fr/carte-fidelite/food-truck */
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL_LP,
    siteName: "Comeback",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Comeback, la carte de fidélité dans le Wallet" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bricolage.variable} ${figtree.variable}`} suppressHydrationWarning>
      <head>
        {/* Mode « formulaire instantané » : ?etape=derniere affiche « Dernière étape »
            avant le premier rendu (pas de saut de mise en page). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(/[?&]etape=derniere(&|$)/.test(location.search))document.documentElement.setAttribute("data-etape","derniere")`,
          }}
        />
        {/* Mesure d'audience sans cookie (pas de consentement requis) : activée si
            NEXT_PUBLIC_PLAUSIBLE_DOMAIN est défini au build. */}
        {PLAUSIBLE_DOMAIN && <Script defer data-domain={PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" strategy="afterInteractive" />}
      </head>
      <body>
        {children}
        <MetaPixel />
        <ConsentBanner />
      </body>
    </html>
  );
}
