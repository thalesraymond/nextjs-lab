## 1. Preparation
- [x] 1.1 Check for `Card` component in `components/ui`. If missing, add it using shadcn-ui CLI or manual copy (standard shadcn pattern).
- [x] 1.2 Create a type definition for the Game Dashboard data structure in `app/game/types.ts` (or similar).

## 2. Implementation
- [x] 2.1 Create `KPICard` component (or similar abstraction) for consistent display of metric + label.
- [x] 2.2 Implement the main KPI Header section in `app/game/page.tsx` (or a sub-component `components/game/kpi-header.tsx`).
- [x] 2.3 Populate the header with the mock data provided in the request.
- [x] 2.4 Style "Soma total por eventos" specifically, as it might need to aggregate the `score_events` object (sum of all event types or display individual counts? Request says "Soma total por eventos", implying a sum or a breakdown. I will assume a breakdown or a sum of weighted events if "Soma" implies a single number, but `score_events` has multiple keys. I'll display the breakdown of events as the request implies "Soma total" might be the object itself or a calculated total. Wait, "Soma total por eventos" -> Sum total by events. It likely means "Production Incidents: X, Crash: Y...". I will implement a display that shows these counts).

## 3. Verification
- [x] 3.1 Verify the page loads at `/game`.
- [x] 3.2 Check that the numbers match the mock data.
- [x] 3.3 Ensure responsive layout (cards stack on mobile).
