# Design: Random Workflow Generation

## Overview
To simulate a real-world environment, we need a robust random workflow generator on the client side. This generator will create `TaskStep` objects compatible with `@calmo/task-runner`.

## Components

### Workflow Generator (`src/features/workflow/utils/workflow-generator.ts`)
A utility module responsible for creating the task graph.

#### Interface
```typescript
interface GeneratorOptions {
  minTasks: number;
  maxTasks: number;
  failureRate: number; // 0.0 to 1.0
}

export function generateRandomWorkflow(options: GeneratorOptions): TaskStep<CIContext>[] { ... }
```

#### Algorithm
1. **Nodes**: Generate `N` tasks (random between min/max).
2. **Names**: Pick random "Action" + "Subject" (e.g., "Compile Core", "Test UI").
3. **Edges (Dependencies)**:
   - Iterate through tasks `i` from 1 to `N-1`.
   - For each task, randomly pick `k` dependencies from tasks `0` to `i-1`.
   - This ensures acyclic structure (topological order is inherent).
4. **Behavior**:
   - `run`: Async function with random `setTimeout`.
   - `condition`: Randomly add `condition` checking mocked context.
   - Return random success/failure based on `failureRate`.

### Page Integration (`src/app/workflow/page.tsx`)
- Replace static `tasks` with state `tasks`.
- wrapped in `useMemo` or `useEffect` to regenerate on mount.
