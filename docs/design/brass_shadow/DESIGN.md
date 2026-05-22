---
name: Brass & Shadow
colors:
  surface: "#0f131d"
  surface-dim: "#0f131d"
  surface-bright: "#353944"
  surface-container-lowest: "#0a0e18"
  surface-container-low: "#171b26"
  surface-container: "#1b1f2a"
  surface-container-high: "#262a34"
  surface-container-highest: "#313540"
  on-surface: "#dfe2f0"
  on-surface-variant: "#d0c5af"
  inverse-surface: "#dfe2f0"
  inverse-on-surface: "#2c303b"
  outline: "#99907c"
  outline-variant: "#4d4635"
  surface-tint: "#e9c349"
  primary: "#f2ca50"
  on-primary: "#3c2f00"
  primary-container: "#d4af37"
  on-primary-container: "#554300"
  inverse-primary: "#735c00"
  secondary: "#c0c6d9"
  on-secondary: "#29303f"
  secondary-container: "#424958"
  on-secondary-container: "#b1b8cb"
  tertiary: "#cecece"
  on-tertiary: "#2f3131"
  tertiary-container: "#b2b3b3"
  on-tertiary-container: "#434546"
  error: "#ffb4ab"
  on-error: "#690005"
  error-container: "#93000a"
  on-error-container: "#ffdad6"
  primary-fixed: "#ffe088"
  primary-fixed-dim: "#e9c349"
  on-primary-fixed: "#241a00"
  on-primary-fixed-variant: "#574500"
  secondary-fixed: "#dce2f6"
  secondary-fixed-dim: "#c0c6d9"
  on-secondary-fixed: "#151c29"
  on-secondary-fixed-variant: "#404756"
  tertiary-fixed: "#e2e2e2"
  tertiary-fixed-dim: "#c6c6c7"
  on-tertiary-fixed: "#1a1c1c"
  on-tertiary-fixed-variant: "#454747"
  background: "#0f131d"
  on-background: "#dfe2f0"
  surface-variant: "#313540"
typography:
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: "600"
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-xl:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 24px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: "500"
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  margin-mobile: 24px
  gutter: 16px
  touch-target-min: 48px
  container-padding: 20px
---

## Brand & Style

This design system is built for a focused, high-performance music education environment. The brand personality is disciplined yet encouraging—mirroring the journey of mastering an instrument. It utilizes a **High-Contrast Modern** aesthetic that prioritizes legibility and reduces visual fatigue during long practice sessions.

The interface leverages a dark, immersive background to allow musical notation on white cards to "pop" with maximum clarity. The style avoids trendy gradients or blurs in favor of solid color blocks, sharp functional boundaries, and a "brass-inspired" accent palette that feels both premium and academic.

## Colors

The palette is anchored by a deep navy/charcoal base to minimize eye strain.

- **Primary (Brass Gold):** Reserved for primary actions, progress indicators, and active states. It provides a warm, motivating contrast against the dark background.
- **Neutral (Deep Navy):** Used for the global background to create a "dark mode" default that feels sophisticated.
- **Secondary (Slate Blue):** Used for secondary surfaces or container backgrounds that sit atop the deep navy.
- **Surface (White):** Specifically reserved for the flashcard face to ensure musical staves and notes are rendered with traditional ink-on-paper clarity.
- **Feedback (Green/Red):** High-saturation tones for instant "Correct" or "Incorrect" validation during quiz sequences.

## Typography

The design system utilizes **Hanken Grotesk** for all roles. Its contemporary geometric construction provides the clarity required for technical education while remaining approachable.

- **Headlines:** Set with tight letter-spacing and heavy weights to create a strong visual anchor for quiz questions.
- **Labels:** Button labels and navigation items use slightly increased letter-spacing to ensure legibility at a glance.
- **Notation Context:** While the interface uses Hanken Grotesk, any musical symbols (clefs, notes) should be rendered using standard Bravura or Petaluma music fonts on the white card surfaces.

## Layout & Spacing

This design system follows a **Mobile-First Fixed Grid** logic optimized for the 390px standard width.

- **Tap Targets:** All interactive elements (buttons, chips, toggles) must maintain a minimum height of 48px to accommodate rapid practice sessions and one-handed use.
- **Padding:** Generous 24px side margins prevent content from feeling cramped against the device edges.
- **Vertical Rhythm:** Elements are stacked using an 8px base grid. Flashcards should be centered vertically in the viewport to maintain focus.

## Elevation & Depth

To maintain a clean and "focused" feel, this design system avoids complex shadows. Depth is communicated through **Tonal Layering**:

- **Level 0 (Background):** The deep #121620 navy base.
- **Level 1 (Interaction Layer):** Action buttons and input fields that sit directly on the background.
- **Level 2 (The Card):** The white flashcard surface. This is the highest visual priority. It uses a crisp, slight 1px border (#E2E8F0) rather than a shadow to define its edges against the dark background.
- **Overlays:** Modals or feedback toasts use a solid #1E2533 background with a 2px Primary (Brass) border to indicate they are "above" the current flow.

## Shapes

The shape language is "Soft-Modern."

- **Primary Components:** Buttons and main Flashcards use a 0.5rem (8px) radius. This provides a friendly, tactile feel that isn't as aggressive as sharp corners nor as "toy-like" as full pill shapes.
- **Secondary Elements:** Small tags or progress pips may use the `rounded-lg` (1rem) setting to distinguish them from primary action blocks.

## Components

### Flashcards

The centerpiece of the UI. Must have a pure white background with 16px internal padding. Content (musical notation) should be centered. The card should occupy roughly 60% of the viewport height on mobile.

### Action Buttons

Stacked vertically at the bottom of the screen.

- **Default:** Solid #D4AF37 with dark navy text.
- **Correct State:** Transitions to #4ADE80 with white text.
- **Incorrect State:** Transitions to #F87171 with white text.
- All buttons must be full-width (minus margins) to ensure easy thumb reach.

### Input Fields

Used for "Type the Answer" modes. Dark background (#1E2533) with a 2px Brass border when focused. Text is white.

### Progress Indicators

A thin horizontal bar at the very top of the screen. The track is the background navy, and the fill is the Brass Gold.

### Chips/Tags

Used for selecting difficulty or instrument range. Use an outlined style (1px White border) when inactive, and solid White when active.
