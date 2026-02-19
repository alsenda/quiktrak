# Step 08 — Test Coverage Completion (API + Web)

## Goal

Complete minimum required automated tests across both apps and ensure they are reliable in CI-like runs.

At the end of this step:

- API tests cover required endpoint cases
- Web tests cover required rendering/invalid-id scenarios
- test scripts run cleanly from root/workspaces

---

## Tasks

1. Ensure API tests include:
   - health test
   - movies list test
   - movie detail test
   - 404 detail test
2. Add web component/integration tests for:
   - list renders movie items
   - detail renders movie info
   - invalid id handled with fallback UI
3. Add web test setup (`jsdom`, Testing Library, setup file).
4. Stabilize async tests (awaited UI updates and deterministic mocks).
5. Verify no TypeScript errors in test files.

---

## Acceptance Criteria

- `npm --workspace @quiktrak/api run test` passes
- `npm --workspace @quiktrak/web run test` passes
- required minimum test cases exist and are green
- lint/typecheck remain green

---

## Quality Gates

```bash
npm run lint
npm run typecheck
npm --workspace @quiktrak/api run test
npm --workspace @quiktrak/web run test
```

---

## Commit Plan (<=100 LOC each)

- `test: complete api required endpoint coverage`
- `test: add web list/detail rendering tests`
- `test: add invalid-id and async fallback coverage`
