# Step 05 — API Implementation Completion + Contract Tests (`apps/api`)

## Goal

Complete `apps/api` with production-ready route handlers, contract-safe responses, and robust endpoint tests.

At the end of this step:

- all required API endpoints are fully implemented
- all successful responses are validated through `@quiktrak/contract` Zod schemas
- 404 behavior is covered
- API tests are stable and passing

---

## Tasks

1. Implement route modules and mount under `/api`.
2. Add in-memory movie seed data matching `Movie` contract.
3. Add in-memory favorites store (`Set<string>`) and toggle behavior.
4. Validate endpoint responses with:
   - `healthResponseSchema`
   - `movieListSchema`
   - `movieSchema`
   - `favoriteToggleResponseSchema`
5. Add centralized error-safe response for validation failures.
6. Add tests for:
   - health
   - movies list
   - movie detail success
   - movie detail 404
   - favorites toggle shape
7. Add fallback `404` route test for unknown endpoint.

---

## Acceptance Criteria

- `GET /api/health` returns valid health payload
- `GET /api/movies` returns valid movie array
- `GET /api/movies/:id` returns valid movie or 404
- `POST /api/favorites/:id` toggles and returns valid payload
- contract validation is enforced in handlers
- API tests pass

---

## Quality Gates

```bash
npm run lint
npm run typecheck
npm --workspace @quiktrak/api run test
```

---

## Commit Plan (<=100 LOC each)

- `feat: add api movie data and route modules`
- `feat: validate api responses with contract schemas`
- `test: add endpoint and 404 coverage`
