# Design: Performance Showcase

## Architecture
-   **Client-Side Execution**: We will continue using the client-side `TaskRunnerBuilder`.
-   **Memory Management**:
    -   1M `TaskStep` objects. Each step object should be minimal.
    -   Avoid huge closure scopes in the `run` function. Use a shared function reference if possible.
    -   Avoid keeping full history of logs in React state.
-   **Visualization**:
    -   Instead of `logs` array with 1M strings, use a circular buffer or just show the "Latest Log".
    -   Instead of `results` map with 1M entries, just track counts: `successCount`, `failureCount`.
-   **Timer**:
    -   Capture `performance.now()` at start and end.
    -   Subscribe to `workflowStart` and `workflowEnd` events if available, or wrap the `execute` call.

## Data Structures
### Huge Workflow Generation
-   **Nodes**: "Task_1" to "Task_1000000".
-   **Logic**:
    -   Loop 1..1M.
    -   `Math.random() < 0.05` -> delay 5000ms.
    -   Else -> delay 20ms.
    -   Dependencies: Randomly pick 0-3 previous nodes.
-   **Optimization**:
    -   String concatenation for names is fast enough.
    -   Keep dependencies array small.

### UI Inteface
-   No Graph Rendering.
-   No Table Rendering of 1M rows.
-   Simple "Dashboard card" layout for stats.

## Risks
-   **Browser Timeout**: If the main thread is blocked by task scheduling. The `TaskRunner` should be async and yield control.
-   **Memory limit**: Chrome tab limit is ~4GB. 1M simple objects should be < 1GB.
