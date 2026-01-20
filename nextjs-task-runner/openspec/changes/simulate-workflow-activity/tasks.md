# Tasks

- [ ] Create `src/features/workflow/utils/workflow-generator.ts`
    - [ ] Define types and helper data (verbs, nouns)
    - [ ] Implement DAG generation logic
    - [ ] Add execution simulation (delays, random failures)
- [ ] Modify `src/app/workflow/page.tsx`
    - [ ] Import generator
    - [ ] Replace static tasks with `useState<TaskStep[]>`
    - [ ] Generate on mount
- [ ] Verify
    - [ ] Check for cycles (runner should not hang/error on cycle detection if logic is correct)
    - [ ] Check visual graph rendering
