# Proposal: Add Achievements Overview to Game Dashboard

## Summary
Add a new section to the Game Dashboard (`/game`) that displays a global overview of team achievements for the current season. This section will mimic Steam's global achievement statistics, showing the achievement details and the percentage of teams that have earned them, sorted from most common to least common.

## Motivation
To provide players (teams) with visibility into the broader context of the game, encouraging competition and showing what milestones are being reached by the community.

## Proposed Solution
1.  **Data Model**: Extend `GameStats` to include a list of `Achievement` objects.
2.  **Mock Data**: Update the mock generator to create random global achievement statistics.
3.  **UI**: Create a new `AchievementsList` component that renders these achievements in a list/grid format, sorted by percentage (descending).
4.  **Integration**: Add this component to `app/game/page.tsx` below the existing timeline chart.
