## 1. Data Layer
- [ ] 1.1 Define `GmudDetail` type (gmudNumber, prNumber, prUrl, title, squad, hasFeatureToggle, isLegalDemand)
- [ ] 1.2 Create extended mock data mapping each Release `id` to an array of `GmudDetail` items
- [ ] 1.3 Export a helper `getReleaseById(id)` and `getGmudsByReleaseId(id)` from a shared data module

## 2. Release Details Page
- [ ] 2.1 Create `/app/calendar/[id]/page.tsx` route
- [ ] 2.2 Implement KPI cards section (Total GMUDs, Unique Squads, Total PRs, Legal-Demand GMUDs)
- [ ] 2.3 Implement GMUD table (GMUD Number, PR Number link, GMUD Title, Has Feature Toggle)
- [ ] 2.4 Add back-navigation link to `/calendar`
- [ ] 2.5 Handle not-found case (invalid release id)

## 3. Calendar List Integration
- [ ] 3.1 Make release rows clickable, redirecting to `/calendar/[id]`

## 4. Validation
- [ ] 4.1 Run `pnpm build` to verify no type or build errors
- [ ] 4.2 Browser-test: click a release row → verify navigation to detail page with correct data
- [ ] 4.3 Browser-test: verify KPI cards show correct numbers and GMUD table renders all rows
