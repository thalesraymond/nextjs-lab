# menu-item Specification

## Purpose
TBD - created by archiving change performance-showcase. Update Purpose after archive.
## Requirements
### Requirement: Sidebar Navigation
The sidebar MUST display a navigation link to the new performance showcase page.
#### Scenario: User sees the new menu item
- WHEN the user opens the application
- THEN they should see a "Performance ShowCase" item in the sidebar
- AND clicking it navigates to `/performance-showcase`

#### Scenario: Active state
- WHEN the user is on `/performance-showcase`
- THEN the "Performance ShowCase" item should be highlighted as active

