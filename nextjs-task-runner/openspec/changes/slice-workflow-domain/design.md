# Design: Workflow Domain

## Overview
This change introduces the vertical slice for the Workflow feature.

## Domain Layer (`src/features/workflow/domain`)

### Entities
- `Workflow`: Represents a sequence of tasks.
    - `id`: string
    - `name`: string
    - `status`: WorkflowStatus
    - `createdAt`: Date
    - `updatedAt`: Date
    - `tasks`: Task[]
- `Task`: Represents a single unit of work.
    - `id`: string
    - `name`: string
    - `status`: TaskStatus
    - `kind`: string (e.g., 'http', 'log')
    - `config`: Record<string, any>

### Enums
- `WorkflowStatus`: `PENDING`, `RUNNING`, `COMPLETED`, `FAILED`
- `TaskStatus`: `PENDING`, `RUNNING`, `COMPLETED`, `FAILED`, `SKIPPED`

## Infrastructure Layer (`src/features/workflow/infrastructure`)

### Persistence
- We will use Mongoose for schema definitions to ensure type safety and validation at the application level.
- `WorkflowSchema`:
    - Maps to `workflows` collection.
    - Embeds `tasks` array (since workflows are likely read/written as a whole unit in this lab context).

## Seeding
- Script: `scripts/seed-workflows.ts`
- Uses `faker` (if available) or random generation to create:
    - 10 Workflows
    - Each with 3-5 Tasks
    - Varied statuses
