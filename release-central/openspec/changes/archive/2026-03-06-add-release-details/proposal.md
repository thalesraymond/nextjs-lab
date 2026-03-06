## Why

The Release Calendar page (`/calendar`) currently only displays a flat list of releases. Users have no way to drill into a specific release to see a breakdown of its contents—GMUD items, associated PRs, squads involved, and legal-demand flags.

## What Changes

- **Release Details page** (`/calendar/[id]`): A new detail page accessible by clicking any release row in the calendar list.
- **Key numbers section**: At the top of the detail page, display 4 KPI cards—Total GMUDs, Unique Squads, Total PRs, and Total Legal-Demand GMUDs in this release.
- **GMUD table**: Below the KPIs, render a data table with columns: GMUD Number, PR Number (link), GMUD Title, Has Feature Toggle (Yes/No).
- **Navigation**: Calendar list rows become clickable and redirect to `/calendar/[id]`.
- **Mock data**: Extend existing mock data with GMUD-level detail (squad, PR link, title, feature toggle flag).

## Impact

- New route and page component added; no breaking changes to existing behaviour.
- Calendar list page receives minor modification (rows become links).
- New spec capability `release-calendar` introduced for this feature.
