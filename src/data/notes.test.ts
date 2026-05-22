import { describe, it, expect } from "vite-plus/test";
import { NOTE_RANGE, getDistractors } from "./notes";

describe("Note Range", () => {
  it("contains exactly 15 Notes in order F2 → C4", () => {
    expect(NOTE_RANGE).toHaveLength(15);
  });

  it("starts with F2 and ends with C4", () => {
    expect(NOTE_RANGE[0].vexflowKey).toBe("f/2");
    expect(NOTE_RANGE[14].vexflowKey).toBe("c/4");
  });

  it("each Note has the correct octave", () => {
    expect(NOTE_RANGE[0].octave).toBe(2); // F2
    expect(NOTE_RANGE[4].octave).toBe(2); // B2
    expect(NOTE_RANGE[5].octave).toBe(3); // C3
    expect(NOTE_RANGE[14].octave).toBe(4); // C4
  });

  it("each Note has a displayName combining name and octave", () => {
    expect(NOTE_RANGE[0].displayName).toBe("F2");
    expect(NOTE_RANGE[3].displayName).toBe("B♭2");
    expect(NOTE_RANGE[6].displayName).toBe("D3");
    expect(NOTE_RANGE[7].displayName).toBe("E♭3");
    expect(NOTE_RANGE[12].displayName).toBe("B♭3");
    expect(NOTE_RANGE[14].displayName).toBe("C4");
  });

  it("each Note has a Canonical Position matching the authoritative table", () => {
    const positions = NOTE_RANGE.map((n) => n.canonicalPosition);
    expect(positions).toEqual([6, 4, 2, 1, 7, 6, 4, 3, 2, 1, 4, 2, 1, 4, 3]);
  });

  it("each Note has a vexflowKey string in bass-clef format", () => {
    const keys = NOTE_RANGE.map((n) => n.vexflowKey);
    expect(keys).toEqual([
      "f/2",
      "g/2",
      "a/2",
      "bb/2",
      "b/2",
      "c/3",
      "d/3",
      "eb/3",
      "e/3",
      "f/3",
      "g/3",
      "a/3",
      "bb/3",
      "b/3",
      "c/4",
    ]);
  });
});

describe("getDistractors — Position Question", () => {
  it("returns exactly 2 Distractors for a Position Question", () => {
    const distractors = getDistractors(5, "position"); // C3
    expect(distractors).toHaveLength(2);
  });

  it("Distractors are Canonical Position integers", () => {
    const distractors = getDistractors(5, "position"); // C3 pos=6
    for (const d of distractors) {
      expect(typeof d).toBe("number");
    }
  });

  it("Distractors are different from the correct Canonical Position and from each other", () => {
    const note = NOTE_RANGE[5]; // C3, pos=6
    const distractors = getDistractors(5, "position");
    expect(distractors[0]).not.toBe(note.canonicalPosition);
    expect(distractors[1]).not.toBe(note.canonicalPosition);
    expect(distractors[0]).not.toBe(distractors[1]);
  });

  it("for a Note in the middle of the Note Range, Distractors are the two immediate neighbours", () => {
    // D3 is index 6, neighbours are E♭3 (index 7, pos=3) and C3 (index 5, pos=6)
    const distractors = getDistractors(6, "position");
    expect(distractors).toContain(NOTE_RANGE[5].canonicalPosition);
    expect(distractors).toContain(NOTE_RANGE[7].canonicalPosition);
  });

  it("Distractors shift window inward at lower boundary of Note Range (F2)", () => {
    // F2 is index 0 — window shifts up: neighbours are indices 1 and 2
    const distractors = getDistractors(0, "position");
    expect(distractors).toContain(NOTE_RANGE[1].canonicalPosition);
    expect(distractors).toContain(NOTE_RANGE[2].canonicalPosition);
  });

  it("Distractors shift window inward at upper boundary of Note Range (C4)", () => {
    // C4 is index 14 — window shifts down: neighbours are indices 12 and 13
    const distractors = getDistractors(14, "position");
    expect(distractors).toContain(NOTE_RANGE[12].canonicalPosition);
    expect(distractors).toContain(NOTE_RANGE[13].canonicalPosition);
  });
});

describe("getDistractors — Name Question", () => {
  it("returns exactly 2 Distractors for a Name Question", () => {
    const distractors = getDistractors(5, "name"); // C3
    expect(distractors).toHaveLength(2);
  });

  it("Distractors are Note Name strings", () => {
    const distractors = getDistractors(5, "name");
    for (const d of distractors) {
      expect(typeof d).toBe("string");
    }
  });

  it("Distractors are different from the correct Note Name and from each other", () => {
    const note = NOTE_RANGE[5]; // C3, name="C"
    const distractors = getDistractors(5, "name");
    expect(distractors[0]).not.toBe(note.name);
    expect(distractors[1]).not.toBe(note.name);
    expect(distractors[0]).not.toBe(distractors[1]);
  });

  it("for a Note in the middle of the Note Range, Distractors are the two immediate neighbour Note Names", () => {
    // D3 is index 6, neighbours are C3 (index 5) and E♭3 (index 7)
    const distractors = getDistractors(6, "name");
    expect(distractors).toContain(NOTE_RANGE[5].name);
    expect(distractors).toContain(NOTE_RANGE[7].name);
  });

  it("Distractors shift window inward at lower boundary of Note Range (F2)", () => {
    // F2 is index 0 — window shifts up: neighbours are indices 1 and 2
    const distractors = getDistractors(0, "name");
    expect(distractors).toContain(NOTE_RANGE[1].name);
    expect(distractors).toContain(NOTE_RANGE[2].name);
  });

  it("Distractors shift window inward at upper boundary of Note Range (C4)", () => {
    // C4 is index 14 — window shifts down: neighbours are indices 12 and 13
    const distractors = getDistractors(14, "name");
    expect(distractors).toContain(NOTE_RANGE[12].name);
    expect(distractors).toContain(NOTE_RANGE[13].name);
  });
});
