'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-bg-primary text-text-primary flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-syntax-error font-mono text-sm">{'// 500 — internal_error'}</p>
      <h1 className="mt-3 font-mono text-2xl font-bold sm:text-3xl">
        <span className="text-text-primary">throw new </span>
        <span className="text-syntax-error">Error</span>
        <span className="text-text-muted">(</span>
        <span className="text-syntax-string">&ldquo;something broke&rdquo;</span>
        <span className="text-text-muted">);</span>
      </h1>
      <p className="text-text-secondary mt-4 max-w-md font-mono text-sm">
        {
          '// an unexpected error happened. give it another shot — it usually works the second time.'
        }
      </p>
      <button
        type="button"
        onClick={reset}
        className="bg-syntax-string text-bg-primary hover:bg-syntax-string/90 mt-8 rounded-sm px-5 py-3 font-mono text-sm font-semibold transition-colors"
      >
        &gt; retry()
      </button>
    </div>
  );
}
