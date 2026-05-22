import { NOTE_RANGE, getDistractors, type QuestionType } from "../data/notes";

export interface Question {
  noteIndex: number;
  type: QuestionType;
  choices: string[];
  correctChoiceIndex: number;
}

function toOrdinal(n: number): string {
  if (n === 1) return "1st";
  if (n === 2) return "2nd";
  if (n === 3) return "3rd";
  return `${n}th`;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sampleIndices(count: number, total: number): number[] {
  const indices = Array.from({ length: total }, (_, i) => i);
  return shuffle(indices).slice(0, count);
}

function buildQuestion(noteIndex: number, type: QuestionType): Question {
  const note = NOTE_RANGE[noteIndex];
  const distractors = getDistractors(noteIndex, type);

  let correctValue: string;
  let distractorValues: string[];

  if (type === "position") {
    correctValue = toOrdinal(note.canonicalPosition);
    distractorValues = (distractors as number[]).map(toOrdinal);
  } else {
    correctValue = note.name;
    distractorValues = distractors as string[];
  }

  const entries = shuffle([
    { value: correctValue, isCorrect: true },
    { value: distractorValues[0], isCorrect: false },
    { value: distractorValues[1], isCorrect: false },
  ]);

  return {
    noteIndex,
    type,
    choices: entries.map((e) => e.value),
    correctChoiceIndex: entries.findIndex((e) => e.isCorrect),
  };
}

/**
 * Generates one Round: 10 Name Questions and 10 Position Questions, each
 * sampled without replacement from the 15-note Note Range, combined and shuffled.
 */
export function generateRound(): Question[] {
  const nameIndices = sampleIndices(10, NOTE_RANGE.length);
  const posIndices = sampleIndices(10, NOTE_RANGE.length);

  const nameQuestions = nameIndices.map((i) => buildQuestion(i, "name"));
  const posQuestions = posIndices.map((i) => buildQuestion(i, "position"));

  return shuffle([...nameQuestions, ...posQuestions]);
}
