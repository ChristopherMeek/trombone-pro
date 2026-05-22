Status: ready-for-agent

# Trombone Flash Cards — PRD

## Problem Statement

Beginner trombone players struggle to internalise the relationship between notes on the bass clef staff and their corresponding slide positions. Traditional practice requires a teacher or a method book; there is no quick, self-contained tool a student can reach for on their phone between practice sessions to drill this foundational knowledge.

## Solution

A mobile-optimised web quiz that presents the user with a note on a bass clef staff and asks them to identify either the note name or the slide position from three choices. The user works through a Round of 20 Questions, gets immediate Feedback after each answer (including both the note name and canonical slide position regardless of question type), and sees their Result at the end. The app is frictionless — no login, no setup, just tap Play and start drilling.

## User Stories

1. As a beginner trombone player, I want to see a Welcome Screen explaining the quiz, so that I understand what I am about to do before I start.
2. As a beginner trombone player, I want to tap a single "Play" button to start a Round, so that I can begin practising immediately without configuration.
3. As a beginner trombone player, I want to see a note displayed on a bass clef staff, so that I can practise reading notation in the context I will actually use it.
4. As a beginner trombone player, I want to see three Choices for each Question, so that I have a manageable set of options to reason between.
5. As a beginner trombone player, I want exactly one Choice to be correct, so that I can trust there is always a right answer.
6. As a beginner trombone player, I want the Choices for a Position Question to be adjacent slide positions, so that the quiz tests genuine knowledge rather than obvious elimination.
7. As a beginner trombone player, I want the Choices for a Name Question to be adjacent notes in the Note Range, so that I have to distinguish between neighbouring notes on the staff.
8. As a beginner trombone player, I want the correct Choice to appear in a random position among the three options each time, so that I cannot guess correctly by pattern-matching the position of the answer.
9. As a beginner trombone player, I want to tap a Choice to submit my answer, so that the interaction is simple and works well on a touchscreen.
10. As a beginner trombone player, I want to see my chosen Choice highlighted green when I am correct, so that I get immediate positive reinforcement.
11. As a beginner trombone player, I want to see my chosen Choice highlighted red when I am wrong, so that I know immediately that I made a mistake.
12. As a beginner trombone player, I want to see the correct Choice highlighted green when I answer incorrectly, so that I learn the right answer even when I get it wrong.
13. As a beginner trombone player, I want to see both the note name and the canonical slide position revealed below the staff after every answer, so that I always leave each Question knowing both facts regardless of which type of Question was asked.
14. As a beginner trombone player, I want to tap a "Next" button to advance after seeing the Feedback, so that I control the pace and can take time to absorb the correct answer.
15. As a beginner trombone player, I want to see my current question number out of 20 on the Quiz Screen, so that I know how far through the Round I am.
16. As a beginner trombone player, I want each Round to contain exactly 10 Name Questions and 10 Position Questions, so that I always practise both skills equally.
17. As a beginner trombone player, I want the questions to be drawn from notes across the full Note Range, so that I practise the whole range and not just a few notes.
18. As a beginner trombone player, I want each note to appear at most once per question type within a Round, so that no single note dominates a session.
19. As a beginner trombone player, I want the 20 Questions to be presented in a random order each Round, so that I cannot memorise the sequence.
20. As a beginner trombone player, I want to see a Summary Screen when I have answered all 20 Questions, so that I know the Round is complete.
21. As a beginner trombone player, I want to see how many Questions I answered correctly out of 20 on the Summary Screen, so that I can track my performance.
22. As a beginner trombone player, I want to tap a "Play Again" button on the Summary Screen, so that I can immediately start a new Round without navigating away.
23. As a beginner trombone player, I want the app to work well on a mobile phone screen, so that I can use it anywhere without needing a desktop or laptop.
24. As a beginner trombone player, I want the quiz to cover the notes F2 through C4 in bass clef (natural notes plus B♭ and E♭), so that the range is appropriate for an early-stage player on a standard tenor trombone.
25. As a beginner trombone player, I want the app to use a single canonical slide position per note, so that I learn the standard first-position approach taught in method books.

## Implementation Decisions

### Module: `src/data/notes.ts`

The single source of truth for all domain data. Exports:

- The ordered array of 15 Notes in the Note Range (F2 → C4, naturals + B♭ + E♭)
- A mapping from each Note to its Canonical Position (integer 1–7)
- A mapping from each Note to its display Note Name string (e.g. "B♭", "E♭", "F")
- A mapping from each Note to its VexFlow key string for Staff rendering
- A `getDistractors(note, type)` pure function that returns the two nearest-neighbour Choices for a given Note and Question type, with boundary-safe window shifting

The Canonical Position for each Note in the Note Range is:

| Note | Position |     | Note | Position |
| ---- | -------- | --- | ---- | -------- |
| F2   | 6th      |     | F3   | 1st      |
| G2   | 4th      |     | G3   | 4th      |
| A2   | 2nd      |     | A3   | 2nd      |
| B♭2  | 1st      |     | B♭3  | 1st      |
| B2   | 7th      |     | B3   | 4th      |
| C3   | 6th      |     | C4   | 6th      |
| D3   | 4th      |     |      |          |
| E♭3  | 3rd      |     |      |          |
| E3   | 2nd      |     |      |          |

