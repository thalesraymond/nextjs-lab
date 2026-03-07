# backoffice-authentication Specification

## Purpose
TBD - created by archiving change add-backoffice-auth. Update Purpose after archive.
## Requirements
### Requirement: User Registration
The system SHALL provide a register page at the home route (`/`).

#### Scenario: Successful registration
- **WHEN** the user provides a valid name, email, and password
- **AND** submits the registration form
- **THEN** an account is created in the database
- **AND** the user is saved with `admin: false` role by default

### Requirement: Backoffice Access Control
The system SHALL require users to be authenticated to access any page under the `/backoffice` path.

#### Scenario: Unauthenticated access attempt
- **WHEN** an unauthenticated user navigates to `/backoffice` or its subpages
- **THEN** the system redirects the user to the login page

#### Scenario: Authenticated access
- **WHEN** a logged-in user navigates to `/backoffice`
- **THEN** the system grants access and displays the requested page

