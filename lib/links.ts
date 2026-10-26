/**
 * Liens vers l'application, centralisés ici pour qu'un seul endroit
 * décide où mènent les CTA.
 *
 * `plan=free` ouvre la création de compte avec l'essai de 30 jours au
 * niveau Business (carte demandée, 0 € prélevé). Sans ce paramètre, la page
 * d'inscription de l'app renvoie vers ses tarifs : ne jamais l'enlever.
 */
export const SIGNUP_URL = "https://app.getcomeback.fr/signup?plan=free";

/** Connexion des commerçants déjà inscrits (lien de navigation, pas un CTA). */
export const LOGIN_URL = "https://app.getcomeback.fr/login";

/** Libellé unique du CTA, identique sur tout le site. */
export const CTA_LABEL = "Créer ma carte gratuitement";

/** Réassurance affichée sous le CTA, identique partout. */
export const CTA_REASSURANCE = "30 jours gratuits · 0 € aujourd'hui · Résiliable en 1 clic";

/** Prix des plans, alignés sur l'app (lib/plan-limits.ts côté app). */
export const BUSINESS_PRICE_LABEL = "39,99 €";
