## MODIFIED Requirements

### Requirement: Release Details Page
The system SHALL provide a detail page at `/calendar/[id]` that displays the full breakdown of a selected release, fetched from the MongoDB `release` collection.

#### Scenario: User clicks a release row in the calendar list
- **WHEN** the user clicks on a release row in the calendar list
- **THEN** the system navigates to `/calendar/{releaseId}`
- **AND** the detail page displays release information fetched from the database

#### Scenario: Invalid release ID
- **WHEN** the user navigates to `/calendar/{id}` with a non-existent release ID
- **THEN** the system displays a not-found message with a link back to the calendar list

## ADDED Requirements

### Requirement: Database-Backed Release List
The calendar list page SHALL fetch releases from the MongoDB `release` collection instead of using hardcoded mock data.

#### Scenario: Calendar loads releases from database
- **WHEN** the user navigates to `/calendar`
- **THEN** the system queries the `release` collection and renders all stored releases
- **AND** releases created via backoffice with no packages show `0` in the package count column
