Status: done

# 04 — Welcome Screen

## Parent

`.scratch/trombone-flash-cards/PRD.md`

## What to build

Implement the Welcome Screen component and wire it into `App.tsx` as the first thing a user sees. The screen must match the Brass & Shadow design (see `docs/design/welcome_screen/screen.png` and `docs/design/brass_shadow/DESIGN.md`) and dispatch `START_ROUND` when the Play button is tapped.

The screen has: a centred music note icon in a circular container, the app title "Trombone Flash Cards" in brass gold, two lines of descriptive text, and a full-width "Play ▶" button at the bottom. Do NOT implement the navigation bar, hamburger menu, user icon, or "Rapid Fire"/"Pro Level" mode chips visible in the design — these are out of scope.

`App.tsx` should hold quiz state via `useReducer` over the `quizState` reducer and render `WelcomeScreen` when `state.screen === 'welcome'`.

## Acceptance criteria

- [x] `App.tsx` uses `useReducer` with the `quizState` reducer and initial state
- [x] `App.tsx` renders `WelcomeScreen` when `state.screen === 'welcome'`
- [x] Welcome Screen displays the app title "Trombone Flash Cards"
- [x] Welcome Screen displays a brief explanation of the quiz (note on staff, identify name or position, 20 questions per round)
- [x] Welcome Screen displays a "Play" button
- [x] Tapping "Play" dispatches `START_ROUND` (transitioning app to `screen: 'playing'`)
- [x] A music note icon or similar musical motif is present as a visual hero element
- [x] Background is `--color-surface` (`#0f131d`)
- [x] App title is in `--color-primary` (brass gold) using the headline-lg typography token
- [x] "Play" button is full-width (minus `--spacing-margin-mobile` margins), minimum `--spacing-touch-target-min` height, brass gold background, dark text, `--radius-default` border radius
- [x] Layout is centred and works correctly at 390px viewport width
- [x] Styles are implemented with CSS Modules (no Tailwind)
- [x] `vp check` passes
- [x] `vp test` passes

## Blocked by

`.scratch/trombone-flash-cards/issues/03-quiz-engine.md`
