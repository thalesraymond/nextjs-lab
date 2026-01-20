# Proposal: Performance Showcase

## Goal
Create a "Performance Showcase" feature to demonstrate the capability of the `@calmo/task-runner` module to handle large-scale workflows (1 million nodes).

## User Review Required
> [!IMPORTANT]
> Generating and executing 1 million tasks in a browser environment is resource-intensive.
> We must ensure:
> 1.  Memory usage does not crash the browser tab (using optimized data structures or avoiding full rendering).
> 2.  The UI remains responsive (not blocking the main thread).
> 3.  We avoid rendering the 1M nodes in the UI (no Mermaid graph, no full list).
> 4.  We show aggregate statistics and a high-precision timer.

## Proposed Changes

### [Sidebar]
#### [MODIFY] [app-sidebar.tsx](file:///home/thales/projects/nextjs-lab/nextjs-task-runner/src/components/app-sidebar.tsx)
-   Add "Performance ShowCase" menu item.

### [Performance Page]
#### [NEW] [page.tsx](file:///home/thales/projects/nextjs-lab/nextjs-task-runner/src/app/performance-showcase/page.tsx)
-   New page at `/performance-showcase`.
-   UI controls to trigger the 1 million node workflow.
-   Display for overall timer (Start/End/Duration).
-   Display for aggregate stats (Pending, Running, Success, Failure).
-   **Excluded**: Mermaid visualization and full task log/list.

### [Workflow Generator]
#### [MODIFY] [workflow-generator.ts](file:///home/thales/projects/nextjs-lab/nextjs-task-runner/src/features/workflow/utils/workflow-generator.ts)
-   Add `generateHugeWorkflow(size: number)` function.
-   Logic to generate 1M nodes.
-   5% long-running (5s), 95% short (20ms) tasks.
-   Random dependency generation (DAG).

## Verification Plan
### Manual Verification
1.  Navigate to `/performance-showcase`.
2.  Click "Run 1 Million Tasks".
3.  Observe the timer starting.
4.  Observe stats updating.
5.  Wait for completion (or partial completion) to verify responsiveness.
6.  Ensure browser memory doesn't spike to crash levels.
