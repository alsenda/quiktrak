# Step 01 — Monorepo Bootstrap (npm Workspaces)

## Goal

Create a runnable npm monorepo with:

- npm workspaces configured
- TypeScript base config
- ESLint flat config
- empty api/web/contract packages
- root scripts working

At the end of this step:

- npm install works
- npm run lint runs (even if no files)
- npm run typecheck runs
- repo structure is correct

NO application logic yet.

---

## Prerequisites

Required:

- Node >= 18
- npm >= 9 (workspaces support)

---

## Tasks

### 1. Initialize root package

If not already present:

```bash
npm init -y
2. Enable npm workspaces
Edit root package.json and add:

{
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
IMPORTANT:

"private": true is required for workspaces

Do not publish this package

3. Create folder skeleton
Create directories:

apps/api
apps/web
packages/contract
Each package MUST contain:

package.json
tsconfig.json
src/ (empty folder)
4. Initialize each workspace package
Inside each folder run:

npm init -y
Then edit each package.json to include at minimum:

{
  "name": "@quiktrak/api",      // adjust per package
  "version": "0.0.0",
  "private": true,
  "type": "module"
}
Package names:

@quiktrak/api

@quiktrak/web

@quiktrak/contract

5. Create root TypeScript base config
Create:

tsconfig.base.json
Requirements:

strict true

modern ES target

shared across all packages

Each workspace tsconfig must extend this file.

6. Install lint + TS tooling (ROOT)
From repo root:

npm add -D eslint@^9 @eslint/js typescript typescript-eslint
npm add -D eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
npm add -D globals
IMPORTANT:

Must install ESLint v9 (not v10) for plugin compatibility

Do NOT use --force or legacy-peer-deps

7. Create ESLint flat config
Create:

eslint.config.js
Must support:

TypeScript

React (web only)

Node (api)

monorepo typed linting

Lint must run successfully even with empty src folders.

8. Root scripts
Add to root package.json:

{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "typecheck": "tsc -b --pretty false",
    "test": "echo \"No tests yet\""
  }
}
Requirements:

All scripts must execute without failure

typecheck must not emit files

9. Package-level scripts
Each workspace package must include:

{
  "scripts": {
    "typecheck": "tsc -p tsconfig.json --noEmit"
  }
}
No build/dev scripts yet.

Acceptance Criteria
Step is complete ONLY if:

npm install succeeds

npm run lint runs without crashing

npm run typecheck runs without crashing

each workspace has valid package.json

each workspace extends tsconfig.base.json

no TypeScript errors

no ESLint errors

Manual Verification
From repo root:

npm install
npm run lint
npm run typecheck
All must succeed.

Commit Plan (<=100 LOC each)
chore: init npm workspace

chore: add workspace package skeletons

chore: add base tsconfig

chore: add eslint tooling

chore: add root scripts

Each commit must leave the repo runnable.


---

✅ This version is fully npm-native  
✅ Compatible with your two-copilot plan  
✅ ESLint modern  
✅ TypeScript strict  
✅ Deterministic for GPT-4.1  

---

### 🔥 Recommended next move

If you want maximum smoothness, ask me next for:

> “generate the minimal file contents for step 01”

…and I’ll give you copy-paste-ready versions of:

- root package.json  
- tsconfig.base.json  
- eslint.config.js  
- workspace tsconfig stubs  

So your agents start on rails.
::contentReference[oaicite:0]{index=0}