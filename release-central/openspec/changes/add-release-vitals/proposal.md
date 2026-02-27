# Change: Add Release Vitals Cockpit

## Why
To provide a consolidated "cockpit" view of release health, allowing teams to monitor version rollout, stability, and user feedback in one place.

## What Changes
- Add a new `/vitals` route.
- Add components to display version lists, rollout status, performance vitals (crash-free rate, ANR, hang rate), and user ratings/comments.
- Keep data mocked and local for now, structuring the data model so API integration later is straightforward.

## Impact
- Affected specs: `release-vitals` (new capability added).
- Affected code: `app/vitals/page.tsx`, `app/vitals/data.ts`, `app/vitals/_components/*`, and navigation in `app/page.tsx` or `components/app-sidebar.tsx`.
