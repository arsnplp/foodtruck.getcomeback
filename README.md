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

## Pixel Meta

Définir `NEXT_PUBLIC_META_PIXEL_ID` au moment du build (fichier `.env.local`
sur le serveur), puis rebuild. Sans cette variable, rien n'est chargé.
`PageView` au chargement, `Lead` au clic sur le CTA.

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
