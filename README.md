# Kanban TurboRepo

Small kanban app monorepo using Turborepo with a frontend and backend.

## Structure

- apps/
  - backend: Node/TypeScript API
  - frontend: Vite + React app
- packages/shared: shared code/types

## Requirements

- Node 18+ (or LTS)
- npm, yarn or pnpm

## Install

From the repository root:

```bash
# npm
npm install
# or pnpm
pnpm install
# or yarn
yarn install
```

## Run (development)

Run each app from its folder, for example:

```bash
# Backend
cd apps/backend
npm run dev

# Frontend
cd ../../apps/frontend
npm run dev
```

If you use Turborepo workspace scripts, you can run from the root (example):

```bash
npm run dev --workspace-root
# or
pnpm -w run dev
```

## Build

```bash
# Example (run per-package)
cd apps/frontend && npm run build
cd apps/backend && npm run build
```

## Notes

- Environment files: add `.env` to `.gitignore` (already ignored).
- Editor configs: add workspace settings to `.vscode/` if desired.

## License

MIT
