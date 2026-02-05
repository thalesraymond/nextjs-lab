## Context
Users need to visualize the density and timing of deliveries alongside critical game events. A timeline chart is the standard way to correlate discrete events with continuous or daily activity.

## Goals
- **Visual**: Display a time-series chart showing delivery volume per day.
- **Correlation**: Overlay or indicate days with `GameEvent` occurrences (incidents, crashes).
- **Scalability**: The mock generator allows testing the UI with 10 vs 1000 items.

## Decisions
- **Library**: Use `recharts` as it is the standard React charting library and integrates well with Tailwind (via custom components or class names). We will use it directly for this iteration to keep it lightweight, rather than pulling in the full Shadcn Chart registry immediately (unless we decide to strictly follow the Shadcn Chart pattern, but that requires more boilerplate. Direct Recharts is simpler for a single chart).
- **Data Aggregation**: The chart component will need to aggregate `delivery_items` from all squads by date (`updated_at`) to calculate daily delivery counts.
- **Events**: `GameEvent` items will also be aggregated by date.
- **Mock Generator**: A simple function `generateGameStats(params)` that returns random data conforming to the `GameStats` interface.

## Data Model
No changes to `types.ts` needed as `GameEvent` and `events` array already exist in the type definition (confirmed via file read).

## Design Pattern (Mock Generator)
- `generateGameStats({ squads: 2, deliveriesPerSquad: 10, eventsPerSquad: 5 })`
- Use helpers to generate random dates within a range (e.g., last 30 days).

## Design Pattern (Chart)
- **X-Axis**: Date (formatted).
- **Y-Axis**: Count of Deliveries.
- **Tooltip**: Show details for that date (Deliveries: X, Events: Y).
- **Type**: `BarChart` or `ComposedChart`. Bars for deliveries are clearer for daily counts.
