# Tasks: Plan Vertical Slice Architecture Standardization

**Input**: Design documents from `/specs/002-vertical-slice-arch/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story, using the existing `achievements` feature to pilot the architecture standardization.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic directory structure for vertical slices.

- [ ] T001 Create foundational `features/achievements/` directory structure (`models`, `repositories`, `actions`, `__tests__`)
- [ ] T002 Setup global mock configuration (e.g., `USE_MOCKS` environment flag)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented.

- [ ] T003 Create base utility for repository resolution (if needed) to handle dependency injection/factories cleanly

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Develop a feature using Vertical Slice Architecture (Priority: P1) 🎯 MVP

**Goal**: Standardize the existing `achievements` feature by encapsulating backend logic in a single cohesive location.

**Independent Test**: Can be fully tested by verifying the app starts successfully and existing `achievements` forms/lists continue to work correctly utilizing the new path structures.

### Implementation for User Story 1

- [ ] T004 [P] [US1] Move server actions from `lib/achievements.actions.ts` to `features/achievements/actions/achievements.actions.ts`
- [ ] T005 [P] [US1] Update imports in `app/backoffice/achievements/` pages and components (`achievement-form.tsx`, etc.) to point to the new actions location
- [ ] T006 [P] [US1] Move existing tests from `__tests__/` or `lib/` into `features/achievements/__tests__/`

**Checkpoint**: At this point, the app relies on the new `features/` directory but does not yet implement abstract repositories or shared validation.

---

## Phase 4: User Story 2 - Switch between Mock and Real Implementation (Priority: P2)

**Goal**: Centralize mocks inside models/repos to easily switch when the implementation arrive.

**Independent Test**: Can be fully tested by toggling the config and observing if the application returns mock data or runs real logic, without any change to the server actions.

### Implementation for User Story 2

- [ ] T007 [P] [US2] Define `AchievementsRepository` interface in `features/achievements/repositories/achievements.repo.ts`
- [ ] T008 [P] [US2] Implement the real DB access logic in `features/achievements/repositories/achievements.repo.impl.ts`
- [ ] T009 [P] [US2] Implement the static/mock data logic in `features/achievements/repositories/achievements.repo.mock.ts`
- [ ] T010 [US2] Create factory index in `features/achievements/repositories/index.ts` to export real or mock repo based on `process.env.USE_MOCKS`
- [ ] T011 [US2] Refactor `features/achievements/actions/achievements.actions.ts` to consume the repository factory instead of doing direct data manipulation

**Checkpoint**: At this point, User Stories 1 AND 2 are complete. The feature is an encapsulated vertical slice with abstracted data access.

---

## Phase 5: User Story 3 - Shared Client and Server Validation (Priority: P3)

**Goal**: Use some form of centralized validation to share validations between client and server (Zod).

**Independent Test**: Can be tested by verifying client-side forms reject invalid data and direct API/Server Action calls reject the identical invalid data.

### Implementation for User Story 3

- [ ] T012 [P] [US3] Create `features/achievements/models/achievements.schema.ts` covering form inputs and domain models using Zod
- [ ] T013 [US3] Integrate Zod schemas into the client-side `achievement-form.tsx` for form validation (`zodResolver`)
- [ ] T014 [US3] Integrate Zod validation at the beginning of Server Actions in `features/achievements/actions/achievements.actions.ts` to reject invalid payloads

**Checkpoint**: All user stories should now be independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup legacy structure and ensure everything passes CI.

- [ ] T015 [P] Remove `lib/achievements.actions.ts` completely
- [ ] T016 Run full test suite (`pnpm test`) to catch broken relative imports in tests
- [ ] T017 Update main `README.md` to briefly document the new Vertical Slice structure

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - Progress sequentially P1 → P2 → P3 to assure stability of the `achievements` slice refactoring

### Parallel Opportunities

- Creating the interfaces and implementations for User Story 2 (T007, T008, T009) can be done in parallel before wiring them into the factory.
- The Zod validation schemas (T012) can be created independently of the server action/form integrations.

## Implementation Strategy

### Incremental Delivery (Refactoring Strategy)

1. Complete Setup + Foundational.
2. Complete US1: Move existing logic cleanly to the new `features/` directory and fix imports. Run tests. App is stable.
3. Complete US2: Abstract the data access within the new folder into a factory pattern. Run tests. App is stable.
4. Complete US3: Add the Zod schemas and integrate them into the existing form and actions. Run tests. App is stable.
5. Complete Polish: Remove legacy files.
