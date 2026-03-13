# Tasks: Backoffice Achievements CRUD

**Input**: Design documents from `specs/001-achievements-crud/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Included as per user request ("write tests for the new pages").

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create backoffice achievements directory structure: `app/backoffice/achievements/_components/__tests__`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure and data types that MUST be complete before ANY user story implementation

- [ ] T002 Update `lib/types.ts` with `Achievement` interface per `data-model.md`
- [ ] T003 Implement MongoDB database helper functions for Achievements in `lib/achievements.ts`

**Checkpoint**: Foundation ready - database access and types are defined.

---

## Phase 3: User Story 2 - Visualize Achievement List (Priority: P1) 🎯 MVP Baseline

**Goal**: Display a searchable list of achievements in the backoffice

**Independent Test**: Navigate to `/backoffice/achievements` and see a (possibly empty) list of achievements.

### Tests for User Story 2

- [ ] T004 [US2] Create component test for `AchievementList` in `app/backoffice/achievements/_components/__tests__/achievement-list.test.tsx`
- [ ] T005 [US2] Create page test for achievements list in `app/backoffice/achievements/__tests__/page.test.tsx`

### Implementation for User Story 2

- [ ] T006 [P] [US2] Create `AchievementListItem` component in `app/backoffice/achievements/_components/achievement-list-item.tsx`
- [ ] T007 [US2] Implement achievements list page (Server Component) in `app/backoffice/achievements/page.tsx`
- [ ] T008 [US2] Add search functionality using URL search params in `app/backoffice/achievements/page.tsx`

**Checkpoint**: Users can now view and search the achievements library.

---

## Phase 4: User Story 1 - Create Achievement (Priority: P1) 🎯 MVP Completion

**Goal**: Enable creation of new achievements via the backoffice

**Independent Test**: Use the "Create" button, fill the form, and verify the new achievement appears in the list.

### Tests for User Story 1

- [ ] T009 [US1] Create unit test for `createAchievement` Server Action in `lib/__tests__/achievements.actions.test.ts`
- [ ] T010 [US1] Create component test for `AchievementForm` in `app/backoffice/achievements/_components/__tests__/achievement-form.test.tsx`

### Implementation for User Story 1

- [ ] T011 [US1] Implement `createAchievement` Server Action in `lib/achievements.actions.ts`
- [ ] T012 [US1] Create `AchievementForm` component (Client Component) in `app/backoffice/achievements/_components/achievement-form.tsx`
- [ ] T013 [US1] Add "Create Achievement" dialog/button to `app/backoffice/achievements/page.tsx`

**Checkpoint**: Full "Create and List" flow is functional.

---

## Phase 5: User Story 3 - Edit Achievement (Priority: P2)

**Goal**: Allow editing of existing achievement details

**Independent Test**: Click an achievement, change its description, and verify the update persists.

### Tests for User Story 3

- [ ] T014 [US3] Create unit test for `updateAchievement` Server Action in `lib/__tests__/achievements.actions.test.ts`

### Implementation for User Story 3

- [ ] T015 [US3] Implement `updateAchievement` Server Action in `lib/achievements.actions.ts`
- [ ] T016 [US3] Create achievement detail/edit page (Server Component) in `app/backoffice/achievements/[id]/page.tsx`
- [ ] T017 [US3] Integrate `AchievementForm` into the edit page for modification support

---

## Phase 6: User Story 4 - Delete Achievement (Priority: P3)

**Goal**: Allow removal of achievements

**Independent Test**: Delete an achievement and verify it is removed from the list.

### Implementation for User Story 4

- [ ] T018 [US4] Implement `deleteAchievement` Server Action in `lib/achievements.actions.ts`
- [ ] T019 [US4] Add "Delete" button with confirmation prompt to `app/backoffice/achievements/[id]/page.tsx`

---

## Phase 7: Polish & Cross-Cutting Concerns

- [ ] T020 [P] Implement Lucide icon selector in `AchievementForm` using a Popover/Dialog
- [ ] T021 [P] Ensure all achievement pages follow the dark "gamey" aesthetic and design system
- [ ] T022 Run `specs/001-achievements-crud/quickstart.md` validation steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)** & **Foundational (Phase 2)**: MUST be completed first.
- **User Story 2 (Visualize)**: Recommended first user story to provide a UI container.
- **User Story 1 (Create)**: Depends on Phase 2 (Foundational) and integrates into Phase 3 (Visualize).
- **User Story 3 & 4 (Edit/Delete)**: Depend on the data created in User Story 1.

### Parallel Opportunities

- [P] marked tasks can be worked on simultaneously by different developers.
- Tests (T004, T005, T009, T010, T014) can be written in parallel with their respective implementation phases.
- Once Phase 2 is done, UI development (Phase 3) and Server Action development (Phase 4/5 logic) can overlap.

---

## Implementation Strategy

### MVP First
1. Complete Phases 1 & 2 (Foundation).
2. Complete Phase 3 (Visualize List) and Phase 4 (Create).
3. **VALIDATE**: Verify you can create and list achievements.

### Incremental Delivery
- Add Edit (Phase 5) once Creation is stable.
- Add Delete (Phase 6) as the final CRUD operation.
- Polish visual details (Phase 7) at the end.
