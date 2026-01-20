# Simulation of Workflow Activity

## Goal
To enhance the testing and demonstration capabilities of the Next.js Task Runner by ensuring that a unique, random workflow is generated and executed every time the workflow page (`/workflow`) is loaded. This allows for observing different graph topologies, execution paths, and failure scenarios without manual code changes.

## User Review Required
- **Randomization Strategy**: Should the graph topology be random (DAG generation) or just the task outcomes/durations? *Assumption: Both topology and outcomes will be randomized for better visualization testing.*
- **Complexity limits**: We will limit the graph to 10-20 nodes to avoid UI clutter.

## Proposed Changes
### Frontend
#### [MODIFY] [page.tsx](file:///home/thales/projects/nextjs-lab/nextjs-task-runner/src/app/workflow/page.tsx)
- Remove hardcoded `tasks` array.
- clear `useEffect` to call a new `generateRandomWorkflow` function.
- Update `TaskRunnerBuilder` usage to consume generated tasks.

### Shared/Utils
#### [NEW] [workflow-generator.ts](file:///home/thales/projects/nextjs-lab/nextjs-task-runner/src/features/workflow/utils/workflow-generator.ts)
- Implement `generateRandomWorkflow(size: number): TaskStep[]`.
- Logic to create dependencies that form a valid DAG (no cycles).
- Randomize task names, durations (simulated), and failure probabilities.

## Verification Plan
### Manual Verification
- Reload `/workflow` page 5 times.
- Verify that each reload presents a different graph structure.
- Verify that execution proceeds and updates the graph states.
