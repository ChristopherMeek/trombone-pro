import { type Dispatch } from "react";
import type { QuizState, Action } from "../../engine/quizState";
import { NOTE_RANGE } from "../../data/notes";
import { StaffDisplay } from "../StaffDisplay/StaffDisplay";
import styles from "./QuizScreen.module.css";

interface QuizScreenProps {
  state: QuizState;
  dispatch: Dispatch<Action>;
}

function toOrdinal(n: number): string {
  if (n === 1) return "1st";
  if (n === 2) return "2nd";
  if (n === 3) return "3rd";
  return `${n}th`;
}

/** Returns the note name with octave, e.g. "D3", "B♭2" */
function noteNameWithOctave(noteIndex: number): string {
  const note = NOTE_RANGE[noteIndex];
  const octave = note.vexflowKey.split("/")[1];
  return `${note.name}${octave}`;
}

function getChoiceResult(
  choiceIndex: number,
  selectedChoice: number | null,
  correctChoiceIndex: number,
): "correct" | "incorrect" | "inactive" {
  if (choiceIndex === correctChoiceIndex) return "correct";
  if (choiceIndex === selectedChoice) return "incorrect";
  return "inactive";
}

export function QuizScreen({ state, dispatch }: QuizScreenProps) {
  const { screen, questions, currentIndex, selectedChoice } = state;
  const question = questions[currentIndex];
  const note = NOTE_RANGE[question.noteIndex];
  const questionNumber = currentIndex + 1;
  const totalQuestions = 20;
  const progressPercent = (questionNumber / totalQuestions) * 100;
  const isFeedback = screen === "feedback";

  const questionLabel =
    question.type === "name" ? "What is the note name?" : "What is the slide position?";

  const feedbackAnnotation = isFeedback
    ? `${noteNameWithOctave(question.noteIndex)} — ${toOrdinal(note.canonicalPosition)} position`
    : null;

  return (
    <div className={styles.container}>
      <div
        className={styles.progressBar}
        role="progressbar"
        aria-valuenow={questionNumber}
        aria-valuemin={1}
        aria-valuemax={totalQuestions}
        aria-label="Quiz progress"
      >
        <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
      </div>

      <div className={styles.content}>
        <p className={styles.progressLabel}>
          QUESTION {questionNumber} OF {totalQuestions}
        </p>

        <p className={styles.questionLabel}>{questionLabel}</p>

        <div className={styles.staffWrapper}>
          <StaffDisplay note={note} />
        </div>

        <div className={styles.choices}>
          {question.choices.map((choice, i) => {
            const result = isFeedback
              ? getChoiceResult(i, selectedChoice, question.correctChoiceIndex)
              : null;
            return (
              <button
                key={i}
                type="button"
                data-testid={`choice-${i}`}
                data-result={result ?? undefined}
                className={`${styles.choiceButton} ${result ? styles[result] : ""}`}
                disabled={isFeedback}
                onClick={() => dispatch({ type: "SELECT_CHOICE", payload: i })}
              >
                {result === "correct" && <span className={styles.icon}>✓</span>}
                {result === "incorrect" && <span className={styles.icon}>✗</span>}
                {choice}
              </button>
            );
          })}
        </div>

        {isFeedback && feedbackAnnotation && (
          <p className={styles.feedbackAnnotation}>{feedbackAnnotation}</p>
        )}

        {isFeedback && (
          <button
            type="button"
            className={styles.nextButton}
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
