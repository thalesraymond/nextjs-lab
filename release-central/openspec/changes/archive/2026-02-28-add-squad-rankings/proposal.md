# Proposal: Add Squad Rankings Panel

## Problem statement
The Game Dashboard currently lacks a detailed view of how individual squads are performing against each other. Users need visibility into squad rankings, their tier classifications, and the ability to drill down into specific squad details (deliveries, events, and scores).

## Proposed solution
We will add a new "Squad Rankings" panel to the `release-central/app/game/page.tsx` spec (`game-dashboard`). This panel will present a mock data-driven list of squads with their position, position delta (up/down/equal), name, release train, community, total points, total deliveries, and a tier (1 to 5). Users will be able to click on a squad to open a side panel containing detailed metrics and lists of deliveries and events. All text and labels will be in Portuguese (pt-br).
