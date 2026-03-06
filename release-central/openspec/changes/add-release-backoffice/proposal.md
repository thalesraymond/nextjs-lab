# Change: Add Release Backoffice & Database Integration

## Why
The calendar currently displays hardcoded mock data. We need a backoffice page to create releases directly in MongoDB and update the calendar to read from the database instead of mock data.

## What Changes
- Fix MongoDB URI to point to `release-central` database
- Create API route `POST /api/releases` to persist new releases
- Create API route `GET /api/releases` to fetch all releases
- Create backoffice page at `/backoffice` with a release creation form (platform, version, deadline, gmud)
- Add "backoffice" entry to the sidebar navigation
- Update `/calendar` page to fetch releases from the database (Server Component data fetching)
- Update `/calendar/[id]` page to fetch from database
- Releases created via backoffice default to `packageCount: 0` and `legalDemands: 0`

## Impact
- Affected specs: `release-calendar` (MODIFIED), `release-backoffice` (NEW)
- Affected code: `.env`, `app/backoffice/`, `app/api/releases/`, `app/calendar/page.tsx`, `app/calendar/[id]/page.tsx`, `app/calendar/data.ts`, `components/app-sidebar.tsx`
