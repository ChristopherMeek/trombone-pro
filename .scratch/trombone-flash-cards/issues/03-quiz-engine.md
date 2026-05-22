Status: ready-for-agent

# 03 — Quiz engine

## Parent

`.scratch/trombone-flash-cards/PRD.md`

## What to build

Implement two pure TypeScript modules (no React, no DOM):

**`src/engine/round.ts`** — exports `generateRound()`, which returns a shuffled array of 20 typed Question objects: 10 Name Questions and 10 Position Questions, each type sampled without replacement from the 15-note Note Range, then combined and shuffled. Each Question carries the note index, question type, three Choices in randomised display order, and the index of the correct Choice.

**`src/engine/quizState.ts`** — exports a pure reducer and initial state for the app state machine:

```
welcome → playing → feedback → playing → … → summary → welcome
```

State shape: `{ screen, questions, currentIndex, selectedChoice, correctCount }`
Actions: `START_ROUND`, `SELECT_CHOICE`, `NEXT_QUESTION`, `RESTART`

These two modules together represent all non-UI application logic.

## Acceptance criteria

### `round.ts`

- [ ] `generateRound()` returns exactly 20 Questions
- [ ] Exactly 10 are Name Questions and exactly 10 are Position Questions
- [ ] No note index appears more than once among the 10 Name Questions
- [ ] No note index appears more than once among the 10 Position Questions
- [ ] Each Question has exactly 3 Choices
- [ ] The correct Choice index is 0, 1, or 2
- [ ] For a Position Question, the correct Choice value matches the note's canonical position
- [ ] For a Name Question, the correct Choice value matches the note's display name
- [ ] Calling `generateRound()` twice produces a different question order (verified across multiple calls)

### `quizState.ts`

- [ ] Initial state has `screen: 'welcome'`
- [ ] `START_ROUND` action transitions to `screen: 'playing'` with 20 Questions loaded and `currentIndex: 0`
- [ ] `SELECT_CHOICE` with the correct index transitions to `screen: 'feedback'` and increments `correctCount`
- [ ] `SELECT_CHOICE` with an incorrect index transitions to `screen: 'feedback'` without incrementing `correctCount`
- [ ] `SELECT_CHOICE` is a no-op when `screen` is already `'feedback'`
- [ ] `NEXT_QUESTION` before the last question advances `currentIndex` and returns to `screen: 'playing'`
- [ ] `NEXT_QUESTION` after the last question (index 19) transitions to `screen: 'summary'`
- [ ] `RESTART` transitions to `screen: 'welcome'` with reset state (correctCount 0, questions cleared)

### General

- [ ] All acceptance criteria above are covered by unit tests using domain vocabulary from `CONTEXT.md`
- [ ] `vp test` passes
- [ ] `vp check` passes

## Blocked by

`.scratch/trombone-flash-cards/issues/02-notes-data-layer.md`
