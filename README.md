# Incredible India

A small tourist-places website built with React, TypeScript and Vite.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Features

- Browse 9 famous places across India
- Search by name, state or description
- Filter by category (Heritage, Nature, Beach, Spiritual, Adventure)
- Place detail pages with best time to visit and highlights
- Save favourites (stored in the browser's localStorage)

## Structure

```
src/
  app/            App, router, providers
  components/     ui, layout, shared building blocks
  features/       home, places (api, components, data, hooks, pages)
  lib/            api client, endpoints, utilities
  types/          shared TypeScript types
  styles/         global.css
```

## Connecting a real backend later

`src/features/places/api/placesApi.ts` currently reads local data.
Swap its body for `apiFetch(ENDPOINTS.places)` and set `VITE_API_BASE_URL` in `.env`.
