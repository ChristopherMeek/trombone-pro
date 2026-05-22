import { describe, it, expect } from "vite-plus/test";
import { initialState, reducer, type QuizState } from "./quizState";

describe("quizState — initial state", () => {
  it("initial state has screen: 'welcome'", () => {
    expect(initialState.screen).toBe("welcome");
  });

  it("initial state has empty questions array", () => {
    expect(initialState.questions).toHaveLength(0);
  });

  it("initial state has correctCount of 0", () => {
    expect(initialState.correctCount).toBe(0);
  });

  it("initial state has currentIndex of 0", () => {
    expect(initialState.currentIndex).toBe(0);
  });

  it("initial state has selectedChoice of null", () => {
    expect(initialState.selectedChoice).toBeNull();
  });
});

describe("quizState — START_ROUND action", () => {
  it("START_ROUND transitions to screen: 'playing'", () => {
    const next = reducer(initialState, { type: "START_ROUND" });
    expect(next.screen).toBe("playing");
  });

  it("START_ROUND loads exactly 20 Questions", () => {
    const next = reducer(initialState, { type: "START_ROUND" });
    expect(next.questions).toHaveLength(20);
  });

  it("START_ROUND sets currentIndex to 0", () => {
    const next = reducer(initialState, { type: "START_ROUND" });
    expect(next.currentIndex).toBe(0);
  });

  it("START_ROUND resets correctCount to 0", () => {
    // Even if called from a state with non-zero correctCount
    const withScore: QuizState = {
      ...initialState,
      screen: "summary",
      correctCount: 15,
    };
    const next = reducer(withScore, { type: "START_ROUND" });
    expect(next.correctCount).toBe(0);
  });
});

describe("quizState — SELECT_CHOICE action", () => {
  function playingState(): QuizState {
    return reducer(initialState, { type: "START_ROUND" });
  }

  it("SELECT_CHOICE transitions to screen: 'feedback'", () => {
    const state = playingState();
    const next = reducer(state, {
      type: "SELECT_CHOICE",
      payload: state.questions[0].correctChoiceIndex,
    });
    expect(next.screen).toBe("feedback");
  });

  it("SELECT_CHOICE with the correct index increments correctCount", () => {
    const state = playingState();
    const q = state.questions[0];
    const next = reducer(state, {
      type: "SELECT_CHOICE",
      payload: q.correctChoiceIndex,
    });
    expect(next.correctCount).toBe(1);
  });

  it("SELECT_CHOICE with an incorrect index does not increment correctCount", () => {
    const state = playingState();
    const q = state.questions[0];
    const wrongIndex = (q.correctChoiceIndex + 1) % 3;
    const next = reducer(state, {
      type: "SELECT_CHOICE",
      payload: wrongIndex,
    });
    expect(next.correctCount).toBe(0);
  });

  it("SELECT_CHOICE records the selected Choice", () => {
    const state = playingState();
    const q = state.questions[0];
    const next = reducer(state, {
      type: "SELECT_CHOICE",
      payload: q.correctChoiceIndex,
    });
    expect(next.selectedChoice).toBe(q.correctChoiceIndex);
  });

  it("SELECT_CHOICE is a no-op when screen is already 'feedback'", () => {
    const state = playingState();
    const afterFirst = reducer(state, {
      type: "SELECT_CHOICE",
      payload: state.questions[0].correctChoiceIndex,
    });
    expect(afterFirst.screen).toBe("feedback");
    const afterSecond = reducer(afterFirst, {
      type: "SELECT_CHOICE",
      payload: 0,
    });
    expect(afterSecond).toStrictEqual(afterFirst);
  });
});

describe("quizState — NEXT_QUESTION action", () => {
  function feedbackStateAtIndex(index: number): QuizState {
    let state = reducer(initialState, { type: "START_ROUND" });
    // Advance to the target index via NEXT_QUESTION cycles
    for (let i = 0; i < index; i++) {
      state = reducer(state, {
        type: "SELECT_CHOICE",
        payload: state.questions[i].correctChoiceIndex,
      });
      state = reducer(state, { type: "NEXT_QUESTION" });
    }
    // Now select a choice to reach feedback at the given index
    state = reducer(state, {
      type: "SELECT_CHOICE",
      payload: state.questions[index].correctChoiceIndex,
    });
    return state;
  }

  it("NEXT_QUESTION before the last Question advances currentIndex", () => {
    const state = feedbackStateAtIndex(0);
    const next = reducer(state, { type: "NEXT_QUESTION" });
    expect(next.currentIndex).toBe(1);
  });

  it("NEXT_QUESTION before the last Question returns to screen: 'playing'", () => {
    const state = feedbackStateAtIndex(5);
    const next = reducer(state, { type: "NEXT_QUESTION" });
    expect(next.screen).toBe("playing");
  });

  it("NEXT_QUESTION at the last Question (index 19) transitions to screen: 'summary'", () => {
    const state = feedbackStateAtIndex(19);
    const next = reducer(state, { type: "NEXT_QUESTION" });
    expect(next.screen).toBe("summary");
  });

  it("NEXT_QUESTION at the last Question does not advance currentIndex beyond 19", () => {
    const state = feedbackStateAtIndex(19);
    const next = reducer(state, { type: "NEXT_QUESTION" });
    expect(next.currentIndex).toBe(19);
  });
});

describe("quizState — RESTART action", () => {
  it("RESTART transitions to screen: 'welcome'", () => {
    const state = reducer(initialState, { type: "START_ROUND" });
    const restarted = reducer(state, { type: "RESTART" });
    expect(restarted.screen).toBe("welcome");
  });

  it("RESTART resets correctCount to 0", () => {
    let state = reducer(initialState, { type: "START_ROUND" });
    state = reducer(state, {
      type: "SELECT_CHOICE",
      payload: state.questions[0].correctChoiceIndex,
    });
    const restarted = reducer(state, { type: "RESTART" });
    expect(restarted.correctCount).toBe(0);
  });

  it("RESTART clears the questions array", () => {
    const state = reducer(initialState, { type: "START_ROUND" });
    const restarted = reducer(state, { type: "RESTART" });
    expect(restarted.questions).toHaveLength(0);
  });
});
