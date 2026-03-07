## MODIFIED Requirements
### Requirement: Release Creation Form
The system SHALL provide a backoffice page at `/backoffice/calendar` with a form to register new releases.

#### Scenario: User fills and submits the release form
- **WHEN** the user fills in platform (android/ios), version number, deadline (data limite), and optionally a GMUD number
- **AND** the user submits the form
- **THEN** the system persists the release in the `release` collection of MongoDB
- **AND** the release is created with `packageCount: 0` and `legalDemands: 0`
- **AND** the user sees a success confirmation

#### Scenario: User submits form with missing required fields
- **WHEN** the user submits the form without platform, version, or deadline
- **THEN** the system displays validation errors and does not persist the release

#### Scenario: GMUD is optional and can be added later
- **WHEN** the user creates a release without a GMUD number
- **THEN** the release is saved with an empty GMUD field
- **AND** the GMUD can be updated later on the release item

### Requirement: Backoffice Navigation
The system SHALL include a "backoffice calendar" entry in the sidebar navigation.

#### Scenario: Sidebar shows backoffice calendar link
- **WHEN** the sidebar is rendered
- **THEN** a "backoffice calendar" navigation item is visible linking to `/backoffice/calendar`
