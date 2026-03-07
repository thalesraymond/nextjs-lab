## 1. Authentication Infrastructure
- [ ] 1.1 Create the User schema in `lib/mongodb.ts` or a separate model file using the existing MongoDB connection
- [ ] 1.2 Implement the register API endpoint (`/api/auth/register`) handling password hashing and `admin: false` default
- [ ] 1.3 Implement the login approach (either NextAuth, IronSession, or custom cookies session) using MongoDB

## 2. Frontend Components
- [ ] 2.1 Create the register page at the home route (`/`)
- [ ] 2.2 Create the login page for backoffice access

## 3. Backoffice Protection & Routing
- [ ] 3.1 Implement middleware or layout checks to protect all `/backoffice/*` routes, requiring authentication
- [ ] 3.2 Move the release creation page from `app/backoffice/page.tsx` to `app/backoffice/calendar/page.tsx`
- [ ] 3.3 Update sidebar navigation and any internal links to reflect the `/backoffice/calendar` change
