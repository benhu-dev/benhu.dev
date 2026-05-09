'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        'fixed right-4 bottom-4 z-30 sm:right-5 sm:bottom-5',
        'flex h-10 w-10 items-center justify-center sm:h-9 sm:w-9',
        'border-border-default bg-bg-secondary/80 rounded-md border backdrop-blur-md',
        'text-text-muted cursor-pointer transition-all duration-300 ease-out',
        'hover:text-syntax-string hover:border-syntax-string hover:shadow-[0_0_20px_-8px_var(--syntax-string)]',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <PixelArrow />
    </button>
  );
}

// 7×7 pixel up-arrow. Rendered as crisp-edge SVG rects so it stays sharp at
// any DPR and matches the site's NES/IDE pixel-art language.
function PixelArrow() {
  const cells: ReadonlyArray<readonly [number, number]> = [
    [3, 0],
    [2, 1],
    [3, 1],
    [4, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [3, 3],
    [3, 4],
    [3, 5],
  ];

  return (
    <svg
      viewBox="0 0 7 7"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="bob-arrow h-4 w-4 sm:h-3.5 sm:w-3.5"
    >
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
      ))}
    </svg>
  );
}
