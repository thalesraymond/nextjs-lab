# Research: Backoffice Achievements CRUD

## Decision: Data Fetching and Mutation Strategy
**Decision**: Use Next.js Server Actions for mutations (Create, Update, Delete) and standard `fetch` in Server Components for Reading.
**Rationale**: Aligns with Principle I (Server Components by Default) and provides a clean way to handle form submissions without manual API route boilerplate for every action, while still allowing for easy revalidation of the list.
**Alternatives considered**: API Routes (`/api/achievements`) were considered but Server Actions are more idiomatic for Next.js App Router forms.

## Decision: Icon Selection UI
**Decision**: Implement a searchable popover or dialog containing a curated list of Lucide icons.
**Rationale**: Fulfills FR-007 (Predefined List) while maintaining the "gamey" aesthetic. Using a popover keeps the form clean.
**Alternatives considered**: A simple dropdown (too limited for many icons) or an icon name text input (too error-prone).

## Decision: Database Schema Location
**Decision**: Define the Achievement type in `lib/types.ts` and use the MongoDB collection "achievements".
**Rationale**: Follows existing project structure for shared types and database access.
**Alternatives considered**: Feature-specific type file, but `lib/types.ts` is already established.

## Decision: Testing Strategy for "Gamey" UI
**Decision**: Use snapshot testing for the "gamey" layout components and behavioral tests (React Testing Library) for the CRUD logic.
**Rationale**: Ensures visual regressions are caught while maintaining focus on functionality.
**Alternatives considered**: Manual testing only (unreliable).
