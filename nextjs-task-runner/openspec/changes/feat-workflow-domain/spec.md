---
title: Workflow Domain Vertical Slicing
status: proposed
author: agent
created: 2026-01-20
---

# Workflow Domain Vertical Slicing

## Summary
Implement the core domain entities and infrastructure for the Workflow feature, enabling vertical slicing. This includes defining domain types, MongoDB schemas, and a seeding script for random workflow generation.

## Motivation
To support dynamic workflow execution and persistence, we need a solid domain layer and database schema.

## Proposed Changes
1.  **Domain Layer**: Create `src/features/workflow/domain` with:
    -   `Workflow`: Entity definition.
    -   `Task`: Entity definition.
    -   `WorkflowStatus`, `TaskStatus`: Enums.
2.  **Infrastructure Layer**: Create `src/features/workflow/infrastructure` (or `data`) with:
    -   `WorkflowSchema`: MongoDB schema.
    -   `TaskSchema`: MongoDB schema (embedded or separate).
3.  **Seeding**: Create `scripts/seed-workflows.ts` to generate dummy workflows.

## Verification
-   Run `pnpm tsx scripts/seed-workflows.ts` and verify data in MongoDB.
-   Check type compilation.
