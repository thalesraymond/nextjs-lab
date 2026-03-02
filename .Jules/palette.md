## 2024-05-24 - Search Input Accessibility
**Learning:** Search inputs that use only an icon and placeholder text for context (common in the UI components) lack sufficient labeling for screen readers, meaning users may miss the field's purpose if the placeholder is skipped.
**Action:** Always ensure an `aria-label` is present on `Input` components acting as search fields when a semantic `<label>` is not visually present.
## 2025-03-02 - Interactive Table Row Accessibility
**Learning:** Table rows (`<tr>`) used as interactive elements (e.g., clicking to open a sheet/modal) naturally lack keyboard accessibility and focus management. Users navigating via `Tab` will skip over them, rendering the core table content inaccessible to screen readers and keyboard users.
**Action:** When a `<TableRow>` has an `onClick` handler, explicitly add `tabIndex={0}`, an `onKeyDown` handler listening to `Enter` and `Space`, `aria-label` for screen reader context, and explicit `focus-visible` outline styles (`focus-visible:ring-2`, `focus-visible:outline-none`) to provide visual feedback and guarantee inclusive navigation.
