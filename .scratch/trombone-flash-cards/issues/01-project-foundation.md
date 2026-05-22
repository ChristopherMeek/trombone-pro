Status: done

# 01 — Project foundation

## Parent

`.scratch/trombone-flash-cards/PRD.md`

## What to build

Scaffold the full project foundation so every subsequent issue can build on a working, styled base. This means migrating the Vite+ TypeScript starter to a React app, installing VexFlow, loading the Hanken Grotesk font, and establishing the Brass & Shadow design system as CSS custom properties. The output is a running app shell with the correct dependencies, fonts, and tokens in place — no screens yet, just the skeleton everything else will hang from.

Note: ignore the navigation bar, hamburger menu, user icon, "Rapid Fire"/"Pro Level" chips, and "Review Mistakes" button visible in the design screens — these are out of scope per the PRD.

## Acceptance criteria

- [x] React and ReactDOM are installed and the app renders a React root in `index.html`
- [x] VexFlow is installed as a dependency
- [x] Hanken Grotesk is loaded from Google Fonts (or self-hosted) and set as the base font family
- [x] A global CSS file exposes all Brass & Shadow design tokens as CSS custom properties, including:
  - All surface/background colours (`--color-surface`, `--color-surface-container`, etc.)
  - Primary brass gold (`--color-primary: #f2ca50`) and on-primary (`--color-on-primary: #3c2f00`)
  - Error/feedback colours (`--color-error`, `--color-correct: #4ADE80`, `--color-incorrect: #F87171`)
  - Typography scale (`--font-headline-lg`, `--font-body-md`, `--font-label-xl`, etc.) mapping to Hanken Grotesk sizes and weights from the design system
  - Spacing tokens (`--spacing-base: 8px`, `--spacing-margin-mobile: 24px`, `--spacing-touch-target-min: 48px`, etc.)
  - Border radius tokens (`--radius-default: 0.5rem`, `--radius-full: 9999px`, etc.)
- [x] The global body background is set to `--color-surface` (`#0f131d`) with `--color-on-surface` as default text colour
- [x] `vp check` passes with no lint or type errors
- [x] `vp test` passes (no tests yet is fine — suite must not error)
- [x] The app runs in the browser via `vp dev` without console errors

## Blocked by

None — can start immediately.
