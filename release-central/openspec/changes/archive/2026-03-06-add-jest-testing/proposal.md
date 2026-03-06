# Change: Add Jest Unit and Component Testing Infrastructure

## Why
Release Central has **zero testing infrastructure**. There is no way to catch regressions when modifying utility functions, hooks, or React components. Adding Jest with React Testing Library provides a fast feedback loop for unit and component tests, independent of a future Playwright E2E layer.

## What Changes
- Install Jest, `ts-jest`, `@testing-library/react`, `@testing-library/jest-dom`, and related dev-dependencies
- Add `jest.config.ts` with path aliases, jsdom environment, and Next.js compatibility
- Add `pnpm test` and `pnpm test:watch` scripts to `package.json`
- Create seed tests covering existing utility functions (`cn`, `getReleaseById`, `getGmudsByReleaseId`, `generateGameStats`) and the `useIsMobile` hook
- Create seed component tests for `AppSidebar`, `KPIHeader`, and `AchievementsList`
- Document the testing strategy in `AGENTS.md` and `openspec/project.md`

## Impact
- Affected specs: none (this adds a new capability; no existing behavior changes)
- Affected code:
  - `package.json` (new devDependencies and scripts)
  - `jest.config.ts` [NEW]
  - `jest.setup.ts` [NEW]
  - `__tests__/` directory tree [NEW] (colocated with each feature area)
  - `AGENTS.md` (updated testing section)
  - `openspec/project.md` (updated testing strategy)
