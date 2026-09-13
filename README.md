# Skillou Web

Client web Nuxt 3 pour Skillou, connecté à la même API Django + WebSocket que l'app mobile Flutter.

## Structure

- `app/pages` — routes de l'application
- `app/components` — composants réutilisables
- `app/layouts` — layouts Nuxt
- `app/stores` — stores Pinia (auth, profile, invitations, discussions)
- `app/composables` — composables (dont `useApi`)
- `app/types` — types TypeScript partagés

## Setup

```bash
npm install
cp .env.example .env
```

## Développement

```bash
npm run dev
```

Démarre sur `http://localhost:3000`, en pointant vers l'API définie par `NUXT_PUBLIC_API_BASE`.

## Configuration

L'URL de l'API backend est définie par la variable d'env `NUXT_PUBLIC_API_BASE` :

- **Local** : `http://localhost:8000` (valeur du `.env` local)
- **Production** : `https://api.skillou.com` — à définir dans le `.env` du VPS, référencé par `env_file` dans `docker-compose.yml`

## Production

```bash
npm run build
npm run preview
```

## Déploiement (Docker)

Le conteneur rejoint le réseau `traefik-net` (créé par le stack Traefik, séparé) — Traefik gère le TLS et le routing vers `skillou.com` / `www.skillou.com`, aucun port n'est publié sur l'hôte.

Sur le VPS, dans le dossier du projet :

```bash
git pull
docker compose build web
docker compose up -d web
```

Le `.env` du VPS (jamais commité, référencé par `env_file` dans `docker-compose.yml`) doit définir `NUXT_PUBLIC_API_BASE=https://api.skillou.com`.
