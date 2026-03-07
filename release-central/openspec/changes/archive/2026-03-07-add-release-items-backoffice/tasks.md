## 1. Data Model
- [x] 1.1 Add `ReleaseItemFlags` interface to `lib/types.ts`
- [x] 1.2 Add `flags` field to `PackageItem` interface
- [x] 1.3 Update `generatePackages()` in `app/api/releases/route.ts` to initialize flags as `false`

## 2. API Endpoints
- [x] 2.1 Create `GET /api/release-items` with pagination (page, limit), filters (dateFrom, dateTo, platform, releaseId), and text search
- [x] 2.2 Create `PATCH /api/release-items/[releaseId]/[itemIndex]` to update flags on a specific package item
- [x] 2.3 Add input validation and error handling for both endpoints

## 3. Frontend — Release Items List Page
- [x] 3.1 Create `/backoffice/release-items/page.tsx` with paginated table
- [x] 3.2 Add filter controls: date range picker, platform select, release select
- [x] 3.3 Add search input for text search across title/squad/PR
- [x] 3.4 Implement pagination controls (prev/next, page indicator)

## 4. Frontend — Release Item Detail View
- [x] 4.1 Add detail view (dialog/sheet) showing full item info (read-only fields)
- [x] 4.2 Add flag toggle controls (checkboxes) for the four flags
- [x] 4.3 Implement PATCH call to save flag changes

## 5. Navigation
- [x] 5.1 Add "backoffice release items" entry to sidebar navigation

## 6. Verification
- [x] 6.1 Verify API pagination and filters work correctly via browser
- [x] 6.2 Verify flag toggling persists correctly
- [x] 6.3 Run existing tests to ensure no regressions (`pnpm test`)
