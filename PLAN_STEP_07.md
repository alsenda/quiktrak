# Step 07 — React 19 Interaction Features + Responsive SCSS (`apps/web`)

## Goal

Implement interactive UX requirements using React 19 hooks and finalize responsive SCSS architecture.

At the end of this step:

- search form uses Actions + `useActionState`
- favorite toggle uses `useOptimistic`
- responsive layout is mobile-first with no horizontal scroll
- semantic HTML structure is preserved

---

## Tasks

1. Add movie search UI with `<form>` action and `useActionState`.
2. Add optimistic favorite toggle UI with `useOptimistic`.
3. Wire favorite toggle to `POST /api/favorites/:id`.
4. Finalize card/grid/detail SCSS modules and responsive breakpoints.
5. Ensure reusable SCSS tokens via partials (`_variables.scss`, `_mixins.scss`).
6. Add accessibility polish (button labels, headings, landmarks).

---

## Acceptance Criteria

- search updates list using action-based state handling
- favorite button updates instantly and reconciles with server
- mobile and desktop layouts render correctly
- no horizontal overflow
- semantic HTML5 landmarks/headings are present
- lint/typecheck pass

---

## Quality Gates

```bash
npm run lint
npm run typecheck
npm --workspace @quiktrak/web run test
```

---

## Commit Plan (<=100 LOC each)

- `feat: add search with useActionState`
- `feat: add optimistic favorite toggle`
- `style: add responsive movie grid/detail styles`
- `fix: semantic and a11y polish`
