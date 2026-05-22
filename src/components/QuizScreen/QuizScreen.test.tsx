import { describe, it, expect, vi } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuizScreen } from "./QuizScreen";
import type { QuizState } from "../../engine/quizState";

// A minimal playing state fixture
function makePlaying(overrides?: Partial<QuizState>): QuizState {
  return {
    screen: "playing",
    questions: [
      {
        noteIndex: 6, // D3, canonicalPosition 4
        type: "name",
        choices: ["D", "C", "E♭"],
        correctChoiceIndex: 0,
      },
      {
        noteIndex: 6,
        type: "position",
        choices: ["4th", "6th", "2nd"],
        correctChoiceIndex: 0,
      },
    ],
    currentIndex: 0,
    selectedChoice: null,
    correctCount: 0,
    ...overrides,
  };
}

function makeFeedback(overrides?: Partial<QuizState>): QuizState {
  return {
    screen: "feedback",
    questions: [
      {
        noteIndex: 6,
        type: "name",
        choices: ["D", "C", "E♭"],
        correctChoiceIndex: 0,
      },
    ],
    currentIndex: 0,
    selectedChoice: 0,
    correctCount: 1,
    ...overrides,
  };
}

describe("QuizScreen — active state", () => {
  it("shows QUESTION 1 OF 20 progress indicator", () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makePlaying()} dispatch={dispatch} />);
    expect(screen.getByText(/question 1 of 20/i)).toBeInTheDocument();
  });

  it("shows QUESTION 5 OF 20 when currentIndex is 4", () => {
    const dispatch = vi.fn();
    const baseQ = {
      noteIndex: 6,
      type: "name" as const,
      choices: ["D", "C", "E♭"],
      correctChoiceIndex: 0,
    };
    const state = makePlaying({
      currentIndex: 4,
      questions: [baseQ, baseQ, baseQ, baseQ, baseQ],
    });
    render(<QuizScreen state={state} dispatch={dispatch} />);
    expect(screen.getByText(/question 5 of 20/i)).toBeInTheDocument();
  });

  it("shows the question label for a name question", () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makePlaying()} dispatch={dispatch} />);
    expect(screen.getByText(/what is the note name/i)).toBeInTheDocument();
  });

  it("shows the question label for a position question", () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makePlaying({ currentIndex: 1 })} dispatch={dispatch} />);
    expect(screen.getByText(/what is the slide position/i)).toBeInTheDocument();
  });

  it("renders a StaffDisplay for the current question", () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makePlaying()} dispatch={dispatch} />);
    expect(screen.getByTestId("staff-display")).toBeInTheDocument();
  });

  it("shows exactly 3 choice buttons", () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makePlaying()} dispatch={dispatch} />);
    const buttons = screen.getAllByRole("button");
    // All 3 choice buttons (no Next button in active state)
    expect(buttons).toHaveLength(3);
  });

  it("displays choice text in buttons", () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makePlaying()} dispatch={dispatch} />);
    expect(screen.getByRole("button", { name: /^D$/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^C$/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^E♭$/ })).toBeInTheDocument();
  });

  it("dispatches SELECT_CHOICE with index 0 when first choice is clicked", async () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makePlaying()} dispatch={dispatch} />);
    await userEvent.click(screen.getByRole("button", { name: /^D$/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: "SELECT_CHOICE", payload: 0 });
  });

  it("dispatches SELECT_CHOICE with index 1 when second choice is clicked", async () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makePlaying()} dispatch={dispatch} />);
    await userEvent.click(screen.getByRole("button", { name: /^C$/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: "SELECT_CHOICE", payload: 1 });
  });

  it("dispatches SELECT_CHOICE with index 2 when third choice is clicked", async () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makePlaying()} dispatch={dispatch} />);
    await userEvent.click(screen.getByRole("button", { name: /^E♭$/ }));
    expect(dispatch).toHaveBeenCalledWith({ type: "SELECT_CHOICE", payload: 2 });
  });

  it("renders a progress bar element", () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makePlaying()} dispatch={dispatch} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});

describe("QuizScreen — feedback state (correct answer)", () => {
  it("shows a Next → button", () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makeFeedback()} dispatch={dispatch} />);
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("dispatches NEXT_QUESTION when Next → button is clicked", async () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makeFeedback()} dispatch={dispatch} />);
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(dispatch).toHaveBeenCalledWith({ type: "NEXT_QUESTION" });
  });

  it("shows the feedback annotation with note name and position", () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makeFeedback()} dispatch={dispatch} />);
    // D3 at canonicalPosition 4 → "D3 — 4th position"
    expect(screen.getByText(/D3.*4th position/)).toBeInTheDocument();
  });

  it("marks the correct choice with a ✓ when chosen correctly", () => {
    const dispatch = vi.fn();
    // selectedChoice: 0, correctChoiceIndex: 0 → correct
    render(<QuizScreen state={makeFeedback()} dispatch={dispatch} />);
    expect(screen.getByTestId("choice-0")).toHaveAttribute("data-result", "correct");
  });

  it("marks the incorrect choice with ✗ and correct with ✓ when chosen incorrectly", () => {
    const dispatch = vi.fn();
    // selectedChoice: 1 (C), correctChoiceIndex: 0 (D)
    const state = makeFeedback({ selectedChoice: 1, correctCount: 0 });
    render(<QuizScreen state={state} dispatch={dispatch} />);
    expect(screen.getByTestId("choice-0")).toHaveAttribute("data-result", "correct");
    expect(screen.getByTestId("choice-1")).toHaveAttribute("data-result", "incorrect");
    expect(screen.getByTestId("choice-2")).toHaveAttribute("data-result", "inactive");
  });

  it("choice buttons are disabled in feedback state", () => {
    const dispatch = vi.fn();
    render(<QuizScreen state={makeFeedback()} dispatch={dispatch} />);
    const choiceButtons = screen.getAllByTestId(/^choice-/);
    choiceButtons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });
});

describe("QuizScreen — note name with octave in annotation", () => {
  it("includes octave in the note name annotation (e.g. B♭3 not just B♭)", () => {
    const dispatch = vi.fn();
    // B♭3 is index 12, canonicalPosition 1 → "B♭3 — 1st position"
    const state: QuizState = {
      screen: "feedback",
      questions: [
        {
          noteIndex: 12,
          type: "name",
          choices: ["B♭", "A", "B"],
          correctChoiceIndex: 0,
        },
      ],
      currentIndex: 0,
      selectedChoice: 0,
      correctCount: 1,
    };
    render(<QuizScreen state={state} dispatch={dispatch} />);
    expect(screen.getByText(/B♭3.*1st position/)).toBeInTheDocument();
  });
});
