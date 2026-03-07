# Change: Add Backoffice Authentication

## Why
We need to secure the backoffice to prevent unauthorized access. The application needs a register page and a login mechanism using the existing MongoDB connection.

## What Changes
- Create a registration page at the home route (`/`).
- Users must provide a name, email, and password during registration.
- Newly registered users will be saved to MongoDB with `admin: false` by default.
- Admins will be configured directly in the database for now.
- Require login to access any route inside `/backoffice`.
- Move the current release creation page from the backoffice base path (`/backoffice`) to `/backoffice/calendar`.

## Impact
- Affected specs: `backoffice-authentication` (new), `release-backoffice` (modified).
- Affected code: New authentication API routes, middleware, and UI components. `app/backoffice/page.tsx` will be moved to `app/backoffice/calendar/page.tsx`.
