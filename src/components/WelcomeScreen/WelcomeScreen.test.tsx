import { describe, it, expect, vi } from "vite-plus/test";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { WelcomeScreen } from "./WelcomeScreen";

describe("WelcomeScreen", () => {
  it("displays the app title 'Trombone Flash Cards'", () => {
    render(<WelcomeScreen onPlay={() => {}} />);
    expect(screen.getByRole("heading", { name: /trombone flash cards/i })).toBeInTheDocument();
  });

  it("displays explanation text about the quiz", () => {
    render(<WelcomeScreen onPlay={() => {}} />);
    expect(screen.getByText(/20 questions/i)).toBeInTheDocument();
  });

  it("displays a Play button", () => {
    render(<WelcomeScreen onPlay={() => {}} />);
    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();
  });

  it("calls onPlay when Play button is clicked", async () => {
    const onPlay = vi.fn();
    render(<WelcomeScreen onPlay={onPlay} />);
    await userEvent.click(screen.getByRole("button", { name: /play/i }));
    expect(onPlay).toHaveBeenCalledOnce();
  });

  it("displays a musical hero icon element", () => {
    render(<WelcomeScreen onPlay={() => {}} />);
    expect(screen.getByRole("img", { name: /music note/i })).toBeInTheDocument();
  });
});
