# Pre-rendered static SVGs for staff notation

status: superseded by ADR-0005

The Staff is rendered using one pre-authored static SVG asset per note in the Note Range (15 SVGs total) rather than a dynamic notation library such as VexFlow. The Note Range and note vocabulary are fixed at design time, so all possible Staff states are known in advance. Static SVGs eliminate a large JS dependency (~400 KB for VexFlow), load instantly on mobile, and are trivially testable. If the note vocabulary expands significantly in future, this decision should be revisited.
