/**
 * Plans tarifaires, alignés sur l'app (lib/plan-limits.ts et lib/trial.ts).
 *
 * Plus de plan gratuit affiché : tout commence par l'essai de 30 jours au
 * niveau Business (carte demandée, 0 € prélevé). Avant la fin, le
 * commerçant garde Business, bascule sur Pro ou résilie en un clic.
 *
 * Le claim « rentabilisé dès 2 clients fidélisés par mois » se base sur :
 * plan Business 29,99 €/mois ÷ panier moyen ~20 € = 1,5 visite.
 */
export type Plan = {
  name: string;
  price: number;
  /** Prix mensuel équivalent en formule annuelle (-20 %). */
  annualMonthly: number;
  /** Montant facturé une fois par an en formule annuelle. */
  annualTotal: number;
  period: string;
  /** Pour qui, en une ligne. */
  audience: string;
  description: string;
  features: string[];
  recommended: boolean;
};

/** "9,99" plutôt que "9.99" : affichage des prix à la française. */
export function formatPlanPrice(price: number): string {
  return price.toLocaleString("fr-FR", { minimumFractionDigits: price % 1 ? 2 : 0, maximumFractionDigits: 2 });
}

export const TRIAL_DAYS = 30;

export const plans: Plan[] = [
  {
    name: "Pro",
    price: 14.99,
    annualMonthly: 12,
    annualTotal: 144,
    period: "/mois TTC",
    audience: "Pour démarrer avec un petit fichier client",
    description: "Jusqu'à 300 clients inscrits sur votre carte.",
    features: [
      "300 clients inscrits",
      "10 000 notifications par mois",
      "3 comptes employés",
      "Relances automatiques des clients inactifs",
      "Ciblage par rang client et par inactivité",
      "Export CSV de votre fichier client",
      "Support email prioritaire",
    ],
    recommended: false,
  },
  {
    name: "Business",
    price: 29.99,
    annualMonthly: 24,
    annualTotal: 288,
    period: "/mois TTC",
    audience: "Pour un commerce avec du passage tous les jours",
    description: "Sans limite de clients ni de notifications. Le plan de l'essai.",
    features: [
      "Clients inscrits illimités",
      "Notifications illimitées",
      "Comptes employés illimités",
      "Relances automatiques des clients inactifs",
      "Ciblage par rang client et par inactivité",
      "Export CSV de votre fichier client",
      "Support dédié, réponse sous 4 h",
    ],
    recommended: true,
  },
];

/** Inclus dans les deux plans : ce qui fait la différence au quotidien. */
export const includedEverywhere: { title: string; text: string }[] = [
  {
    title: "Installation faite avec vous",
    text: "Après l'inscription, on vous appelle pour régler votre carte. 10 minutes, offert.",
  },
  {
    title: "Affiche de comptoir prête à imprimer",
    text: "Une affiche A4 avec votre QR code, générée à vos couleurs.",
  },
  {
    title: "Apple Wallet et Google Wallet",
    text: "Vos clients ajoutent la carte en un scan, sans télécharger d'application.",
  },
  {
    title: "Notifications sur l'écran verrouillé",
    text: "Récompense disponible, offre du jour, jour creux : vous les prévenez en 2 clics.",
  },
  {
    title: "Carte qui s'affiche près de chez vous",
    text: "Sur iPhone, la carte remonte quand le client passe à moins de 100 mètres.",
  },
  {
    title: "Mini-jeux",
    text: "Roue de la fortune, carte à gratter, coffres mystère : vos clients jouent leurs points.",
  },
  {
    title: "Parrainage client",
    text: "Vos clients fidèles font venir leurs proches, et sont récompensés.",
  },
  {
    title: "Vos données vous appartiennent",
    text: "Fichier client exportable à tout moment, conforme au RGPD.",
  },
];
