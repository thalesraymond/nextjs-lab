# Change: Add Timeline Chart and Mock Generator

## Why
The game dashboard needs a visual representation of deliveries and events over time to help users understand release cadence and correlation with events (incidents, reviews). Additionally, the current static mock data is insufficient for testing scenarios with large datasets.

## What Changes
- Add `recharts` library for data visualization.
- Create a `MockGenerator` utility to generate variable amounts of game data (squads, deliveries, events).
- Implement a "Timeline de Entregas" chart on the Game Dashboard (`app/game/page.tsx`).
- The chart will plot deliveries (based on `updated_at`) and overlay events (based on `GameEvent` dates).

## Impact
- **Specs**: Modify `game-dashboard` capability.
- **Code**:
    - Add `recharts` dependency.
    - New `app/game/utils/mock-generator.ts`.
    - New `app/game/_components/timeline-chart.tsx`.
    - Update `app/game/page.tsx`.
