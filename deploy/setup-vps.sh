#!/usr/bin/env bash
# Mise en ligne de foodtruck.getcomeback.fr sur le VPS (à lancer en root).
# Ne modifie aucune config nginx existante : crée seulement un nouveau site.
# Prérequis : l'enregistrement DNS A "foodtruck" -> 217.65.144.174 existe.
set -euo pipefail

DOMAIN="foodtruck.getcomeback.fr"
DIR="/var/www/foodtruck.getcomeback"
REPO="https://github.com/arsnplp/foodtruck.getcomeback.git"
CONF="/etc/nginx/sites-available/$DOMAIN"

# 1. Code + build statique (dossier out/)
if [ -d "$DIR/.git" ]; then
  git -C "$DIR" pull --ff-only
else
  git clone "$REPO" "$DIR"
fi
cd "$DIR"
npm ci --no-audit --no-fund
npm run build

# 2. Site nginx (créé une seule fois, jamais écrasé)
if [ ! -f "$CONF" ]; then
  cat > "$CONF" <<NGINX
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN;

    root $DIR/out;
    index index.html;

    gzip on;
    gzip_types text/css application/javascript image/svg+xml application/json;

    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files \$uri =404;
    }

    location / {
        try_files \$uri \$uri/ \$uri.html =404;
    }
}
NGINX
  ln -sf "$CONF" "/etc/nginx/sites-enabled/$DOMAIN"
fi

# 3. Vérification puis rechargement (rien n'est rechargé si la config est fausse)
nginx -t
systemctl reload nginx

# 4. HTTPS
certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m arsene.lecoq@getcomeback.fr --redirect

echo "OK : https://$DOMAIN"
