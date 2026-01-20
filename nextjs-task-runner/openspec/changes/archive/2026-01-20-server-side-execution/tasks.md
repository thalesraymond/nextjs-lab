1.  **Backend Implementation**
    - [ ] Create `src/app/api/workflows/performance/stream/route.ts`.
    - [ ] Implement `GET` handler.
    - [ ] Import `generateHugeWorkflow`.
    - [ ] Setup `TaskRunner` with `StandardExecutionStrategy`.
    - [ ] Implement event buffering/batching logic.
    - [ ] Implement streaming response using `ReadableStream`.

2.  **Frontend Implementation**
    - [ ] Modify `src/app/performance-showcase/page.tsx`.
    - [ ] Remove `TaskRunner` import and usage.
    - [ ] Implement `runHugeWorkflow` utilizing `fetch` and stream reading.
    - [ ] Handle stream parsing and counter updates.
    - [ ] Handle connection errors or closure.

3.  **Refactoring**
    - [ ] Ensure `generateHugeWorkflow` is safe to run on server (it is pure).
