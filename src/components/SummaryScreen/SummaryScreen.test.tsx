import { describe, it, expect, vi } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SummaryScreen } from "./SummaryScreen";

describe("SummaryScreen", () => {
  it("displays 'Round Complete' as the main heading", () => {
    render(<SummaryScreen correctCount={15} onPlayAgain={() => {}} />);
    expect(screen.getByRole("heading", { name: /round complete/i })).toBeInTheDocument();
  });

  it("displays a medal hero icon", () => {
    render(<SummaryScreen correctCount={15} onPlayAgain={() => {}} />);
    expect(screen.getByRole("img", { name: /medal/i })).toBeInTheDocument();
  });

  it("displays the score as '{correctCount} / 20'", () => {
    render(<SummaryScreen correctCount={15} onPlayAgain={() => {}} />);
    expect(screen.getByText("15 / 20")).toBeInTheDocument();
  });

  it("displays the score with 0 correct answers", () => {
    render(<SummaryScreen correctCount={0} onPlayAgain={() => {}} />);
    expect(screen.getByText("0 / 20")).toBeInTheDocument();
  });

  it("displays the score with 20 correct answers", () => {
    render(<SummaryScreen correctCount={20} onPlayAgain={() => {}} />);
    expect(screen.getByText("20 / 20")).toBeInTheDocument();
  });

  it("renders 20 segments in the progress indicator", () => {
    render(<SummaryScreen correctCount={15} onPlayAgain={() => {}} />);
    const segments = screen.getAllByTestId(/^segment-/);
    expect(segments).toHaveLength(20);
  });

  it("marks the first N segments as filled when correctCount is N", () => {
    render(<SummaryScreen correctCount={7} onPlayAgain={() => {}} />);
    const segments = screen.getAllByTestId(/^segment-/);
    const filledCount = segments.filter((s) => s.getAttribute("data-filled") === "true").length;
    expect(filledCount).toBe(7);
  });

  it("displays an encouraging message", () => {
    render(<SummaryScreen correctCount={15} onPlayAgain={() => {}} />);
    // Any non-empty encouraging text element is expected
    expect(screen.getByTestId("encouraging-message")).toBeInTheDocument();
    expect(screen.getByTestId("encouraging-message").textContent).toBeTruthy();
  });

  it("displays a 'Play Again' button", () => {
    render(<SummaryScreen correctCount={15} onPlayAgain={() => {}} />);
    expect(screen.getByRole("button", { name: /play again/i })).toBeInTheDocument();
  });

  it("calls onPlayAgain when 'Play Again' button is clicked", async () => {
    const onPlayAgain = vi.fn();
    render(<SummaryScreen correctCount={15} onPlayAgain={onPlayAgain} />);
    await userEvent.click(screen.getByRole("button", { name: /play again/i }));
    expect(onPlayAgain).toHaveBeenCalledOnce();
  });
});
