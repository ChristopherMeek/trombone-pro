import { describe, it, expect } from "vite-plus/test";
import { render } from "@testing-library/react";
import { StaffDisplay } from "./StaffDisplay";
import { NOTE_RANGE } from "../../data/notes";

// VexFlow renders to DOM canvas/SVG which jsdom cannot fully simulate.
// These tests verify the component mounts without error and cleans up on unmount.

describe("StaffDisplay", () => {
  it("mounts without throwing for F2 (first note)", () => {
    expect(() => {
      render(<StaffDisplay note={NOTE_RANGE[0]} />);
    }).not.toThrow();
  });

  it("mounts without throwing for C4 (last note, ledger line)", () => {
    expect(() => {
      render(<StaffDisplay note={NOTE_RANGE[14]} />);
    }).not.toThrow();
  });

  it("mounts without throwing for B♭2 (accidental)", () => {
    expect(() => {
      render(<StaffDisplay note={NOTE_RANGE[3]} />);
    }).not.toThrow();
  });

  it("mounts without throwing for E♭3 (accidental)", () => {
    expect(() => {
      render(<StaffDisplay note={NOTE_RANGE[7]} />);
    }).not.toThrow();
  });

  it("mounts without throwing for B♭3 (accidental)", () => {
    expect(() => {
      render(<StaffDisplay note={NOTE_RANGE[12]} />);
    }).not.toThrow();
  });

  it("renders a container element with the staff display test id", () => {
    const { getByTestId } = render(<StaffDisplay note={NOTE_RANGE[0]} />);
    expect(getByTestId("staff-display")).toBeInTheDocument();
  });

  it("cleans up on unmount without throwing", () => {
    const { unmount } = render(<StaffDisplay note={NOTE_RANGE[0]} />);
    expect(() => {
      unmount();
    }).not.toThrow();
  });

  it("mounts without throwing for all 15 notes in NOTE_RANGE", () => {
    NOTE_RANGE.forEach((note) => {
      expect(() => {
        const { unmount } = render(<StaffDisplay note={note} />);
        unmount();
      }).not.toThrow();
    });
  });
});
