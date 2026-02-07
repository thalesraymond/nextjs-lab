# Spec: Game Dashboard Achievements

## ADDED Requirements

### Requirement: Global Achievements Overview
The system MUST display a global overview of achievements earned by teams in the current season.

#### Scenario: User views global achievements
Given the user is on the Game Dashboard
When the page loads
Then an "Achievements" section is displayed below the timeline
And the section lists global achievements
And each achievement shows its name, description, and the percentage of teams that earned it
And the list is sorted by percentage in descending order (most common first)
