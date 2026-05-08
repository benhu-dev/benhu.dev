# Polish the 404 page (final round, simplified)

## Context

The current `app/not-found.tsx` has these issues:

1. The pixel-art "404" is hard to read — users see "qOP". The
   pixel grid for digits 4, 0, 4 is not legible.

2. The `> return home()` button has no hover effect. It should
   match the green primary CTA in Hero
   (`> view_projects()` button is the reference).

3. The page is static. We want light terminal-themed motion on
   the existing 404 visual + caption — but it must NOT block
   user interaction with the heading or button.

## Task

### Part 1: Fix pixel-art "404" digit legibility

Redraw the pixel grid so digits "4", "0", "4" are immediately
recognizable. Use a standard 5-wide × 7-tall pixel font layout
per digit (NES-era style), 1 column gap between digits.

Reference cells filled (where `█` is on, `·` is off):

```
"4":     "0":
█ · · █  · █ █ ·
█ · · █  █ · · █
█ · · █  █ · · █
█ █ █ █  █ · · █
· · · █  █ · · █
· · · █  █ · · █
· · · █  · █ █ ·
```

Both "4" digits identical. Keep existing
`var(--syntax-function)` blue color. Keep existing pixel cell
size.

### Part 2: Match return-home button hover to Hero CTA

Open `components/sections/hero.tsx`. Find `> view_projects()`
button. Copy its full className onto the `> return home()`
button in `app/not-found.tsx`.

Hover should invert: background becomes transparent, text
becomes syntax-string green, with the inset border + outer
glow shadow effect.

### Part 3: Animate ONLY the pixel "404" and its caption

The animation applies to two existing elements only:
- The pixel-art "404" (just redrawn in Part 1)
- The caption directly under it: `// 404 — page_not_found`

**Animation behavior**:

- Pixel "404": each pixel cell fades in sequentially, scanning
  left-to-right, top-to-bottom. ~8ms delay between cells. Each
  cell uses a 200ms fade-in transition. Total runtime for the
  pixel grid is roughly 0.6-0.8s depending on cell count.

- After pixel grid finishes, the caption types in
  character-by-character at 30ms per char (~600ms for the full
  caption). After typing completes, append a small blinking
  cursor at the end of the caption (same style as the Hero
  blinking cursor).

- Total animation runtime: ~1.2-1.5 seconds.

**Critical UX rule**: the heading
(`Looks like this route doesn't exist...`) and the
`> return home()` button must render at full opacity from
frame 0. The user can click return-home immediately, before
the pixel/caption animation finishes.

**Implementation notes**:
- This will require `"use client"` and `useEffect` /
  `useState`. Extract into its own component file (e.g.,
  `components/effects/not-found-typer.tsx` or similar) so the
  page file stays simple. The component owns BOTH the pixel
  grid render and the caption — this lets the animation
  sequence cleanly without prop-drilling timing state.

**Reduced motion support**:
- Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
- If true: render the full pixel grid + full caption text
  immediately, no fade or typing.

## Out of scope (do NOT add)

- No fake terminal command lines
  (no `$ git checkout`, no `error: pathspec`)
- No random dev quotes
- No glitch effects, Konami codes, or interactive games
- No changes to `app/error.tsx`
- No theme color changes

## Final layout, top to bottom (unchanged from current page)

1. Pixel "404" (Part 1 redraw + Part 3 fade-in animation)
2. `// 404 — page_not_found` caption (Part 3 typing animation
   + blinking cursor)
3. `Looks like this route doesn't exist in our codebase.`
   heading (immediate, full opacity)
4. `> return home()` button (Part 2 hover, immediate)

## Quality

- `npm run lint` — 0 errors / 0 warnings
- `npm run type-check` — clean
- `npm run build` — clean
- Manually visit `http://localhost:3000/some-fake-route`:
  - Pixel "404" reads clearly as "404"
  - Pixel grid fades in cell-by-cell, ~0.6-0.8s
  - Caption types in after pixel grid finishes,
    cursor blinks at end
  - Heading and button are visible from frame 0
  - Button can be clicked at any time during animation
  - Hover on button: green glow inversion
  - With OS reduced-motion enabled: animation skips,
    everything renders immediately