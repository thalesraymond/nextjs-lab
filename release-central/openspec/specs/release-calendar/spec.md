# release-calendar Specification

## Purpose
TBD - created by archiving change add-release-details. Update Purpose after archive.
## Requirements
### Requirement: Release Details Page
The system SHALL provide a detail page at `/calendar/[id]` that displays the full breakdown of a selected release, fetched from the MongoDB `release` collection.

#### Scenario: User clicks a release row in the calendar list
- **WHEN** the user clicks on a release row in the calendar list
- **THEN** the system navigates to `/calendar/{releaseId}`
- **AND** the detail page displays release information fetched from the database

#### Scenario: Invalid release ID
- **WHEN** the user navigates to `/calendar/{id}` with a non-existent release ID
- **THEN** the system displays a not-found message with a link back to the calendar list

### Requirement: Release KPI Cards
The release detail page SHALL display a section with 4 key metric cards at the top.

#### Scenario: Displaying key metrics
- **WHEN** the release detail page is loaded for a valid release
- **THEN** the page displays:
  - Total GMUDs in this release
  - Unique Squads contributing to this release
  - Total PRs in this release
  - Total Legal-Demand GMUDs in this release

### Requirement: GMUD Details Table
The release detail page SHALL display a table listing every GMUD in the release.

#### Scenario: Displaying the GMUD table
- **WHEN** the release detail page is loaded
- **THEN** a table is rendered with columns: GMUD Number, PR Number (as a clickable link), GMUD Title, Has Feature Toggle (Yes/No)
- **AND** each row represents one GMUD belonging to the release

### Requirement: Calendar List Row Navigation
Each release row in the calendar list SHALL be clickable and navigate to the release detail page.

#### Scenario: Row click navigates to detail
- **WHEN** the user clicks any release row on the `/calendar` page
- **THEN** the browser navigates to `/calendar/{releaseId}`

### Requirement: Database-Backed Release List
The calendar list page SHALL fetch releases from the MongoDB `release` collection instead of using hardcoded mock data.

#### Scenario: Calendar loads releases from database
- **WHEN** the user navigates to `/calendar`
- **THEN** the system queries the `release` collection and renders all stored releases
- **AND** releases created via backoffice with no packages show `0` in the package count column

