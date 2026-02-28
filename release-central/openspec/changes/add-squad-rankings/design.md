# Design: Squad Rankings Panel

## Architecture Context
The change is isolated to the frontend presentation layer within the Game Dashboard page. We will rely purely on mock data as requested, meaning no backend API changes are necessary in this phase. The UI components will be built using existing Shadcn UI patterns.

## Component Structure
- `SquadRankingsTable`: A container component that renders the table.
- `SquadDetailsSheet`: A standard Shadcn UI `Sheet` (Side Panel) is recommended over a Dialog, as lists of deliveries and events can grow long, and a Side Panel typically handles scrolling content better.
- `mockSquadData`: A new mock data structure in `data.ts` to support the rankings and the detailed list views.
