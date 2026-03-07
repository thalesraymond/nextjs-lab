## ADDED Requirements

### Requirement: Release Item Flags
Every release item (package) SHALL include a `flags` object with four boolean fields, all defaulting to `false`.

#### Scenario: Flags initialized on creation
- **WHEN** a new release is created via POST `/api/releases`
- **THEN** every generated package item SHALL have `flags` with `causedProductionIncident: false`, `causedRegressionCrash: false`, `codeReviewDiscussions: false`, `prWasReverted: false`

#### Scenario: Flags structure
- **WHEN** inspecting a package item in the database
- **THEN** it MUST contain a `flags` object with exactly four boolean fields

### Requirement: Release Items Listing API
The system SHALL expose a `GET /api/release-items` endpoint that returns a paginated, filterable list of all release items across all releases.

#### Scenario: Default pagination
- **WHEN** a GET request is sent to `/api/release-items` without query params
- **THEN** the system returns the first 20 items sorted by release deadline descending
- **AND** the response includes `items`, `total`, `page`, `limit`, and `totalPages`

#### Scenario: Filtering by date range
- **WHEN** a GET request includes `dateFrom` and/or `dateTo` query params
- **THEN** only items from releases whose `dateLimit` falls within the range are returned

#### Scenario: Filtering by platform
- **WHEN** a GET request includes `platform=android` or `platform=ios`
- **THEN** only items from releases of the specified platform are returned

#### Scenario: Filtering by release
- **WHEN** a GET request includes `releaseId` query param
- **THEN** only items from the specified release are returned

#### Scenario: Text search
- **WHEN** a GET request includes a `search` query param
- **THEN** items are filtered by case-insensitive match on `title`, `squad`, `prNumber`, or `gmudNumber`

### Requirement: Release Item Flag Update API
The system SHALL expose a `PATCH /api/release-items/[releaseId]/[itemIndex]` endpoint to update flags on a specific release item.

#### Scenario: Updating flags
- **WHEN** a PATCH request is sent with a valid `releaseId`, `itemIndex`, and a `flags` object
- **THEN** the system updates only the specified flags on the package item
- **AND** returns the updated release item

#### Scenario: Invalid release or index
- **WHEN** a PATCH request is sent with an invalid `releaseId` or out-of-range `itemIndex`
- **THEN** the system returns a 400 or 404 error

### Requirement: Release Items Backoffice Page
The system SHALL provide a backoffice page at `/backoffice/release-items` displaying a paginated, filterable table of all release items.

#### Scenario: Viewing the release items list
- **WHEN** the user navigates to `/backoffice/release-items`
- **THEN** a table is displayed with columns: Title, Squad, Platform, Version, PR, GMUD, Feature Toggle, Legal Demand
- **AND** pagination controls are available below the table

#### Scenario: Using filters
- **WHEN** the user applies date range, platform, or release filters
- **THEN** the table updates to show only matching items
- **AND** the filters are reflected in the URL search params

#### Scenario: Searching items
- **WHEN** the user types in the search input
- **THEN** the table filters items by matching title, squad, PR number, or GMUD number

### Requirement: Release Item Detail View
The system SHALL provide a detail view (side panel) when a release item is clicked, showing all item fields as read-only and providing flag toggle controls.

#### Scenario: Opening item details
- **WHEN** the user clicks on a release item row
- **THEN** a side panel opens showing all package item fields (read-only)
- **AND** the parent release version and platform are displayed

#### Scenario: Toggling flags
- **WHEN** the user checks or unchecks a flag checkbox in the detail view
- **THEN** the system sends a PATCH request to update the flag
- **AND** a success indicator is shown

### Requirement: Release Items Navigation
The sidebar SHALL include a "backoffice release items" entry linking to `/backoffice/release-items`.

#### Scenario: Sidebar shows release items link
- **WHEN** the sidebar is rendered
- **THEN** a "backoffice release items" navigation item is visible linking to `/backoffice/release-items`
