# Change: Add Backoffice Home Landing Page

## Why
The sidebar currently exposes each backoffice sub-page individually ("backoffice calendar", "backoffice release items"), creating clutter. Consolidating them under a single "Backoffice" sidebar entry that redirects to a landing page improves navigation and leaves room for future backoffice features without further sidebar changes.

## What Changes
- Replace the two backoffice sidebar entries with a single "Backoffice" item linking to `/backoffice`
- Create a new landing page at `/backoffice` with cards/links to all backoffice sub-pages (Calendar, Release Items)
- Update the existing sidebar test to match the new navigation structure

## Impact
- Affected specs: `release-backoffice`
- Affected code: `components/app-sidebar.tsx`, `components/__tests__/app-sidebar.test.tsx`, `app/backoffice/page.tsx` (new)
