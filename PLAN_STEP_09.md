# Step 09 — Final Integration, Build Pipeline, and Developer UX

## Goal

Finalize cross-workspace integration so API, Web, and Contract work together smoothly in local development and CI-style checks.

At the end of this step:

- workspace scripts are coherent
- both apps run with expected ports/URLs
- lint/typecheck/test/build commands are deterministic

---

## Tasks

1. Ensure API base URL configuration exists in web (env-driven with sane default).
2. Confirm `@quiktrak/contract` import paths work in both `apps/api` and `apps/web`.
3. Add/adjust root scripts for common workflows (optional examples: workspace test runners).
4. Verify `npm` workspace command usage is documented and functional.
5. Run full validation sequence:
   - lint
   - typecheck
   - API tests
   - Web tests
   - Web build

---

## Acceptance Criteria

- both apps consume shared contract package without path hacks
- web can call API successfully in local run
- full quality-gate command set passes
- no TypeScript or ESLint regressions introduced

---

## Quality Gates

```bash
npm run lint
npm run typecheck
npm --workspace @quiktrak/api run test
npm --workspace @quiktrak/web run test
npm --workspace @quiktrak/web run build
```

---

## Commit Plan (<=100 LOC each)

- `chore: align workspace run scripts and env defaults`
- `fix: ensure contract imports resolve in all apps`
- `chore: pass full validation pipeline`
