# Spec: Theme Switching

## ADDED Requirements

### Requirement: User can toggle between Light, Dark, and System themes
The application MUST provide a user interface element to switch between Light, Dark, and System color themes. This preference MUST be persisted.

#### Scenario: Switching to Dark Mode
- Given the user is on the application
- And the current theme is "Light"
- When the user selects "Dark" from the theme toggle
- Then the application background changes to dark color
- And text changes to light color
- And the preference is saved

#### Scenario: Switching to Light Mode
- Given the user is on the application
- And the current theme is "Dark"
- When the user selects "Light" from the theme toggle
- Then the application background changes to light color
- And text changes to dark color
- And the preference is saved

#### Scenario: Defaulting to System Preference
- Given the user visits the application for the first time
- When the page loads
- Then the theme matches the operating system's preference (Light or Dark)
