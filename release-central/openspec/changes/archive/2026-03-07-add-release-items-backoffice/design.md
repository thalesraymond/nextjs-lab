## Context
Release items (packages) are currently embedded arrays inside `ReleaseDocument`. They have no independent identity or endpoint. We need to expose them as a flat, searchable, paginated list across all releases while keeping the embedded document structure in MongoDB (no separate collection).

## Goals / Non-Goals
- **Goals**: List all release items with server-side pagination, filter by date/platform/release, toggle quality-event flags, detail view
- **Non-Goals**: CRUD for release items (they remain auto-generated), editing item fields beyond flags, separate MongoDB collection for items

## Decisions

### 1. Query Strategy: MongoDB Aggregation Pipeline
- **Decision**: Use `$unwind` + `$match` + `$skip/$limit` on the `release` collection to flatten and paginate items server-side.
- **Why**: Keeps the embedded document structure, avoids data duplication, and leverages MongoDB's built-in pagination.
- **Alternative**: Separate `release_items` collection → rejected due to data sync complexity and migration cost for a backoffice-only feature.

### 2. Item Addressing: `releaseId` + `itemIndex`
- **Decision**: Identify items by their parent release `_id` and array index.
- **Why**: `PackageItem` has no unique `_id`. Using `$set` with positional index (`packages.<index>.flags`) is a simple, atomic MongoDB update.
- **Alternative**: Add `_id` to each PackageItem → more robust but heavier migration; may be done later if needed.

### 3. Flags Schema
```typescript
interface ReleaseItemFlags {
  causedProductionIncident: boolean;
  causedRegressionCrash: boolean;
  codeReviewDiscussions: boolean;
  prWasReverted: boolean;
}
```
All flags default to `false`. Stored on each `PackageItem`.

### 4. Pagination
- Server-side pagination with `page` and `limit` query params (default: page=1, limit=20).
- API returns `{ items, total, page, limit, totalPages }`.

### 5. Frontend Architecture
- Single page at `/backoffice/release-items` using client component for interactivity.
- Uses URL search params for filter state (shareable links).
- Detail view as a Sheet (side panel) to avoid page navigation.
- Shadcn UI components: `Table`, `Select`, `Input`, `Checkbox`, `Sheet`, `Button`.

## Risks / Trade-offs
- **Array index addressing** — If items are reordered or deleted, indexes shift. Acceptable because items are never deleted or reordered in current design.
- **Aggregation performance** — `$unwind` on large datasets can be slow. Acceptable for backoffice usage patterns; can add indexes later if needed.

## Open Questions
- None at this time.
