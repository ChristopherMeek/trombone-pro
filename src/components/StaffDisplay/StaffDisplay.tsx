import { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Formatter, Accidental } from "vexflow";
import type { Note } from "../../data/notes";
import styles from "./StaffDisplay.module.css";

interface StaffDisplayProps {
  note: Note;
}

export function StaffDisplay({ note }: StaffDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous render
    container.innerHTML = "";

    const width = 260;
    const height = 140;

    let renderer: Renderer;
    try {
      renderer = new Renderer(container, Renderer.Backends.SVG);
      renderer.resize(width, height);
      const ctx = renderer.getContext();
      ctx.setFillStyle("#dfe2f0");
      ctx.setStrokeStyle("#dfe2f0");

      const stave = new Stave(10, 20, width - 20);
      stave.addClef("bass");
      stave.setContext(ctx).draw();

      const keyParts = note.vexflowKey.split("/");
      const keyName = keyParts[0]; // e.g. "bb", "eb", "f"

      const staveNote = new StaveNote({
        keys: [note.vexflowKey],
        duration: "w",
        clef: "bass",
      });

      // Add accidental modifier if key contains 'b' (flat)
      if (keyName.length === 2 && keyName[1] === "b") {
        staveNote.addModifier(new Accidental("b"));
      }

      Formatter.FormatAndDraw(ctx, stave, [staveNote]);
    } catch {
      // VexFlow may fail in jsdom — silently ignore for test environments
    }

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [note]);

  return (
    <div className={styles.card}>
      <div ref={containerRef} data-testid="staff-display" className={styles.staffContainer} />
    </div>
  );
}
