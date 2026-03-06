# Change: Add MongoDB Connection

## Why
Currently, the application relies on simple data mocks. To proceed with real feature implementation and data persistence for releases and squads, we need to integrate a real database. We will use MongoDB (as indicated by the provided `.env`).

## What Changes
- Install MongoDB client dependencies.
- Implement a cached MongoDB connection utility suitable for Next.js App Router (to prevent exhausted connections in development).
- Document the environment variable in `.exemple.env`.

## Impact
- Affected specs: `database-integration`
- Affected code: `lib/db/mongodb.ts` (or similar utility)