### Module: `src/engine/round.ts`

A pure function `generateRound()` that returns a shuffled array of 20 typed Question objects. Process:

1. Shuffle the 15-note Note Range and take the first 10 → 10 Name Questions
2. Shuffle the 15-note Note Range again and take the first 10 → 10 Position Questions
3. Combine and shuffle the 20 Questions together
4. For each Question, call `getDistractors` and shuffle the three Choices into a random display order

Each Question object carries: the Note, the Question type (name | position), the three Choices in display order, and the index of the correct Choice.

### Module: `src/engine/quizState.ts`

A pure reducer (no side effects, no React dependency) that manages the application state machine:

```
welcome → playing → feedback → playing → … → summary → welcome
```

State shape:

- `screen`: `'welcome' | 'playing' | 'feedback' | 'summary'`
- `questions`: Question array (empty until a Round starts)
- `currentIndex`: number
- `selectedChoice`: number | null
- `correctCount`: number

Actions: `START_ROUND`, `SELECT_CHOICE`, `NEXT_QUESTION`, `RESTART`

### Module: `src/components/StaffDisplay`

A React component that accepts a Note and uses VexFlow to render a bass clef Staff with that Note. VexFlow is rendered into a DOM element via a `useEffect`. The component is responsible for all VexFlow lifecycle management (create, update, destroy).

### Screens

- **`src/components/WelcomeScreen`** — renders the app name, a two/three line explanation, and a "Play" button that dispatches `START_ROUND`
- **`src/components/QuizScreen`** — renders the progress indicator, StaffDisplay, question type label, three ChoiceButton components, and (after selection) the Feedback annotation and "Next" button
- **`src/components/SummaryScreen`** — renders "Round Complete", the Result as "X / 20 correct", and a "Play Again" button

### `src/App.tsx`

Holds the quiz state (via `useReducer` over `quizState.ts`) and conditionally renders the correct screen based on `state.screen`.

### Styling

CSS Modules for all components. No Tailwind — ever. Mobile-first layout targeting 390px viewport width.

### Staff rendering

VexFlow renders the Staff at runtime. The Note Range and vocabulary are fixed, so VexFlow is always given well-understood, predictable input. See ADR-0005.

## Testing Decisions

**What makes a good test:** tests should assert on observable outputs given controlled inputs. Do not test internal implementation details, private functions, or React component internals. A test should break when behaviour changes, not when the implementation is refactored.

### `src/data/notes.ts`

- All 15 notes are present in the Note Range in the correct order
- Each Note maps to the correct Canonical Position per the table above
- `getDistractors` returns exactly 2 Distractors
- Distractors are always different from the correct answer and from each other
- For a Note in the middle of the range, Distractors are the two immediate neighbours
- For a Note at the lower boundary, the window shifts up (no wrapping)
- For a Note at the upper boundary, the window shifts down (no wrapping)
- Distractor behaviour is consistent for both Position Questions and Name Questions

### `src/engine/round.ts`

- `generateRound()` returns exactly 20 Questions
- Exactly 10 are Name Questions and exactly 10 are Position Questions
- No Note appears more than once among the Name Questions
- No Note appears more than once among the Position Questions
- Each Question has exactly 3 Choices
- The correct Choice index is always 0, 1, or 2
- The correct Choice value matches the Note's Canonical Position (Position Question) or Note Name (Name Question)
- Calling `generateRound()` twice produces different orderings (probabilistic — run a few times)

### `src/engine/quizState.ts`

- Initial state is the Welcome Screen
- `START_ROUND` transitions to the playing screen with 20 Questions loaded
- `SELECT_CHOICE` with the correct index transitions to feedback and increments `correctCount`
- `SELECT_CHOICE` with an incorrect index transitions to feedback without incrementing `correctCount`
- `SELECT_CHOICE` is a no-op when already in feedback state (no double-submission)
- `NEXT_QUESTION` after the last Question transitions to the Summary Screen
- `NEXT_QUESTION` before the last Question advances `currentIndex` and returns to playing
- `RESTART` from the Summary Screen returns to the Welcome Screen with reset state

## Out of Scope

- Chromatic notes beyond B♭ and E♭ (sharps, other flats) — v2
- User-selectable modes (note names only / positions only / mixed) — v2
- Progress persistence across sessions (no localStorage, no backend)
- Alternate/non-canonical slide positions
- Alto or bass trombone variants
- Treble clef or transposing notation
- Sound / audio playback
- Animations or transitions between screens
- Accessibility audit (ARIA, screen reader support) — should be revisited before any public launch
- Authentication or user accounts

## Further Notes

- The 15-note Note Range and Canonical Position table in `src/data/notes.ts` are the single source of truth for the entire app. Any future expansion of the vocabulary (more notes, accidentals, alternate positions) starts there.
- VexFlow renders into a DOM node; the StaffDisplay component must clean up the VexFlow renderer on unmount to avoid memory leaks.
- The quizState reducer has no knowledge of VexFlow or React — it is a plain TypeScript module and should stay that way.
- Tailwind CSS is explicitly prohibited. See ADR-0004.
