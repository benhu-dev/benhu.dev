interface LogoProps {
  size?: number;
  className?: string;
}

const GRID_W = 13;
const GRID_H = 13;

// Pixel coordinates {x, y, w, h} for green-filled rectangles in a 13x13 grid.
// Just the outer 1-cell frame + a centered "B" with a 2-cell-wide spine.
// Larger grid → frame reads as proportionally thinner.
const RECTS: ReadonlyArray<{ x: number; y: number; w: number; h: number }> = [
  // Outer frame — 1 cell on every side
  { x: 0, y: 0, w: 13, h: 1 }, // top
  { x: 0, y: 12, w: 13, h: 1 }, // bottom
  { x: 0, y: 0, w: 1, h: 13 }, // left
  { x: 12, y: 0, w: 1, h: 13 }, // right

  // Letter B — 2-col spine, centered in the larger grid (+1 col, +1 row from 11x11)
  { x: 4, y: 3, w: 2, h: 7 }, // vertical spine
  { x: 6, y: 3, w: 3, h: 1 }, // top horizontal
  { x: 9, y: 4, w: 1, h: 2 }, // upper-right curve
  { x: 6, y: 6, w: 3, h: 1 }, // middle horizontal
  { x: 9, y: 7, w: 1, h: 2 }, // lower-right curve
  { x: 6, y: 9, w: 3, h: 1 }, // bottom horizontal
];

export function Logo({ size = 22, className }: LogoProps) {
  return (
    <svg
      width={size * (GRID_W / GRID_H)}
      height={size}
      viewBox={`0 0 ${GRID_W} ${GRID_H}`}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={className}
      aria-label="Ben Hu logo"
    >
      {RECTS.map((r, i) => (
        <rect
          key={i}
          x={r.x}
          y={r.y}
          width={r.w}
          height={r.h}
          fill="var(--syntax-string, #9ece6a)"
        />
      ))}
    </svg>
  );
}
