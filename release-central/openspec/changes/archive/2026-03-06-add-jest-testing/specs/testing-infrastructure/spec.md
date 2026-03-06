## ADDED Requirements

### Requirement: Jest Testing Configuration
The project SHALL provide a working Jest configuration that supports TypeScript, React component testing with jsdom, and path alias resolution (`@/*`), so developers can run unit and component tests via `pnpm test`.

#### Scenario: Running tests from the command line
- **WHEN** a developer runs `pnpm test`
- **THEN** Jest executes all `*.test.ts` and `*.test.tsx` files and reports pass/fail results

#### Scenario: Path alias resolution
- **WHEN** a test file imports a module using the `@/` alias (e.g., `@/lib/utils`)
- **THEN** Jest resolves the import to the correct file relative to the project root

#### Scenario: Watch mode
- **WHEN** a developer runs `pnpm test:watch`
- **THEN** Jest enters interactive watch mode and re-runs tests when related files change

### Requirement: Utility Unit Tests
The project SHALL include unit tests for all shared utility functions (`cn`, `getReleaseById`, `getGmudsByReleaseId`, `generateGameStats`) to prevent regressions.

#### Scenario: Utility tests cover expected behavior
- **WHEN** `pnpm test` is executed
- **THEN** each utility function is tested for correct output given valid inputs, invalid inputs, and edge cases

### Requirement: Hook Unit Tests
The project SHALL include unit tests for custom React hooks (`useIsMobile`) to validate responsive behavior in a simulated DOM environment.

#### Scenario: Hook tests validate responsive logic
- **WHEN** `pnpm test` is executed
- **THEN** the `useIsMobile` hook is tested against different viewport widths using mocked `window.matchMedia`

### Requirement: Component Tests
The project SHALL include React Testing Library component tests for key UI components (`AppSidebar`, `KPIHeader`, `AchievementsList`) verifying render output and user-facing behavior.

#### Scenario: Component tests verify rendered content
- **WHEN** `pnpm test` is executed
- **THEN** component tests verify that expected text, links, and data values appear in the rendered output

### Requirement: Testing Convention Documentation
The project SHALL document testing conventions (tool choice, test file placement, naming, and commands) in `AGENTS.md` and `openspec/project.md` so contributors know how to write and run tests.

#### Scenario: New contributor reads testing guidelines
- **WHEN** a contributor reads `AGENTS.md` or `openspec/project.md`
- **THEN** they find clear instructions on how to write and run Jest tests for this project
