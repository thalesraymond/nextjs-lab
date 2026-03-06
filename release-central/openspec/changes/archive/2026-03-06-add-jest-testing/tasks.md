## 1. Install Dependencies
- [x] 1.1 Install Jest and TypeScript support: `jest`, `ts-jest`, `@types/jest`
- [x] 1.2 Install React Testing Library: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- [x] 1.3 Install jsdom environment: `jest-environment-jsdom`

## 2. Configuration
- [x] 2.1 Create `jest.config.ts` with `ts-jest` preset, `jsdom` environment, path alias mapping (`@/*`), and setup file reference
- [x] 2.2 Create `jest.setup.ts` with `@testing-library/jest-dom` import and Next.js mocks (`next/image`, `next/link`, `next/navigation`)
- [x] 2.3 Add `"test": "jest"` and `"test:watch": "jest --watch"` scripts to `package.json`

## 3. Seed Unit Tests — Utilities
- [x] 3.1 `lib/__tests__/utils.test.ts` — test `cn()` with multiple class merging, conflict resolution, and falsy inputs
- [x] 3.2 `app/calendar/__tests__/data.test.ts` — test `getReleaseById()` and `getGmudsByReleaseId()` with valid IDs, invalid IDs, and edge cases
- [x] 3.3 `app/game/utils/__tests__/mock-generator.test.ts` — test `generateGameStats()` returns correct structure, squad count, tier assignment, and sorting

## 4. Seed Unit Tests — Hooks
- [x] 4.1 `hooks/__tests__/use-mobile.test.ts` — test `useIsMobile()` returns correct value based on mocked `window.matchMedia` and resize

## 5. Seed Component Tests
- [x] 5.1 `components/__tests__/app-sidebar.test.tsx` — test `AppSidebar` renders all navigation items with correct links
- [x] 5.2 `app/game/_components/__tests__/kpi-header.test.tsx` — test `KPIHeader` renders KPI values from props
- [x] 5.3 `app/game/_components/__tests__/achievements-list.test.tsx` — test `AchievementsList` renders achievement names, descriptions, and progress bars

## 6. Documentation
- [x] 6.1 Update `AGENTS.md` § Testing section with Jest conventions and test placement
- [x] 6.2 Update `openspec/project.md` § Testing Strategy with approach and commands

## 7. Validation
- [x] 7.1 Run `pnpm test` — all seed tests pass
- [x] 7.2 Run `pnpm build` — ensure test files don't break the production build
