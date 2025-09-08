# Next.js Learning Project – Anime Explorer

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap)
![API](https://img.shields.io/badge/API-Jikan%20(v4)-blue)
![Status](https://img.shields.io/badge/Purpose-Learning-success)

A hands-on learning project to explore modern Next.js App Router patterns using the Jikan (MyAnimeList) API. The main focus is understanding how Next.js differs from plain React and how it simplifies real-world app flows.

---

## Table of Contents
- [Goals](#goals)
- [Key Learnings](#key-learnings)
  - [Server vs Client Components](#server-vs-client-components)
  - [URLSearchParams over useState](#urlsearchparams-over-usestate)
  - [Pagination, Skeletons, and Filters](#pagination-skeletons-and-filters)
  - [Static, Dynamic, and Streaming Rendering](#static-dynamic-and-streaming-rendering)
  - [Error Handling and Resets](#error-handling-and-resets)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [How to Run](#how-to-run)
- [API Reference](#api-reference)
- [APIs and References](#apis-and-references)
- [Credits & Disclaimer](#credits--disclaimer)

---

## Goals
1. Learn the App Router mindset in Next.js (layouts, server-first, routing).
2. Practice data-fetching patterns and URL-driven state (no heavy client state).
3. Implement practical UI features: search, filters, pagination, skeleton loading.
4. Understand rendering strategies: static, dynamic, streaming.
5. Handle errors gracefully with error and not-found routes.

---

## Key Learnings

### Server vs Client Components
- Server Components (default): fetch data securely on the server, no bundle cost on the client, great for SEO and performance.
- Client Components (with `"use client"`): needed for interactivity (inputs, onChange, onClick, router hooks).
- Practical split used here:
  - Server: building the board grid
  - Client: search input, filter controls, pagination links

### `URLSearchParams` over `useState`
- Instead of local component state, the app encodes UI state in the URL.
- Flow learned and applied:
  1. Read current params with `useSearchParams` in client components
  2. Update them using `URLSearchParams` + `useRouter().replace()`
  3. Server components re-render automatically based on `searchParams`
- Benefits: shareable URLs, back/forward nav works, SSR-friendly, fewer client states to manage.

### Pagination, Skeletons, and Filters
- Pagination numbers generated with a helper that returns numbers and ellipses.
- Skeletons displayed while data is loading to keep layout stable.
- Filters (e.g., `sfw`, `type`, `status`, `rating`, `order_by`, `sort`) map to API query parameters and are encoded in the URL.

### Static, Dynamic, and Streaming Rendering
- Static: layout and some non-parameterized UI render once per route.
- Dynamic: pages/components depending on `searchParams` or dynamic data fetches.
- Streaming: leverage async server components and Suspense to progressively render content and skeletons for faster perceived performance.

### Error Handling and Resets
- Dedicated `error.tsx` and `not-found.tsx` routes handle failures.
- Reset behavior falls back to reloading or navigating to the root when needed.
- Server component error UI uses a simple form submit to retry (no onClick in server components).

---

## Tech Stack
- Next.js 15 (App Router)
- TypeScript
- Bootstrap 5 (styling)
- next/image with remote patterns for `cdn.myanimelist.net`
- Jikan API (MyAnimeList) v4

---

## Folder Structure
```bash
nextjs-anime-api/
├─ app/                         # Route tree (App Router)
│  ├─ styles/                   # Scoped CSS modules
│  │  ├─ styles.module.css
│  │  ├─ styles.board.module.css
│  │  ├─ styles.filters.module.css
│  │  ├─ styles.navbar.module.css
│  │  ├─ styles.pagination.module.css
│  │  ├─ styles.search.module.css
│  │  └─ styles.skeleton.module.css
│  ├─ ui/                      # UI components for this route
│  │  ├─ board.tsx
│  │  ├─ filter.tsx
│  │  ├─ navbar.tsx
│  │  ├─ pagination.tsx
│  │  ├─ search.tsx
│  │  └─ skeletons.tsx
│  ├─ error.tsx                # Error boundary (client)
│  ├─ layout.tsx               # Root layout (server)
│  ├─ not-found.tsx            # 404 boundary (server)
│  └─ page.tsx                 # Home route (server)
├─ public/
│  └─ screenshots/             # Project screenshots
├─ next.config.ts              # next/image config, etc.
├─ postcss.config.mjs
├─ package.json
├─ pnpm-lock.yaml
├─ tsconfig.json
└─ learn.txt
```

---

## Screenshots
Add your screenshots to `public/` and reference them here, for example:

- Home and search state
  - `![Home](public/screenshot-home.png)`
- Filters and pagination
  - `![Filters](public/screenshot-filters.png)`
- Loading skeletons
  - `![Skeletons](public/screenshot-skeletons.png)`
- Error state
  - `![Error](public/screenshot-error.png)`

---

## How to Run
1. Install dependencies
```bash
pnpm install
```
2. Start development server
```bash
pnpm dev
```
3. Open http://localhost:3000

Environment: none required for the public Jikan API.

---

## API Reference

### Jikan: Search Anime (getAnimeSearch)
Endpoint: `GET https://api.jikan.moe/v4/anime`

Query Parameters:
- unapproved: boolean — include unapproved user-submitted entries (flag only: `?unapproved`)
- page: integer — page number
- limit: integer — items per page
- q: string — search query
- type: "tv" | "movie" | "ova" | "special" | "ona" | "music" | "cm" | "pv" | "tv_special"
- score: number — exact score
- min_score: number — minimum score
- max_score: number — maximum score
- status: "airing" | "complete" | "upcoming"
- rating: "g" | "pg" | "pg13" | "r17" | "r" | "rx"
  - G (All Ages), PG (Children), PG-13 (Teens 13+), R (17+), R+ (Mild Nudity), Rx (Hentai)
- sfw: boolean — filter out adult entries
- genres: string — comma-separated genre IDs (e.g., `1,2,3`)
- genres_exclude: string — exclude these genre IDs
- order_by: "mal_id" | "title" | "start_date" | "end_date" | "episodes" | "score" | "scored_by" | "rank" | "popularity" | "members" | "favorites"
- sort: "desc" | "asc"
- letter: string — entries starting with letter
- producers: string — comma-separated producer IDs
- start_date: string — YYYY or YYYY-MM or YYYY-MM-DD
- end_date: string — YYYY or YYYY-MM or YYYY-MM-DD

Example:
```
GET https://api.jikan.moe/v4/anime?q=death&type=tv&sfw=true&order_by=score&sort=desc&page=1&limit=12
```

---

## APIs and References
- Next.js Docs (App Router, Data Fetching, Streaming, Error Handling)
- Jikan (MyAnimeList) API v4: `https://api.jikan.moe/v4` (used for anime data)
- next/image remote patterns to allow `cdn.myanimelist.net/images/**`

---

## Credits & Disclaimer
- Styling and layout were refined with the help of AI assistants (including Cursor AI). I iterated on prompts and applied manual adjustments to fit the project’s visual style.
- Based on learnings from official Next.js tutorials and docs, plus exploration of URL-driven state patterns.
- Data courtesy of the Jikan API. This project is for learning/demonstration purposes only; no affiliation with MyAnimeList.

If you’re using this as a study reference, I recommend reading through the component files for examples of server vs client components, URLSearchParams-driven state, and pagination/skeleton patterns with streaming.
