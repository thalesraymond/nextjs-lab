## ADDED Requirements
### Requirement: Backoffice Landing Page
The system SHALL provide a landing page at `/backoffice` that lists all backoffice sub-sections as navigable cards.

#### Scenario: Viewing the backoffice home
- **WHEN** the user navigates to `/backoffice`
- **THEN** a landing page is displayed with cards linking to "Calendar" (`/backoffice/calendar`) and "Release Items" (`/backoffice/release-items`)

## MODIFIED Requirements
### Requirement: Backoffice Navigation
The sidebar SHALL include a single "Backoffice" entry linking to `/backoffice`.

#### Scenario: Sidebar shows single backoffice link
- **WHEN** the sidebar is rendered
- **THEN** a single "Backoffice" navigation item is visible linking to `/backoffice`
- **AND** individual backoffice sub-page entries are NOT shown in the sidebar

## REMOVED Requirements
### Requirement: Release Items Navigation
**Reason**: Consolidated into the single "Backoffice" sidebar entry that leads to the landing page.
**Migration**: Users navigate via the backoffice landing page cards instead.
