## 2024-05-24 - Search Input Accessibility
**Learning:** Search inputs that use only an icon and placeholder text for context (common in the UI components) lack sufficient labeling for screen readers, meaning users may miss the field's purpose if the placeholder is skipped.
**Action:** Always ensure an `aria-label` is present on `Input` components acting as search fields when a semantic `<label>` is not visually present.
