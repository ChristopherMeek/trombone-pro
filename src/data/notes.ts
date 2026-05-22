export interface Note {
  name: string;
  canonicalPosition: number;
  vexflowKey: string;
}

export type QuestionType = "name" | "position";

export const NOTE_RANGE: Note[] = [
  { name: "F", canonicalPosition: 6, vexflowKey: "f/2" },
  { name: "G", canonicalPosition: 4, vexflowKey: "g/2" },
  { name: "A", canonicalPosition: 2, vexflowKey: "a/2" },
  { name: "B♭", canonicalPosition: 1, vexflowKey: "bb/2" },
  { name: "B", canonicalPosition: 7, vexflowKey: "b/2" },
  { name: "C", canonicalPosition: 6, vexflowKey: "c/3" },
  { name: "D", canonicalPosition: 4, vexflowKey: "d/3" },
  { name: "E♭", canonicalPosition: 3, vexflowKey: "eb/3" },
  { name: "E", canonicalPosition: 2, vexflowKey: "e/3" },
  { name: "F", canonicalPosition: 1, vexflowKey: "f/3" },
  { name: "G", canonicalPosition: 4, vexflowKey: "g/3" },
  { name: "A", canonicalPosition: 2, vexflowKey: "a/3" },
  { name: "B♭", canonicalPosition: 1, vexflowKey: "bb/3" },
  { name: "B", canonicalPosition: 4, vexflowKey: "b/3" },
  { name: "C", canonicalPosition: 6, vexflowKey: "c/4" },
];

/**
 * Returns two Distractor values for the given Note index and Question type.
 *
 * For a Position Question, distractors are the Canonical Positions of the two
 * neighbouring Notes in the Note Range.
 * For a Name Question, distractors are the Note Names of the two neighbouring Notes.
 *
 * At either boundary of the Note Range the window shifts inward (no wrapping).
 */
export function getDistractors(noteIndex: number, type: QuestionType): (string | number)[] {
  const last = NOTE_RANGE.length - 1;

  let lo: number;
  let hi: number;

  if (noteIndex <= 0) {
    lo = 1;
    hi = 2;
  } else if (noteIndex >= last) {
    lo = last - 2;
    hi = last - 1;
  } else {
    lo = noteIndex - 1;
    hi = noteIndex + 1;
  }

  if (type === "position") {
    return [NOTE_RANGE[lo].canonicalPosition, NOTE_RANGE[hi].canonicalPosition];
  } else {
    return [NOTE_RANGE[lo].name, NOTE_RANGE[hi].name];
  }
}
