# Movie Catalog — Execution Plan (GPT-4.1 Optimized)

## 0. Mission

Build a small fullstack Movie Catalog that demonstrates:

Product features:
- Main view listing movies in a responsive grid/cards layout
- Detail view with extended information
- Proper semantic HTML5
- Responsive design (mobile + desktop)

Engineering features:
- TypeScript everywhere (strict)
- React 19 modern patterns:
  - Actions
  - useActionState
  - useOptimistic
  - use()
  - Suspense
  - Error Boundaries
  - Lazy loading
- Styling with SCSS:
  - partials
  - variables
  - mixins
- ESLint + typescript-eslint
- Unit/component tests
- Clear architecture and separation of concerns
- Clear README

Hard constraint:
- No commit should exceed ~100 LOC
  (except mock data and lockfiles)

---

## 1. Execution Model (Two GPT Agents)

Two independent agents work in parallel:

Agent A: API copilot  
Agent B: Web copilot

Each agent:

- Works in its own branch
- Must keep the app runnable after every commit
- Must respect the shared contract
- Must not modify the other app

### Branches

- copilot/api
- copilot/web

---

## 2. Monorepo Structure

pnpm workspace layout:

/
  apps/
    api/
    web/
  packages/
    contract/
  eslint.config.js
  tsconfig.base.json
  pnpm-workspace.yaml
  README.md

Ownership:

- api agent owns apps/api
- web agent owns apps/web
- both consume packages/contract
- root configs are shared infrastructure

---

## 3. TypeScript Standards (MANDATORY)

Global rules:

- strict: true
- noImplicitAny: true
- exactOptionalPropertyTypes: true
- noUncheckedIndexedAccess: true
- no implicit any in public APIs
- exported functions must have explicit return types

Each package:

- extends tsconfig.base.json
- passes `pnpm typecheck`

---

## 4. Linting Standards (ESLint)

Tooling:

- ESLint (flat config)
- typescript-eslint
- eslint-plugin-react
- eslint-plugin-react-hooks

Requirements:

- `pnpm lint` passes
- `pnpm lint:fix` available
- ESLint runs on save in VS Code (developer responsibility)
- No disabled rules without justification

---

## 5. Contract-First Development

Single source of truth:

packages/contract

Contains:

- openapi.yaml
- schema.ts (Zod)
- exported TypeScript types

### Movie model (minimum)

Movie:

- id: string
- title: string
- year: number
- imageUrl: string
- description: string
- rating: number

### Required endpoints

GET /api/health  
GET /api/movies  
GET /api/movies/:id  
POST /api/favorites/:id

Rules:

- API validates responses with Zod
- Web parses responses with Zod
- No endpoint drift allowed

---

## 6. Backend Requirements (apps/api)

Stack:

- Node + TypeScript
- Express or Fastify
- In-memory data
- Runs on port 3001
- Base path: /api

Must implement:

- health endpoint
- movies list
- movie detail
- favorites toggle

Testing:

- endpoint tests
- 404 tests
- contract validation tests

---

## 7. Frontend Requirements (apps/web)

Stack:

- React 19
- React Router
- TypeScript
- SCSS (required)
- Vite

Routes:

- /movies
- /movies/:id
- *

### React 19 feature showcase

Must visibly use:

Lazy loading:
- React.lazy for pages

Suspense + use():
- data read through use()

ErrorBoundary:
- wrap async UI

Actions + useActionState:
- search form

useOptimistic:
- favorite toggle

---

## 8. Styling Requirements (SCSS REQUIRED)

Must include:

- partials folder
- variables
- mixins
- global base styles

Layout:

- responsive grid
- mobile first
- no horizontal scroll

---

## 9. Testing Requirements

Minimum:

API:
- health test
- movies list test
- movie detail test

Web:
- list renders items
- detail renders movie
- invalid id handled

---

## 10. Quality Gates

Before merge, each branch must satisfy:

- builds
- typecheck passes
- lint passes
- tests pass
- app runs locally

---

## 11. Definition of Done

User-visible:

- movies grid page
- movie detail page
- responsive UI
- semantic HTML

Engineering:

- React 19 features present
- SCSS properly structured
- TypeScript strict
- ESLint clean
- tests passing
- README complete

---

## 12. Commit Discipline

Rules:

- <= 100 LOC per commit
- each commit must be runnable
- each commit must be testable
- no large refactors
- no dead code

Commit style:

- chore:
- feat:
- fix:
- test:
- style:
- docs:
