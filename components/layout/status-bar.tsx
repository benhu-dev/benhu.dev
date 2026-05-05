'use client';

import { useEffect, useState } from 'react';

import { useScrollProgress } from '@/hooks/use-scroll-progress';

const TOTAL_LINES = 420;

export function StatusBar() {
  const progress = useScrollProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentLine = mounted ? Math.max(1, Math.round(progress * TOTAL_LINES)) : 1;

  return (
    <div
      className="border-border-default bg-bg-secondary text-text-secondary pointer-events-none fixed right-0 bottom-0 z-30 hidden items-center gap-4 rounded-tl-md border-t border-l px-3 py-1 font-mono text-[11px] backdrop-blur-md md:flex"
      aria-hidden="true"
    >
      <span className="flex items-center gap-1.5">
        <span className="bg-syntax-string h-1.5 w-1.5 rounded-full" />
        main
      </span>
      <span className="text-text-muted">
        LN <span className="text-text-primary">{currentLine}</span> /{' '}
        <span className="text-text-primary">{TOTAL_LINES}</span>
      </span>
      <span className="text-text-muted">
        <span className="text-syntax-keyword">&lt;/&gt;</span> TSX
      </span>
      <span className="text-text-muted">UTF-8</span>
      <span className="flex items-center gap-1.5">
        <span className="bg-syntax-string pulse-dot h-1.5 w-1.5 rounded-full" />
        <span className="text-syntax-string">open to work</span>
      </span>
    </div>
  );
}
