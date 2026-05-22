Status: ready-for-agent

# 02 — Notes data layer

## Parent

`.scratch/trombone-flash-cards/PRD.md`

## What to build

Implement `src/data/notes.ts` — the single source of truth for all musical domain data. This pure TypeScript module (no React, no DOM) exports the 15-note Note Range, the canonical Slide Position for each Note, the display Note Name string for each Note, the VexFlow key string for each Note, and a `getDistractors` function. It is the foundation that both the round engine and the StaffDisplay component depend on.

The 15 notes in order are: F2, G2, A2, B♭2, B2, C3, D3, E♭3, E3, F3, G3, A3, B♭3, B3, C4.

Canonical positions:
F2→6, G2→4, A2→2, B♭2→1, B2→7, C3→6, D3→4, E♭3→3, E3→2, F3→1, G3→4, A3→2, B♭3→1, B3→4, C4→6

`getDistractors(noteIndex, type)` returns the two nearest-neighbour values for the given question type ('name' | 'position'). For position questions, neighbours are adjacent canonical position values in the ordered list of positions for the 15 notes; for name questions, neighbours are the adjacent notes in the Note Range array. At either boundary the window shifts inward (no wrapping).

## Acceptance criteria

- [ ] `NOTE_RANGE` exported array contains exactly 15 notes in order F2 → C4
- [ ] Each note has a `name` string (e.g. `"B♭"`, `"E♭"`, `"F"`) using the flat symbol ♭, not `b`
- [ ] Each note has a `canonicalPosition` integer matching the table in the PRD
- [ ] Each note has a `vexflowKey` string in the correct format for VexFlow bass clef rendering (e.g. `"f/2"`, `"bb/3"`)
- [ ] `getDistractors(noteIndex, 'position')` returns exactly 2 Distractor canonical position values
- [ ] `getDistractors(noteIndex, 'name')` returns exactly 2 Distractor note name strings
- [ ] Distractors are always different from the correct answer and from each other
- [ ] For a note in the middle of the range, distractors are the two immediate neighbours
- [ ] For the lowest note (F2), the window shifts up — no index below 0
- [ ] For the highest note (C4), the window shifts down — no index beyond the last
- [ ] All of the above are covered by unit tests using domain vocabulary from `CONTEXT.md`
- [ ] `vp test` passes
- [ ] `vp check` passes

## Blocked by

`.scratch/trombone-flash-cards/issues/01-project-foundation.md`
