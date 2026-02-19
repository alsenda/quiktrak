# Step 02 — Contract Package Foundation (`packages/contract`)

## Goal

Create the contract-first foundation in `packages/contract` with:

- OpenAPI source of truth
- Zod schemas for runtime validation
- exported TypeScript types
- package exports ready for API and Web consumers

At the end of this step:

- `packages/contract` defines Movie and endpoint payload contracts
- OpenAPI and Zod are aligned
- `npm run lint` passes
- `npm run typecheck` passes

NO API routes or web UI yet.

---

## Tasks

### 1. Install contract dependencies

In `packages/contract`, add:

- `zod`

At root, install workspace deps with npm workspaces.

---

### 2. Define Zod schemas

Create `packages/contract/src/schema.ts` with:

- `movieSchema`
- `movieListSchema`
- `healthResponseSchema`
- `favoriteToggleResponseSchema`

Movie minimum fields:

- `id: string`
- `title: string`
- `year: number`
- `imageUrl: string`
- `description: string`
- `rating: number`

Also export inferred types:

- `Movie`
- `MovieListResponse`
- `HealthResponse`
- `FavoriteToggleResponse`

---

### 3. Define OpenAPI contract

Create `packages/contract/openapi.yaml` with at least:

- `GET /api/health`
- `GET /api/movies`
- `GET /api/movies/{id}`
- `POST /api/favorites/{id}`

Include `Movie` schema in `components/schemas` and reference it from endpoints.

---

### 4. Export package API

Update `packages/contract/src/index.ts` to export all schemas and types from `schema.ts`.

---

### 5. Ensure package metadata supports consumers

Update `packages/contract/package.json` with:

- `exports` map for `./src/index.ts`
- `types` entry

Keep package private.

---

### 6. Validate quality gates for this step

From repo root:

- `npm run lint`
- `npm run typecheck`

Both must pass.

---

## Acceptance Criteria

Step is complete ONLY if:

- `packages/contract/openapi.yaml` exists
- `packages/contract/src/schema.ts` exists with required schemas
- `packages/contract/src/index.ts` exports schemas + types
- OpenAPI endpoints match required routes
- `npm run lint` passes
- `npm run typecheck` passes

---

## Manual Verification

From repo root:

```bash
npm run lint
npm run typecheck
```

Inspect:

- `packages/contract/openapi.yaml`
- `packages/contract/src/schema.ts`

---

## Commit Plan (<=100 LOC each)

- `chore: add zod to contract workspace`
- `feat: add movie and response zod schemas`
- `feat: add openapi contract for movie endpoints`
- `chore: export contract public API`

Each commit must keep the repo runnable.

---

✅ Contract-first source established  
✅ API/Web can now implement against shared types  
✅ Keeps strict TypeScript + lint gates green