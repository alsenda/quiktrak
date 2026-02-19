# Quiktrak Movie Catalog

Small fullstack movie catalog monorepo with a contract-first API and a React 19 web app.

## Monorepo Structure

```text
.
 apps/
   api/        # Express API (port 3001)
   web/        # React 19 + Vite app
 packages/
   contract/   # Shared Zod schemas + exported TS types + OpenAPI
 package.json
 tsconfig.base.json
```

## Tech Stack

- TypeScript (strict) across all workspaces
- API: Node + Express + Vitest
- Web: React 19, React Router, Vite, SCSS, Vitest + Testing Library
- Shared contract: Zod schemas in `@quiktrak/contract`

## Contract-First Workflow

- Single source of truth: `packages/contract`
- API validates output shapes against contract schemas.
- Web parses API responses with the same schemas.
- Endpoints:
  - `GET /api/health`
  - `GET /api/movies`
  - `GET /api/movies/:id`
  - `POST /api/favorites/:id`

## React 19 Features Used

- `use()` + Suspense for async data rendering
- `React.lazy` for route-level lazy loading
- Error Boundary around async route UI
- Actions + `useActionState` for search form state
- `useOptimistic` for favorite toggle UX

## Install

```bash
npm install
```

## Run Locally

Run API + Web concurrently:

```bash
npm run dev
```

- API: `http://localhost:3001`
- Web: `http://localhost:5173`

## Quality Gates

```bash
npm run lint
npm run typecheck
npm run test:api
npm run test:web
npm run build:web
```

## Workspace Commands

```bash
npm --workspace @quiktrak/api run dev
npm --workspace @quiktrak/api run test
npm --workspace @quiktrak/web run dev
npm --workspace @quiktrak/web run test
npm --workspace @quiktrak/web run build
```

## Environment and Integration Notes

- Web API base URL is env-driven via `VITE_API_BASE_URL`.
- Default fallback if unset: `http://localhost:3001`.
- Current API enables CORS for local web integration.

## Troubleshooting

- **Web cannot reach API**
  - Ensure API is running on port `3001`.
  - Set `VITE_API_BASE_URL` if using a different API host/port.
- **Port already in use**
  - Stop old processes using `3001` or `5173`, then rerun `npm run dev`.
- **Fresh install / lockfile drift**
  - Run `npm install` from repo root before lint/test/build.
