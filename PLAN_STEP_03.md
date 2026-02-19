# Step 03 — API App Skeleton + Contract-Wired Endpoints (`apps/api`)

## Goal

Create a runnable API service in `apps/api` that implements required routes and validates outputs using the shared contract package.

At the end of this step:

- API runs on port `3001`
- Base path is `/api`
- required endpoints respond with in-memory data
- responses are validated with Zod schemas from `@quiktrak/contract`
- basic endpoint tests pass

NO frontend work yet.

---

## Tasks

### 1. Add API dependencies

In `apps/api` add runtime deps:

- `express`
- `cors`
- `@quiktrak/contract`

Add dev deps:

- `@types/express`
- `@types/cors`
- `vitest`
- `supertest`
- `@types/supertest`
- `tsx`

---

### 2. Add API scripts

Update `apps/api/package.json` scripts:

- `dev`: run server with `tsx`
- `start`: run server with `node`
- `test`: run `vitest`
- keep `typecheck`

---

### 3. Create app/server split

Create files:

- `src/app.ts` (express app factory)
- `src/server.ts` (listen on `3001`)
- `src/data/movies.ts` (in-memory movie seed)

Requirements:

- JSON middleware enabled
- CORS enabled
- base router mounted under `/api`

---

### 4. Implement required endpoints

Implement:

- `GET /api/health`
- `GET /api/movies`
- `GET /api/movies/:id`
- `POST /api/favorites/:id`

Behavior:

- `GET /movies/:id` returns `404` when not found
- favorites stored in-memory via `Set<string>`
- `POST /favorites/:id` toggles boolean state

---

### 5. Validate responses with contract schemas

Use `@quiktrak/contract` schemas before sending response:

- `healthResponseSchema`
- `movieListSchema`
- `movieSchema`
- `favoriteToggleResponseSchema`

If validation fails, return 500 with safe message.

---

### 6. Add tests for minimum API coverage

Create tests in `apps/api/src/__tests__`:

- health endpoint test
- movies list test
- movie detail test
- missing movie returns 404
- favorite toggle contract shape

Use `supertest` against `app` without binding a real port.

---

### 7. Quality gates

From repo root run:

- `npm run lint`
- `npm run typecheck`
- `npm --workspace @quiktrak/api run test`

All must pass.

---

## Acceptance Criteria

Step is complete ONLY if:

- API starts locally on `http://localhost:3001`
- all required routes are implemented under `/api`
- responses are validated with shared contract schemas
- in-memory favorites toggle works
- minimum endpoint tests pass
- root lint and typecheck pass

---

## Manual Verification

```bash
npm --workspace @quiktrak/api run dev
```

Then verify:

- `GET http://localhost:3001/api/health`
- `GET http://localhost:3001/api/movies`
- `GET http://localhost:3001/api/movies/<id>`
- `POST http://localhost:3001/api/favorites/<id>`

---

## Commit Plan (<=100 LOC each)

- `chore: add api runtime and test dependencies`
- `chore: add api app/server bootstrap`
- `feat: add health and movies endpoints`
- `feat: add favorites toggle endpoint`
- `test: add api endpoint tests`

Each commit must keep API runnable and testable.

---

✅ Backend runtime established  
✅ Contract-first validation enforced in API responses  
✅ Ready for web integration in next step