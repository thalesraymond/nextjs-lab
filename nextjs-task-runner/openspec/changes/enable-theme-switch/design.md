# Design: Enable Theme Switch

## Architectural Decisions

### Library Selection: `next-themes`
We will use `next-themes` for handling theme switching.
- **Why**: It is the de-facto standard for Next.js theme management. It handles hydration mismatch issues (avoiding flash of incorrect theme) and supports system preference detection out of the box.
- **Integration**: It will be integrated via a client-side `ThemeProvider` component wrapping the application's children in `layout.tsx`.

### CSS Variables Strategy (Tailwind v4)
Tailwind CSS v4 introduces native CSS variable support for configuration.
- We will define `--background`, `--foreground` and other shadcn-ui compatible variables in `globals.css` inside `@theme` or `:root/.dark` blocks.
- `next-themes` will toggle the `class="dark"` on the `html` element.
- Tailwind will apply styles based on this class selector.

## Accessibility
- The toggle button will be accessible via keyboard navigation.
- Use `aria-label` to indicate current state and action.
