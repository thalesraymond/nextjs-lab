# Change: Add Release Items Backoffice

## Why
Release items (packages) are currently generated automatically during release creation and have no dedicated UI for browsing, searching, or flagging. The game dashboard uses hardcoded mock data for score events. We need a backoffice section that lets operators browse all release items across all releases with pagination and filters, view item details, and flag items with quality events (production incident, regression/crash, code review discussions, PR reverted).

## What Changes
- Add `flags` object to `PackageItem` type with four boolean fields (default `false`)
- Update the release creation API to initialize flags on every generated package
- Add new API endpoint `GET /api/release-items` with pagination, filtering (date range, platform, release), and search
- Add new API endpoint `PATCH /api/release-items/[releaseId]/[itemIndex]` to update flags on a specific release item
- Add new backoffice page at `/backoffice/release-items` with paginated table, filters, and search
- Add release item detail view (read-only) with flag toggle controls
- Add sidebar navigation entry for the new backoffice section

## Impact
- Affected specs: `release-backoffice`
- Affected code:
  - `lib/types.ts` — add `ReleaseItemFlags` type
  - `app/api/releases/route.ts` — initialize flags on creation
  - `app/api/release-items/route.ts` — **NEW** listing endpoint
  - `app/api/release-items/[releaseId]/[itemIndex]/route.ts` — **NEW** flag update endpoint
  - `app/backoffice/release-items/page.tsx` — **NEW** listing page
  - `components/app-sidebar.tsx` — add nav entry
