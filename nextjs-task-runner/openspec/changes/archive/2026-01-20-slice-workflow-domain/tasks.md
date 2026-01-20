# Tasks

- [x] Install `mongoose` (if not present) <!-- id: 0 -->
    - [x] Check `package.json` and add `mongoose` if missing.
- [x] Implement Domain Layer <!-- id: 1 -->
    - [x] Create `src/features/workflow/domain/workflow.entity.ts`
    - [x] Create `src/features/workflow/domain/task.entity.ts`
    - [x] Create `src/features/workflow/domain/workflow-status.enum.ts`
- [x] Implement Infrastructure Layer <!-- id: 2 -->
    - [x] Create `src/features/workflow/infrastructure/workflow.schema.ts`
        - Define Mongoose schema for Workflow and embedded Tasks.
- [x] Implement Seeding Script <!-- id: 3 -->
    - [x] Create `scripts/seed-workflows.ts`
    - [x] Implement random workflow generation logic.
    - [x] Add CLI execution support (e.g., `pnpm tsx scripts/seed-workflows.ts`).
- [x] Verification <!-- id: 4 -->
    - [x] Run seed script and verify output.
    - [x] Check types.
