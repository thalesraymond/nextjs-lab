## 1. Implementation
- [x] 1.1 Update `components/app-sidebar.tsx`: replace the two backoffice entries with a single "Backoffice" item linking to `/backoffice`
- [x] 1.2 Create `app/backoffice/page.tsx`: landing page with card links to Calendar and Release Items sub-pages
- [x] 1.3 Update `components/__tests__/app-sidebar.test.tsx` to assert the new sidebar structure

## 2. Verification
- [x] 2.1 Run `pnpm test` and confirm sidebar tests pass
- [x] 2.2 Visual verification: navigate to `/backoffice` and confirm the landing page renders correctly
- [x] 2.3 Visual verification: confirm sidebar shows a single "Backoffice" menu item
