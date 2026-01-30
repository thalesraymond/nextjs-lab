<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# Next.js Development Best Practices

This document outlines the core principles and practices for developing in this Next.js project. It is a living document and will be updated as the project evolves.

## Core Principles

1.  **Server Components by Default**: Use React Server Components (RSC) for everything unless you specifically need client-side interactivity (hooks, event listeners). This improves performance and SEO.
2.  **"use client" at the Leaves**: Push the `"use client"` directive as far down the component tree as possible. Keep the layout and data fetching in Server Components.
3.  **Data Fetching**: Fetch data in Server Components directly (e.g., using `fetch`, database calls). This avoids waterfalls and leverages the server's proximity to data sources.
4.  **URL as the Source of Truth**: Use URL search params for state that should be shareable (filters, pagination, sorting) instead of `useState`.

## Project Structure & Conventions

*   **App Router**: We use the App Router (`app/` directory).
*   **File Naming**: Use `kebab-case` for file and directory names (e.g., `my-component.tsx`, `components/ui/button.tsx`).
*   **Colocation**: Colocate components, tests, and styles closely related to specific features or pages where possible, but use the `components/` folder for shared UI elements.
*   **Shadcn UI**: We use Shadcn UI for our component library. Reusable UI components go in `components/ui`.

## Design System & Component Architecture

We follow a modified Atomic Design methodology to organize our components:

1.  **Atoms (`components/ui` & `components/icons`)**:
    *   Basic building blocks of the UI.
    *   Examples: Buttons, Inputs, Labels, Icons.
    *   These are primarily Shadcn UI primitives.

2.  **Molecules (`components/molecules`)**:
    *   Simple groups of UI elements functioning together as a unit.
    *   Examples: SearchBar (Input + Button), UserCard (Avatar + Text).

3.  **Organisms (`components/organisms`)**:
    *   Relatively complex components that form distinct sections of an interface.
    *   Examples: AppSidebar, Navbar, Footer, DataTables with filters.

4.  **Templates/Pages (`app/`)**:
    *   Page-level structures that place components into a layout.

## Styling

*   **Tailwind CSS**: Use Tailwind CSS for styling. Avoid writing custom CSS files or modules unless absolutely necessary for complex animations or legacy integration.
*   **Class Sorting**: Use the official Tailwind prettier plugin to keep class names sorted and consistent.
*   **Responsiveness**: Design mobile-first using Tailwind's breakpoints (e.g., `md:flex`, `lg:grid`).

## Navigation

*   **`<Link>` Component**: Always use the Next.js `<Link>` component for internal navigation to avoid full page reloads.
*   **Router Hooks**: Use `useRouter`, `usePathname`, and `useSearchParams` from `next/navigation` only inside Client Components.

## Performance

*   **Images**: Use the `next/image` component for images to benefit from automatic optimization, lazy loading, and sizing.
*   **Fonts**: Use `next/font` to optimize fonts and prevent Layout Shift.
*   **Lazy Loading**: Use `next/dynamic` or `React.lazy` for heavy client components that are not immediately visible.

## State Management

*   **Server State**: Prefer fetching data on the server.
*   **Client State**: For local UI state, `useState` and `useReducer` are sufficient.
*   **Global State**: If global client state is needed, consider React Context or lightweight libraries like Zustand, but use sparingly.

## Testing

*   **Unit Tests**: Write unit tests for utility functions and complex components.
*   **E2E Tests**: Use Playwright or Cypress for critical user flows.

---
*Last Updated: January 2026*
