# foodtruck.getcomeback.fr

Landing page des Meta Ads food truck de Comeback. Page unique, statique,
un seul CTA (« Créer ma carte gratuitement ») vers
`https://app.getcomeback.fr/signup?plan=free`, avec les `utm_*` et le
`fbclid` de la pub transmis à l'inscription.

Design, fontes, composants et prix repris de `arsnplp/comebacksite`.

## Modifier les textes

- Titre du hero (à caler mot pour mot sur la pub) : `HERO_TITLE` en haut de
  `app/page.tsx`. Sous-titre et titre final juste en dessous.
- Prix : `content/pricing.ts` (copie de celui de comebacksite). Quand la
  nouvelle grille passe en ligne sur getcomeback.fr, mettre ce fichier à jour
  ici aussi.
- Libellé, lien et réassurance du CTA : `lib/links.ts`.
- Vrais témoignages : tableau `testimonials` dans `components/lp/ProofSlot.tsx`
  (rien ne s'affiche tant qu'il est vide).

## Règles

Pas de tiret cadratin, pas de témoignage ni de chiffre inventé, un seul type
de bouton, aucune navigation sortante hors mentions légales et
confidentialité. Page en `noindex, nofollow` et `robots.txt` en
`Disallow: /` (sauf robots Meta, qui vérifient la page des annonces).

## Mesure (pixel Meta, cookies, audience)

Les identifiants se mettent dans `/var/www/foodtruck.getcomeback/.env.local`
sur le VPS (jamais dans le dépôt), puis on relance le script de déploiement :

```
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
# optionnel, mesure d'audience sans cookie :
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=foodtruck.getcomeback.fr
```

- Pixel Meta : chargé uniquement après « Accepter » dans la bannière cookies
  (`components/lp/ConsentBanner.tsx`). `PageView` au chargement, `Lead` au clic
  sur le CTA. Sans ID, ni pixel ni bannière.
- Bannière : apparaît après un premier scroll ou 6 s, Refuser = Accepter en
  visibilité, choix gardé 6 mois, modifiable via « Cookies » en pied de page.
- La vraie conversion (`StartTrial`) doit être envoyée par l'app après
  l'inscription, via l'API Conversions. Les paramètres `fbclid` et `utm_*` de
  la pub sont transmis à `app.getcomeback.fr/signup` pour ça.

## Formulaires instantanés Meta

Mettre `https://foodtruck.getcomeback.fr/?etape=derniere` comme lien final du
formulaire : la page affiche « Merci, demande bien reçue ! Dernière étape… ».

## Build et déploiement

```bash
npm ci
npm run build        # génère out/ (site 100 % statique)
```

Sur le VPS, nginx sert directement le dossier `out/` :

```bash
cd /var/www/foodtruck.getcomeback && git pull && npm ci && npm run build
```

Aucun process Node à faire tourner (pas de PM2).
