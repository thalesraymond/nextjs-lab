# Design: Workflow Visualization

## Components

### AppSidebar
A sidebar component that provides navigation.
- Links:
  - Home (`/`)
  - Workflow (`/workflow`)

### WorkflowDashboard
Located at `/workflow`.
- Client-side execution of the mock workflow (or server-side if feasible/preferred).
- Displays the execution logs/results table.
- Renders the Mermaid graph.

## Libraries
- `@calmo/task-runner`: For defining and running tasks.
- `mermaid` (via script or react component): To render the graph string provided by the runner.

## Data Flow
1. Page loads.
2. `Tasks` are defined.
3. `TaskRunner` is built with `RetryingExecutionStrategy`.
4. `TaskRunner` executes tasks (possibly mocking the wait times for visual effect, though the provided code just runs).
5. `TaskRunner` generates Mermaid graph.
6. UI renders the graph.
