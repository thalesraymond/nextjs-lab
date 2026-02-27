## 1. Scaffold and Data Mocking
- [ ] 1.1 Create `app/vitals/page.tsx` and the basic layout structure with ambient backgrounds to match the site vibe.
- [ ] 1.2 Create `app/vitals/data.ts` with comprehensive mocked data for version list, rollout statuses, stability metrics, and user comments.

## 2. UI Components Construction
- [ ] 2.1 Implement `VitalsHeader` to show the page title ("Release Vitals") and top-level context with gradient text styling.
- [ ] 2.2 Implement `RolloutStatus` component using `Card` primitives to display current release phases visually.
- [ ] 2.3 Implement `VitalsKPIs` component to display crash-free rate, ANR rate, and hang rate stats.
- [ ] 2.4 Implement `VersionList` component using `Table` primitives from `components/ui` to show recent versions and adoptions.
- [ ] 2.5 Implement `UserFeedback` component to show average ratings and recent mocked comments in a scrollable list or grid.

## 3. Integration
- [ ] 3.1 Assemble all components in `app/vitals/page.tsx` aligning them into a cohesive dashboard grid or layout.
- [ ] 3.2 Add a navigation link to `/vitals` in the Home page (`app/page.tsx`) or sidebar (`components/app-sidebar.tsx`) to make it discoverable.
