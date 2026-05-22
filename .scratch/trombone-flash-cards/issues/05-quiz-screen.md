Status: ready-for-agent

# 05 — Quiz Screen

## Parent

`.scratch/trombone-flash-cards/PRD.md`

## What to build

Implement the Quiz Screen — the core interaction of the app. This slice covers both states: the **active state** (user hasn't answered yet) and the **feedback state** (user has selected a Choice and sees the result). Also implement the `StaffDisplay` component which uses VexFlow to render a bass clef Staff for the current Note.

Reference designs:

- Active state: `docs/design/quiz_active_updated_notation/screen.png`
- Feedback state: `docs/design/quiz_answered_updated_notation/screen.png`
- Design tokens: `docs/design/brass_shadow/DESIGN.md`

`App.tsx` should render `QuizScreen` for both `screen: 'playing'` and `screen: 'feedback'` states. When `screen: 'summary'` is reached (after `NEXT_QUESTION` on the last question), `App.tsx` should render a placeholder `SummaryScreen` (implemented in the next issue) — a simple "Round complete" text is sufficient for now so the flow is end-to-end testable.

Do NOT implement the navigation bar, hamburger menu, or settings icon visible in the design.

## Acceptance criteria

### StaffDisplay

- [ ] Renders a VexFlow bass clef Staff for a given note from the Note Range
- [ ] Uses the note's `vexflowKey` from `src/data/notes.ts` for VexFlow rendering
- [ ] Renders correctly for all 15 notes including ledger lines (F2, C4) and accidentals (B♭2, E♭3, B♭3)
- [ ] Cleans up the VexFlow renderer on unmount (no memory leaks)
- [ ] Displayed on a dark card surface matching the design

### Quiz Screen — active state

- [ ] Shows "QUESTION {n} OF 20" progress indicator
- [ ] Shows a thin brass gold progress bar at the top reflecting current progress through the Round
- [ ] Shows the question label: "What is the note name?" or "What is the slide position?" depending on Question type, in `--color-primary`
- [ ] Renders `StaffDisplay` for the current Question's Note
- [ ] Shows exactly 3 Choice buttons in the shuffled display order from the Question
- [ ] Choice buttons are full-width, minimum `--spacing-touch-target-min` height, dark background (`--color-surface-container-high`), white text, `--radius-default` border radius
- [ ] Tapping a Choice button dispatches `SELECT_CHOICE` with the choice index

### Quiz Screen — feedback state

- [ ] The chosen Choice button turns red (`--color-incorrect: #F87171`) with an ✗ icon if incorrect
- [ ] The correct Choice button turns green (`--color-correct: #4ADE80`) with a ✓ icon
- [ ] The unchosen, non-correct button is visually dimmed/inactive
- [ ] A feedback annotation is shown below the buttons in `--color-primary`: "{Note Name} — {n}th position" (e.g. "D3 — 4th position")
- [ ] A full-width "Next →" button is shown in brass gold
- [ ] Tapping "Next →" dispatches `NEXT_QUESTION`
- [ ] Choice buttons are non-interactive in the feedback state (no double-submission)

### General

- [ ] Layout works correctly at 390px viewport width
- [ ] Styles are implemented with CSS Modules (no Tailwind)
- [ ] `vp check` passes
- [ ] `vp test` passes

## Blocked by

`.scratch/trombone-flash-cards/issues/03-quiz-engine.md`
