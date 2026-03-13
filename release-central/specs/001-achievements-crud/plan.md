# Implementation Plan: Backoffice Achievements CRUD

**Branch**: `001-achievements-crud` | **Date**: 2026-03-12 | **Spec**: [specs/001-achievements-crud/spec.md](spec.md)
**Input**: Feature specification from `specs/001-achievements-crud/spec.md`

## Summary

Implement a full CRUD (Create, Read, Update, Delete) interface for Achievements in the backoffice. This involves creating a new section in the backoffice UI, setting up API routes for achievement management, and persisting data to MongoDB. The UI will follow the "gamey" dark aesthetic and use Radix UI primitives.

## Technical Context

**Language/Version**: TypeScript, Next.js 16.1.5 (App Router)
**Primary Dependencies**: React 19, Tailwind CSS v4, Lucide React, MongoDB Node.js Driver, Shadcn UI (Radix UI)
**Storage**: MongoDB (as seen in `lib/mongodb.ts`)
**Testing**: Jest, React Testing Library (colocated `__tests__` folders)
**Target Platform**: Web (Desktop/Mobile-first)
**Project Type**: Web Application
**Performance Goals**: List loading < 1s, CRUD reflections without manual refresh
**Constraints**: Dark "gamey" aesthetic, RSC by default, colocation of tests
**Scale/Scope**: Backoffice CRUD only; achievement logic/targeting is out of scope.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Implementation Strategy |
|-----------|--------|-------------------------|
| I. Server Components by Default | ✅ | List and Detail views will be Server Components. Forms will be Client Components at the leaves. |
| II. Client Logic at the Leaves | ✅ | `"use client"` will only be used in specific form and interactive components. |
| III. Data Fetching & URL State | ✅ | Use URL search params for filtering/searching the achievement list. Fetch data in Server Components. |
| IV. Testing Discipline | ✅ | Unit and component tests will be written in `app/backoffice/achievements/__tests__/`. |
| V. Styling & UI Consistency | ✅ | Use Tailwind CSS v4 and Shadcn components. Follow the dark "gamey" theme. |

## Project Structure

### Documentation (this feature)

```text
specs/001-achievements-crud/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── checklists/          # Quality checklists
│   └── requirements.md
├── contracts/           # API contracts
│   └── achievements.md
└── tasks.md             # Phase 2 output (generated later)
```

### Source Code (repository root)

```text
app/
├── api/
│   └── achievements/
│       ├── route.ts     # GET (list), POST (create)
│       └── [id]/
│           └── route.ts # GET (single), PATCH (update), DELETE
└── backoffice/
    └── achievements/
        ├── page.tsx     # Achievement list (Server Component)
        ├── [id]/
        │   └── page.tsx # Achievement detail/edit (Server Component)
        └── _components/ # Interactive elements (Client Components)
            ├── achievement-form.tsx
            ├── achievement-list-item.tsx
            └── __tests__/
```

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
