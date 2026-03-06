## Context
Release Central is a Next.js 16 (App Router) application using React 19, TypeScript 5, Tailwind CSS 4, and Shadcn UI (Radix). There is currently **no testing tooling** installed. The goal is to add unit and component testing without disrupting the existing dev workflow. E2E testing (Playwright) is explicitly out of scope and will be added later.

## Goals / Non-Goals
- **Goals:**
  - Install and configure Jest + React Testing Library for unit and component tests
  - Support TypeScript, path aliases (`@/*`), and JSX/TSX out of the box
  - Provide seed tests for existing utilities, hooks, and key components as reference patterns
  - Add `pnpm test` / `pnpm test:watch` scripts
  - Document conventions so future contributors know where and how to write tests

- **Non-Goals:**
  - E2E testing (Playwright will be added separately)
  - Snapshot testing (fragile for UI-heavy components; prefer behavioral assertions)
  - Code coverage thresholds (can be added incrementally after baseline is established)
  - CI/CD integration (can be added as a follow-up)

## Decisions

### Jest over Vitest
- **Decision:** Use Jest with `ts-jest`.
- **Rationale:** User explicitly requested Jest. Jest has the largest ecosystem and is broadly understood. `ts-jest` provides native TypeScript compilation without a separate Babel step.
- **Alternative considered:** Vitest (faster, ESM-native) — viable future migration, but out of scope per user request.

### React Testing Library for components
- **Decision:** Use `@testing-library/react` + `@testing-library/jest-dom`.
- **Rationale:** De-facto standard for testing React components from the user's perspective. Encourages testing behavior over implementation details.

### Test file location — colocated `__tests__` directories
- **Decision:** Place test files in `__tests__/` folders next to the source they test.
- **Rationale:** Aligns with the project's existing colocation convention (see `AGENTS.md` § Colocation). Keeps test imports short and discovery intuitive. Example:
  ```
  lib/
  ├── utils.ts
  └── __tests__/
      └── utils.test.ts
  app/calendar/
  ├── data.ts
  └── __tests__/
      └── data.test.ts
  ```

### jsdom test environment
- **Decision:** Use `jsdom` as the default test environment.
- **Rationale:** Component tests need a DOM. Pure unit tests are unaffected by the extra overhead.

### Module path aliases
- **Decision:** Map `@/*` → `<rootDir>/*` in `jest.config.ts` via `moduleNameMapper`.
- **Rationale:** Mirrors the existing `tsconfig.json` paths so imports like `@/lib/utils` resolve correctly in tests.

## Risks / Trade-offs

| Risk                                                                          | Mitigation                                                            |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| React 19 compatibility with Testing Library                                   | Use `@testing-library/react` ≥ 16.x which supports React 19           |
| Next.js-specific APIs (e.g. `next/image`, `next/link`) not available in jsdom | Mock them in `jest.setup.ts` with lightweight stubs                   |
| `ts-jest` slower than SWC-based transforms for large suites                   | Acceptable for current project size; can migrate to `@swc/jest` later |

## Open Questions
- None at this time — scope is clearly defined.
