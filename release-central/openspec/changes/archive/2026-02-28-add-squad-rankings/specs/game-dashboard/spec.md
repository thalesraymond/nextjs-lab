## ADDED Requirements

### Requirement: Squad Rankings Panel
The Game Dashboard SHALL display a panel containing a list of squads and their rankings.

#### Scenario: Displaying the Squad Rankings
- **WHEN** the user views the Squad Rankings panel
- **THEN** it MUST display a list of squads.
- **AND** each squad entry MUST include Position, Position Delta (with icons for up, down, or equal and the number of positions changed), Squad Name, Release Train Name, Community Name, Total Points, Total Deliveries, and Tier (1 to 5).
- **AND** the tier MUST be calculated based on the following rules: Tier 1 (Top 15%), Tier 2 (Next 20%), Tier 3 (Next 30%), Tier 4 (Next 20%), Tier 5 (Bottom 15%).
- **AND** all labels and texts MUST be in Portuguese (pt-br).

### Requirement: Squad Details View
The system SHALL provide a detailed view for a specific squad when selected from the rankings panel.

#### Scenario: Opening Squad Details
- **WHEN** the user clicks on a squad in the rankings list
- **THEN** a side panel or popup MUST open.
- **AND** it MUST display the squad's Total Deliveries, Total Events, and Total Score.
- **AND** it MUST display a list of Delivery Items (showing number and title).
- **AND** it MUST display a list of Events (showing name).
- **AND** all labels and texts MUST be in Portuguese (pt-br).
