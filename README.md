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

Démarre sur `http://localhost:3000`, en pointant vers l'API définie par `NUXT_PUBLIC_API_BASE` (par défaut `http://localhost:8000`).

## Production

```bash
npm run build
npm run preview
```
