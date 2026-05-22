# Trombone Flash Cards

A mobile-optimised web quiz that drills beginner trombone players on note names and slide positions in bass clef at concert pitch.

## Language

**Note**:
A single pitch within the quiz vocabulary, identified by its letter name, accidental, and octave (e.g. "B♭3"). The app works in bass clef at concert pitch for a standard tenor trombone.
_Avoid_: pitch, tone

**Note Name**:
The human-readable label for a Note, written as letter + optional accidental (e.g. "B♭", "E♭", "F"). Octave is implicit from context when the range is unambiguous.
_Avoid_: pitch name, tone name

**Slide Position**:
An integer 1–7 representing which of the seven positions on a tenor trombone slide is used to produce a given Note.
_Avoid_: position number, trombone position

**Note Range**:
The set of Notes the quiz draws from: F2 up to C4 inclusive, restricted to natural notes plus B♭ and E♭. Specifically: F2, G2, A2, B♭2, B2, C3, D3, E♭3, E3, F3, G3, A3, B♭3, B3, C4 (15 pitches).
_Avoid_: note set, pitch range

**Question**:
A single quiz prompt consisting of a Staff showing one Note and three Choices, exactly one of which is correct. A Question is either a Name Question (identify the Note Name) or a Position Question (identify the Slide Position).
_Avoid_: card, prompt, challenge

**Name Question**:
A Question where the user is shown a Note on the Staff and must identify the correct Note Name from three Choices.

**Position Question**:
A Question where the user is shown a Note on the Staff and must identify the correct Slide Position from three Choices.

**Choice**:
One of three options presented to the user for a given Question. Exactly one Choice per Question is correct; the other two are distractors.
_Avoid_: option, answer, button

**Distractor**:
An incorrect Choice. Distractors are the two nearest neighbours to the correct answer — adjacent slide positions for Position Questions, adjacent notes in the Note Range for Name Questions. At range boundaries the window shifts inward (e.g. 1st position → distractors are 2nd and 3rd). The three Choices are always shuffled into a random display order so the correct answer has no predictable position.
_Avoid_: wrong answer, fake answer

**Canonical Position**:
The single authoritative Slide Position assigned to each Note in the Note Range. Where a note is playable in multiple positions, the lowest-numbered (most commonly taught) position is canonical. The quiz always uses the Canonical Position as the correct Choice for Position Questions.
_Avoid_: standard position, default position, primary position

**Round**:
A complete sequence of 20 Questions: 10 Name Questions and 10 Position Questions, each type sampled without replacement from the 15-note Note Range (so each note appears at most once per type per Round), then shuffled together randomly. A Round ends when all 20 Questions have been answered.
_Avoid_: game, session, quiz run

**Feedback**:
The visual response shown after the user selects a Choice. The chosen Choice is highlighted green (correct) or red (incorrect); if incorrect, the correct Choice is also highlighted green. Below the Staff, both the Note Name and Canonical Position are revealed regardless of Question type. A "Next" button appears to advance to the next Question.
_Avoid_: result, response, answer reveal

**Result**:
The outcome of a completed Round: the count of correct and incorrect answers shown on the Summary Screen.
_Avoid_: score, summary

**Welcome Screen**:
The initial page of the app — a brief explanation of the quiz and a "Play" button to begin the first Round.
_Avoid_: home screen, landing page, intro screen

**Quiz Screen**:
The screen shown during an active Round. Displays the current Question number, the Staff, the three Choices, and (after selection) the Feedback and "Next" button.
_Avoid_: game screen, question screen

**Summary Screen**:
The screen shown after a Round completes, displaying the Result and a "Play Again" button to start a new Round.
_Avoid_: results screen, end screen, game over

**Staff**:
The rendered five-line bass clef staff used to display the Note for each Question. Implemented using VexFlow, which programmatically renders the clef, note head, ledger lines, and accidentals at runtime into an SVG or Canvas element.
_Avoid_: stave, score

## Example dialogue

> **Dev:** When the user gets a question wrong, do we retry that note later in the same Round?
> **Domain expert:** No — each Round is exactly 20 Questions and then you see your Result. No repeats within a Round.
>
> **Dev:** So a Round always has 20 unique Questions?
> **Domain expert:** They can repeat notes — two Questions might show the same Note but one is a Name Question and one is a Position Question, or just the same type twice by chance. The 20 are sampled, not uniquely exhaustive.
