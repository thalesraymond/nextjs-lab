## ADDED Requirements
### Requirement: Release Vitals Dashboard
The system SHALL provide a unified dashboard to visualize release health, tracking rollout progress, performance vitals, and user feedback.

#### Scenario: User views the vitals page
- **WHEN** a user navigates to `/vitals`
- **THEN** the system displays a cockpit-style dashboard with mock data for versions, rollout status, stability metrics (Crash-free, ANR, Hangs), and user ratings/comments.

### Requirement: Rollout and Version Tracking
The dashboard SHALL display the current rollout status and a history of recent versions to track release propagation.

#### Scenario: View rollout progress
- **WHEN** the dashboard loads
- **THEN** the rollout percentage and stage for the active release are shown.

#### Scenario: View version history
- **WHEN** the dashboard loads
- **THEN** a list of recent application versions is presented with their respective adoption or statuses.

### Requirement: Performance Vitals Display
The dashboard SHALL show key performance indicators related to application stability.

#### Scenario: View stability metrics
- **WHEN** observing the vitals section
- **THEN** metrics for crash-free rate, ANR (Application Not Responding) rate, and hang rate are displayed.

### Requirement: User Feedback Display
The dashboard SHALL present user ratings and recent comments to gauge user satisfaction.

#### Scenario: Read user comments
- **WHEN** scrolling to the feedback section
- **THEN** the average user rating and a list of mocked user comments are displayed.

### Requirement: Version Selection
The dashboard SHALL provide a secondary sidebar to allow users to select between the current released version and older active versions.

#### Scenario: Select an older version
- **WHEN** the user selects an older active version from the secondary sidebar
- **THEN** the dashboard updates to display the release vitals specific to the selected version.
