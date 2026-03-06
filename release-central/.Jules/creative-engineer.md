# Creative Engineer Journal

## 2026-03-05 - Squad Data Is Under-Surfaced in Release Details
**Learning:** The `GmudDetail` type in `calendar/data.ts` has a `squad` field that was only used for an aggregate KPI count ("Squads Envolvidas"). The detail table itself never displayed or filtered by it. This is a recurring pattern in the app — data is available in the model but not yet surfaced in the UI. Check for similar under-surfaced fields before ideating new features.
**Action:** When exploring feature gaps, always compare the data model (`types.ts`, `data.ts`) against what the UI actually renders. Hidden fields = hidden opportunity.
