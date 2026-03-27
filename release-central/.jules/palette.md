## 2024-03-25 - Inline Confirmation for Destructive Actions
**Learning:** Native `window.confirm` dialogs break the immersive dark-mode UI experience and block the main thread, leading to jarring UX.
**Action:** Implemented a two-step inline confirmation button with `onBlur` and timeout auto-reset for smoother, non-blocking destructive actions in the achievements editor.