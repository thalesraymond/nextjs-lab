## Context
We need a "Release Vitals" page acting as a cockpit for the current release health. It must follow the existing "gamey" and dark theme style with blue accents and ambient glows, similar to the existing Rankings Dashboard and the Landing Page.

## Goals / Non-Goals
- Goals: Display version lists, rollout status, crash-free/ANR/hang rates, and user ratings/comments in a unified, styled dashboard. Keep data mocked and local. Re-use existing UI components where possible (`Card`, `Table`, `Badge`, etc.) to adhere to the design system without building custom primitive components.
- Non-Goals: API integration (will come later). Complex interactive filtering or deeply interactive charts beyond basic visual representation.

## Decisions
- Decision: Use the `app/vitals` route to house the application.
- Decision: Define `mockVitalsData` in `app/vitals/data.ts` to simulate an API response containing rollout metrics, KPIs, and comments. This prepares the structure for real integration.
- Decision: Create specific internal components within `app/vitals/_components/` such as `VersionList`, `RolloutStatus`, `VitalsKPIs`, and `UserFeedback`. Use Shadcn-like existing primitives from `components/ui`.
- Decision: Layout will include a secondary sidebar to switch between app versions, keeping the main page context bound to the selected version.

## Risks / Trade-offs
- Risk: Creating too many custom layout components that drift from the design system.
  - Mitigation: Stick to provided primitives (`Card`, `Table`, `Skeleton`, `Separator`) and standard Tailwind classes conforming to the dark/vibrant theme (e.g., using `bg-card`, `border-primary/20`, `text-muted-foreground`).

## Migration Plan
N/A - This is a purely additive change introducing a new route.

## Open Questions
- Is there a specific external API structure (like Google Play Console or App Store Connect) we should mimic closely for the mocks?
