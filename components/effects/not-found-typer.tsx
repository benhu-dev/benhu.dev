'use client';

import { useEffect, useState } from 'react';

// 7-row × 14-col pixel grid for "404" using a 4-wide-per-digit NES-era
// pixel font. Each digit is 4 cols, separated by a 1-col gap. 'X' = lit,
// '.' = empty (still rendered as an invisible cell so the grid keeps its
// row alignment).
const ROWS_RAW = [
  'X..X..XX..X..X',
  'X..X.X..X.X..X',
  'X..X.X..X.X..X',
  'XXXX.X..X.XXXX',
  '...X.X..X....X',
  '...X.X..X....X',
  '...X..XX.....X',
] as const;

const COLS = 14;
const CELL_PX = 12;
const GAP_PX = 4;

// Per-cell stagger × fade duration is tuned so the entire pixel grid
// resolves in ~0.6–0.8s. Last cell index is 7*14 - 1 = 97; 97 × 6ms +
// 200ms ≈ 780ms. Caption start gets a small buffer past that.
const PER_CELL_DELAY_MS = 6;
const FADE_DURATION_MS = 200;
const CAPTION = '// 404 — page_not_found';
const CAPTION_TYPE_DELAY_MS = 30;
const CAPTION_START_DELAY_MS = 800;

export function NotFoundTyper() {
  const [activated, setActivated] = useState(false);
  const [charsShown, setCharsShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActivated(true);
      setCharsShown(CAPTION.length);
      return;
    }

    // Defer flipping `activated` to the next frame so the initial render
    // (opacity 0) commits before the transition starts. Without rAF the
    // browser may collapse both states into one paint and skip the fade.
    const rafId = requestAnimationFrame(() => setActivated(true));

    let captionInterval: ReturnType<typeof setInterval> | null = null;
    const captionStart = setTimeout(() => {
      let i = 0;
      captionInterval = setInterval(() => {
        i += 1;
        setCharsShown(i);
        if (i >= CAPTION.length && captionInterval) {
          clearInterval(captionInterval);
        }
      }, CAPTION_TYPE_DELAY_MS);
    }, CAPTION_START_DELAY_MS);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(captionStart);
      if (captionInterval) clearInterval(captionInterval);
    };
  }, []);

  const captionDone = charsShown >= CAPTION.length;

  return (
    <>
      <div
        className="mx-auto grid"
        style={{
          gridTemplateColumns: `repeat(${COLS}, ${CELL_PX}px)`,
          gap: GAP_PX,
        }}
        role="img"
        aria-label="404"
      >
        {ROWS_RAW.flatMap((row, r) =>
          row.split('').map((cell, c) => {
            const lit = cell === 'X';
            const index = r * COLS + c;
            return (
              <span
                key={`${r}-${c}`}
                aria-hidden="true"
                style={{
                  display: 'block',
                  width: CELL_PX,
                  height: CELL_PX,
                  backgroundColor: lit ? 'var(--syntax-function)' : 'transparent',
                  opacity: lit ? (activated ? 1 : 0) : 0,
                  transition: lit ? `opacity ${FADE_DURATION_MS}ms ease-out` : 'none',
                  transitionDelay: lit ? `${index * PER_CELL_DELAY_MS}ms` : '0ms',
                }}
              />
            );
          }),
        )}
      </div>

      {/* Caption types in after the pixel grid resolves. min-h reserves the
          line so the heading below doesn't jump when typing starts. */}
      <p className="text-text-muted mt-10 min-h-[1.25rem] font-mono text-sm">
        {CAPTION.slice(0, charsShown)}
        {captionDone && (
          <span
            aria-hidden="true"
            className="bg-syntax-function blink-cursor ml-[2px] inline-block align-[-0.12em]"
            style={{ width: '0.55em', height: '1em' }}
          />
        )}
      </p>
    </>
  );
}
