## 1. Database & Environment
- [x] 1.1 Fix `.env` MONGODB_URI to include `/release-central` database name
- [x] 1.2 Update `.exemple.env` with the database name placeholder

## 2. API Routes
- [x] 2.1 Create `app/api/releases/route.ts` with GET (list all) and POST (create release)
- [x] 2.2 Define Release MongoDB document type in `lib/types.ts`

## 3. Backoffice Page
- [x] 3.1 Create `app/backoffice/page.tsx` with release creation form (platform, version, deadline, gmud)
- [x] 3.2 Add form validation (platform required, version required, deadline required, gmud optional)
- [x] 3.3 Show success/error feedback after submission

## 4. Calendar Database Integration
- [x] 4.1 Refactor `app/calendar/page.tsx` to fetch releases from MongoDB (Server Component)
- [x] 4.2 Refactor `app/calendar/[id]/page.tsx` to fetch release from database
- [x] 4.3 Create `app/api/releases/[id]/route.ts` for single release lookup
- [x] 4.4 Keep `data.ts` for existing GMUD details (not part of this change)

## 5. Navigation
- [x] 5.1 Add "backoffice" link to `components/app-sidebar.tsx`

## 6. Verification
- [x] 6.1 Run `pnpm build` to verify no build errors
- [x] 6.2 API endpoints tested via curl (all passing)
- [x] 6.3 Run `pnpm test` — 31/31 tests pass
