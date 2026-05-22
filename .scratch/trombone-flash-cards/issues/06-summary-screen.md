Status: done

# 06 — Summary Screen

## Parent

`.scratch/trombone-flash-cards/PRD.md`

## What to build

Implement the Summary Screen shown at the end of a Round, and replace the placeholder from issue 05 in `App.tsx`. The screen displays the Result and lets the user start a new Round.

Reference design: `docs/design/summary_screen/screen.png` and `docs/design/brass_shadow/DESIGN.md`.

The screen has: a medal/trophy icon in a circular container, "Round Complete" heading, a white score card showing "X / 20" with a visual progress indicator, an encouraging message, and a "Play Again" button. Do NOT implement the "Review Mistakes" button or the bottom navigation bar visible in the design — these are out of scope.

`App.tsx` should render `SummaryScreen` when `state.screen === 'summary'`, passing `correctCount` as a prop.

## Acceptance criteria

- [x] `App.tsx` renders `SummaryScreen` when `state.screen === 'summary'`
- [x] Summary Screen displays "Round Complete" as the main heading in `--color-primary`
- [x] A medal or award icon is displayed as a visual hero element
- [x] A white score card is displayed showing the Result as "{correctCount} / 20"
- [x] The score card includes a visual indicator (e.g. segmented bar or dots) reflecting the proportion correct, styled in brass gold
- [x] An encouraging message is shown below the score card (e.g. "Great job! Keep practising to master those slide positions.")
- [x] A "Play Again" button is displayed, full-width (minus margins), brass gold, minimum touch target height
- [x] Tapping "Play Again" dispatches `RESTART` (returning to `screen: 'welcome'`)
- [x] Background is `--color-surface` (`#0f131d`)
- [x] Layout is centred and works correctly at 390px viewport width
- [x] Styles are implemented with CSS Modules (no Tailwind)
- [x] The full Round flow is end-to-end navigable: Welcome → Quiz (20 questions) → Summary → Welcome
- [x] `vp check` passes
- [x] `vp test` passes

## Blocked by

`.scratch/trombone-flash-cards/issues/05-quiz-screen.md`
