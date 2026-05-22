import { generateRound, type Question } from "./round";

export type Screen = "welcome" | "playing" | "feedback" | "summary";

export interface QuizState {
  screen: Screen;
  questions: Question[];
  currentIndex: number;
  selectedChoice: number | null;
  correctCount: number;
}

export type Action =
  | { type: "START_ROUND" }
  | { type: "SELECT_CHOICE"; payload: number }
  | { type: "NEXT_QUESTION" }
  | { type: "RESTART" };

export const initialState: QuizState = {
  screen: "welcome",
  questions: [],
  currentIndex: 0,
  selectedChoice: null,
  correctCount: 0,
};

/**
 * Pure reducer for the quiz state machine.
 *
 * Transitions:
 *   welcome → (START_ROUND) → playing
 *   playing → (SELECT_CHOICE) → feedback
 *   feedback → (NEXT_QUESTION before last) → playing
 *   feedback → (NEXT_QUESTION at last) → summary
 *   any → (RESTART) → welcome
 */
export function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case "START_ROUND":
      return {
        screen: "playing",
        questions: generateRound(),
        currentIndex: 0,
        selectedChoice: null,
        correctCount: 0,
      };

    case "SELECT_CHOICE": {
      if (state.screen !== "playing") return state;
      const q = state.questions[state.currentIndex];
      const isCorrect = action.payload === q.correctChoiceIndex;
      return {
        ...state,
        screen: "feedback",
        selectedChoice: action.payload,
        correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
      };
    }

    case "NEXT_QUESTION": {
      if (state.screen !== "feedback") return state;
      const isLast = state.currentIndex === 19;
      if (isLast) {
        return { ...state, screen: "summary" };
      }
      return {
        ...state,
        screen: "playing",
        currentIndex: state.currentIndex + 1,
        selectedChoice: null,
      };
    }

    case "RESTART":
      return { ...initialState };

    default:
      return state;
  }
}
