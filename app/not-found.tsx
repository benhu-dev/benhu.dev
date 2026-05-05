import Link from 'next/link';

import { StatusBar } from '@/components/layout/status-bar';

const PIXEL_404 = [
  '. X X X . X X X . X X X .',
  'X . . X . X . X . X . . X',
  'X . . X . X . X . X . . X',
  'X . . X . X . X . X . . X',
  'X X X X . X . X . X X X X',
  '. . . X . X . X . X . . .',
  '. . . X . X . X . X . . .',
  '. . . X . X X X . X . . .',
];

export default function NotFound() {
  return (
    <div className="bg-bg-primary text-text-primary relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
      <div
        className="mx-auto grid gap-1 font-mono"
        style={{ gridTemplateColumns: 'repeat(13, 12px)' }}
        aria-hidden="true"
      >
        {PIXEL_404.flatMap((row, r) =>
          row
            .split(' ')
            .map((cell, c) => (
              <span
                key={`${r}-${c}`}
                className="block h-3 w-3"
                style={{ backgroundColor: cell === 'X' ? '#7aa2f7' : 'transparent' }}
              />
            )),
        )}
      </div>

      <p className="text-text-muted mt-10 font-mono text-sm">{'// 404 — page_not_found'}</p>
      <h1 className="mt-3 font-mono text-2xl font-bold sm:text-3xl">
        Looks like this route doesn&apos;t exist in our codebase.
      </h1>

      <Link
        href="/"
        className="bg-syntax-string text-bg-primary hover:bg-syntax-string/90 mt-8 inline-flex items-center gap-2 rounded-sm px-5 py-3 font-mono text-sm font-semibold transition-colors"
      >
        &gt; return home()
      </Link>

      <StatusBar />
    </div>
  );
}
