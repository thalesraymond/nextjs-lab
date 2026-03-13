<!--
SYNC IMPACT REPORT
Version change: 1.0.0 → 1.1.0
Modified principles:
- I. Server Components by Default → I. Server Components by Default (Clarified MUST usage)
- II. "use client" at the Leaves → II. Client Logic at the Leaves (Renamed for clarity)
- III. Data Fetching → III. Data Fetching & URL State (Combined and expanded)
- IV. URL as the Source of Truth → Integrated into Principle III
- V. Colocation → Moved to Section 2 (Development Standards)
Added principles:
- IV. Testing Discipline (Elevated to Core Principle)
- V. Styling & UI Consistency (Elevated to Core Principle)
Added sections:
- Section 2: Development Standards & Conventions (Consolidated navigation and performance)
- Section 3: AI Collaboration & OpenSpec (Explicit guidance for AI tools and planning)
Templates verified:
- .specify/templates/plan-template.md (✅ updated/verified)
- .specify/templates/spec-template.md (✅ updated/verified)
- .specify/templates/tasks-template.md (✅ updated/verified)
Follow-up TODOs: None.
-->

# Release Central Constitution

## Core Principles

### I. Server Components by Default
Use React Server Components (RSC) for all components by default. Client components MUST only be used when interactivity (hooks, event listeners) is strictly required. This ensures optimal performance, minimal client-side bundles, and better SEO.

### II. Client Logic at the Leaves
Push the `"use client"` directive as far down the component tree as possible. Layouts and high-level data-fetching components MUST remain Server Components. Client components should be focused "leaf" nodes responsible for specific interactive behaviors.

### III. Data Fetching & URL State
Fetch data directly in Server Components using async/await and native `fetch` or database drivers. Use URL search parameters as the primary source of truth for all shareable UI state (filters, pagination, sorting) instead of local `useState` to ensure deep-linkability.

### IV. Testing Discipline
Maintain a high-quality test suite using Jest and React Testing Library. Tests MUST be colocated in `__tests__/` directories next to their source. Prefer behavioral assertions over implementation details and mock external dependencies (UI libraries, Next.js APIs) at the test boundary.

### V. Styling & UI Consistency
Use Tailwind CSS (v4) for all styling with the official class sorting plugin. UI development MUST utilize Radix UI primitives (via Shadcn UI) to ensure accessibility and consistency. Design MUST be mobile-first and strictly adhere to the project's dark "gamey" aesthetic.

## Development Standards & Conventions

### Navigation & Routing
- Always use the Next.js `<Link>` component for internal navigation.
- Router hooks (`useRouter`, `usePathname`) MUST only be used inside Client Components.
- Follow `kebab-case` for all file and directory naming.

### Performance & Assets
- Use `next/image` for all images to ensure automatic optimization and prevent layout shifts.
- Use `next/font` for font loading.
- Employ `next/dynamic` for heavy client-side components to enable effective code splitting.

### Colocation & Structure
- Components, tests, and styles closely related to a specific feature MUST be colocated.
- Shared, reusable UI primitives reside in `components/ui/`.

## AI Collaboration & OpenSpec

### Context7 Integration
AI assistants MUST proactively use the Context7 MCP for library documentation, API references, and setup tasks without requiring explicit user prompts.

### OpenSpec & Planning
For any non-trivial feature, architectural shift, or breaking change, assistants MUST refer to and update the `@/openspec/` directory and follow the instructions in `AGENTS.md`. Large-scale changes require a formal proposal and approval process.

## Governance

This Constitution is the authoritative guide for the Release Central project and supersedes all general development practices. All contributors, including AI assistants, MUST comply with these principles. Amendments to this document require a version bump and updated ratification/amendment dates.

**Version**: 1.1.0 | **Ratified**: 2026-03-12 | **Last Amended**: 2026-03-12
