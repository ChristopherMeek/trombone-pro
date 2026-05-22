import { NOTE_RANGE, getDistractors, type QuestionType } from "../data/notes";

export type Question =
  | { type: "name"; noteIndex: number; choices: string[]; correctChoiceIndex: number }
  | { type: "position"; noteIndex: number; choices: number[]; correctChoiceIndex: number };

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

  if (type === "position") {
    const entries = shuffle([
      { value: note.canonicalPosition, isCorrect: true },
      { value: (distractors as number[])[0], isCorrect: false },
      { value: (distractors as number[])[1], isCorrect: false },
    ]);
    return {
      type,
      noteIndex,
      choices: entries.map((e) => e.value),
      correctChoiceIndex: entries.findIndex((e) => e.isCorrect),
    };
  } else {
    const entries = shuffle([
      { value: note.name, isCorrect: true },
      { value: (distractors as string[])[0], isCorrect: false },
      { value: (distractors as string[])[1], isCorrect: false },
    ]);
    return {
      type,
      noteIndex,
      choices: entries.map((e) => e.value),
      correctChoiceIndex: entries.findIndex((e) => e.isCorrect),
    };
  }
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
