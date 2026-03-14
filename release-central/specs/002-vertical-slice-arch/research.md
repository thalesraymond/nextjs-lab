# Phase 0: Outline & Research

## Extracted Unknowns & Research Tasks

There were no explicit `[NEEDS CLARIFICATION]` markers in the Technical Context, as the requirements (Next.js, Zod, Vertical Slices, Mock/Real Repositories) were clearly defined in the prompt. However, we researched the optimal folder structure to marry Next.js App Router with Vertical Slice Architecture.

### Research: Folder Structure for Next.js with Vertical Slices

**Task**: Find best practices for implementing Vertical Slice Architecture in a Next.js App Router project while keeping the frontend isolated.

**Findings**:
To keep the Next.js `app/` directory clean and focused on routing/UI, the best practice is to extract all business logic into a separate directory (e.g., `features/` or `modules/`) at the root.

**Decision**: We will use a `features/` directory at the project root.
- **Rationale**: It cleanly separates UI routing (`app/`) from business capabilities (`features/`). It aligns with the user's request to "Keep the frontend isolated and next.js standard, but the rest... follow vertical slice."
- **Alternatives considered**:
  - Placing slices inside the `app/` directory: Rejected because it clutters the file-system router and mixes UI with backend logic.
  - Using a monolithic `lib/` or `src/` folder organized by layer: Rejected because it violates the Vertical Slice Architecture goal.

### Research: Centralizing Mocks in Repositories

**Task**: How to elegantly manage mock vs. real implementations in repositories.

**Findings**:
Using interfaces and dependency injection (or factory functions in simpler functional setups) allows swapping implementations based on environment variables.

**Decision**: Each repository will define an interface, a real implementation, and a mock implementation side-by-side. A factory or export module will resolve which to use based on configuration (e.g., `process.env.USE_MOCKS === 'true'`).
- **Rationale**: Meets the core requirement of easily switching when implementations arrive.
- **Alternatives considered**: Mocking at the network layer (e.g., MSW): Rejected because the prompt explicitly asked to "centralize mocks inside models/repos".

### Research: Shared Zod Validation

**Task**: Best practice for sharing centralized validations between client and server.

**Findings**:
Zod schemas can be defined in the `models/` folder of the vertical slice and imported by both Next.js Client Components (e.g., react-hook-form) and Server Actions/API Routes.

**Decision**: Place Zod schemas in `features/[feature-name]/models/[feature].schema.ts`.
- **Rationale**: Ensures a single source of truth for data shape and constraints, satisfying FR-005.

## Conclusion

All architectural unknowns have been resolved and the structure is formalized in the Implementation Plan.
