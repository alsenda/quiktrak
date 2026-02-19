# Step 06 — Web Data Layer + React 19 Async Patterns (`apps/web`)

## Goal

Connect web app to API using contract-validated fetchers and implement React 19 async rendering patterns.

At the end of this step:

- movies list and movie detail fetch from API
- responses are parsed with Zod contract schemas
- Suspense + `use()` data reading is in place
- Error Boundary wraps async UI sections

---

## Tasks

1. Add `src/lib/api.ts` with fetch helpers for:
   - health
   - movies list
   - movie detail
   - favorite toggle
2. Parse all response payloads via `@quiktrak/contract` schemas.
3. Add resource/promise utilities for Suspense + `use()`.
4. Build movies list page using semantic HTML and card grid.
5. Build movie detail page with semantic sections.
6. Add route-level Error Boundary.
7. Keep lazy route loading from Step 04.

---

## Acceptance Criteria

- `/movies` renders API-backed movie cards
- `/movies/:id` renders detail data
- invalid id shows handled fallback state
- Suspense fallback is visible while loading
- Error Boundary handles thrown async errors
- lint and typecheck pass

---

## Quality Gates

```bash
npm run lint
npm run typecheck
npm --workspace @quiktrak/web run test
```

---

## Commit Plan (<=100 LOC each)

- `feat: add web contract-safe api client`
- `feat: add suspense data resources with use()`
- `feat: render movies list and detail from api`
- `fix: handle invalid movie id state`
