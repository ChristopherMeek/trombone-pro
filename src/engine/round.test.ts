import { describe, it, expect } from "vite-plus/test";
import { generateRound } from "./round";
import { NOTE_RANGE } from "../data/notes";

describe("generateRound — Round structure", () => {
  it("returns exactly 20 Questions per Round", () => {
    const round = generateRound();
    expect(round).toHaveLength(20);
  });

  it("contains exactly 10 Name Questions and 10 Position Questions", () => {
    const round = generateRound();
    const nameCount = round.filter((q) => q.type === "name").length;
    const posCount = round.filter((q) => q.type === "position").length;
    expect(nameCount).toBe(10);
    expect(posCount).toBe(10);
  });

  it("no Note index appears more than once among the 10 Name Questions", () => {
    const round = generateRound();
    const nameIndices = round.filter((q) => q.type === "name").map((q) => q.noteIndex);
    const unique = new Set(nameIndices);
    expect(unique.size).toBe(10);
  });

  it("no Note index appears more than once among the 10 Position Questions", () => {
    const round = generateRound();
    const posIndices = round.filter((q) => q.type === "position").map((q) => q.noteIndex);
    const unique = new Set(posIndices);
    expect(unique.size).toBe(10);
  });

  it("all Note indices are within the Note Range (0–14)", () => {
    const round = generateRound();
    for (const q of round) {
      expect(q.noteIndex).toBeGreaterThanOrEqual(0);
      expect(q.noteIndex).toBeLessThanOrEqual(14);
    }
  });
});

describe("generateRound — Question Choices", () => {
  it("each Question has exactly 3 Choices", () => {
    const round = generateRound();
    for (const q of round) {
      expect(q.choices).toHaveLength(3);
    }
  });

  it("the correct Choice index is 0, 1, or 2", () => {
    const round = generateRound();
    for (const q of round) {
      expect([0, 1, 2]).toContain(q.correctChoiceIndex);
    }
  });

  it("for a Name Question, the correct Choice value matches the Note's display name", () => {
    const round = generateRound();
    const nameQuestions = round.filter((q) => q.type === "name");
    for (const q of nameQuestions) {
      const note = NOTE_RANGE[q.noteIndex];
      expect(q.choices[q.correctChoiceIndex]).toBe(note.name);
    }
  });

  it("for a Position Question, the correct Choice value matches the Note's Canonical Position as a number", () => {
    const round = generateRound();
    const posQuestions = round.filter((q) => q.type === "position");
    for (const q of posQuestions) {
      const note = NOTE_RANGE[q.noteIndex];
      expect(q.choices[q.correctChoiceIndex]).toBe(note.canonicalPosition);
    }
  });

  it("for a Position Question, all 3 Choices are integers between 1 and 7", () => {
    const round = generateRound();
    const posQuestions = round.filter((q) => q.type === "position");
    for (const q of posQuestions) {
      for (const choice of q.choices) {
        expect(typeof choice).toBe("number");
        expect(choice).toBeGreaterThanOrEqual(1);
        expect(choice).toBeLessThanOrEqual(7);
      }
    }
  });
});

describe("generateRound — randomness", () => {
  it("calling generateRound() multiple times produces different question orders", () => {
    // Run 10 pairs; at least one pair must differ (probability of all identical is negligible)
    const orders = Array.from({ length: 10 }, () =>
      generateRound()
        .map((q) => `${q.noteIndex}:${q.type}`)
        .join(","),
    );
    const unique = new Set(orders);
    expect(unique.size).toBeGreaterThan(1);
  });
});
