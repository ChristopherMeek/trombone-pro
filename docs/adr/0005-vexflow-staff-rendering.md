# VexFlow for staff notation rendering

supersedes: ADR-0002

VexFlow is used to render the bass clef Staff at runtime instead of pre-authored static SVGs. Static SVGs were the original choice for their zero-dependency, zero-runtime-cost properties, but generating correct, consistent SVGs for all 15 notes proved unreliable in practice (tooling could not produce them deterministically). VexFlow is battle-tested, handles clef, note heads, ledger lines, and accidentals correctly by construction, and its ~400 KB bundle cost is acceptable given that correctness is non-negotiable for an educational tool. The fixed 15-note vocabulary means VexFlow is only ever asked to render well-understood, predictable input.
