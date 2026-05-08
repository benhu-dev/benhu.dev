import Link from 'next/link';

import { NotFoundTyper } from '@/components/effects/not-found-typer';

export default function NotFound() {
  return (
    <div className="bg-bg-primary text-text-primary relative flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center">
      <NotFoundTyper />

      <h1 className="mt-3 font-mono text-2xl font-bold sm:text-3xl">
        Looks like this route doesn&apos;t exist in our codebase.
      </h1>

      {/* Same className as Hero's `> view_projects()` Button (variant=primary,
          size=md): green fill that inverts to outlined-green-on-transparent
          on hover, with the inset-border + outer-glow shadow. */}
      <Link
        href="/"
        className="border-syntax-string bg-syntax-string text-bg-primary hover:text-syntax-string mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded border px-4 py-2 font-mono text-xs font-semibold transition-all duration-200 hover:bg-transparent hover:shadow-[inset_0_0_0_2px_var(--syntax-string),0_0_24px_-8px_var(--syntax-string)] md:px-5 md:py-2.5 md:text-sm"
      >
        &gt; return home()
      </Link>
    </div>
  );
}
