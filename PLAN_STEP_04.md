# Step 04 — Web App Bootstrap (`apps/web`)

## Goal

Create a runnable React 19 + TypeScript + Vite web app skeleton in `apps/web` with routing and SCSS entrypoints.

At the end of this step:

- web app runs locally
- React Router routes exist (`/movies`, `/movies/:id`, `*`)
- lazy page loading + Suspense shell are wired
- base SCSS structure exists (partials, variables, mixins, global)

NO real data rendering yet.

---

## Tasks

1. Add web dependencies: `react`, `react-dom`, `react-router-dom`, `sass`.
2. Add web dev dependencies: `vite`, `@vitejs/plugin-react`, React/DOM types, `vitest`, `jsdom`, Testing Library packages.
3. Add web scripts in `apps/web/package.json`: `dev`, `build`, `preview`, `test`, `typecheck`.
4. Create Vite config and HTML entrypoint.
5. Create `src/main.tsx`, `src/app/App.tsx`, and route setup.
6. Implement lazy page imports for Movies page and Movie Detail page.
7. Add `src/styles/` with:
   - `_variables.scss`
   - `_mixins.scss`
   - `_base.scss`
   - `main.scss`
8. Add not-found route component.

---

## Acceptance Criteria

- `npm --workspace @quiktrak/web run dev` starts Vite successfully
- routes compile and render placeholders
- lazy loading is used for route pages
- global SCSS loads without errors
- root lint and typecheck pass

---

## Quality Gates

```bash
npm run lint
npm run typecheck
npm --workspace @quiktrak/web run test
```

---

## Commit Plan (<=100 LOC each)

- `chore: add web runtime and tooling deps`
- `chore: scaffold vite + react entrypoints`
- `feat: add router with lazy route pages`
- `style: add scss partial structure`
