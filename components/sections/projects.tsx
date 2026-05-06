'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { projects } from '@/lib/data';

import { ProjectCard } from './projects/project-card';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = projects.length;

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    // Progress: 0 at scrollLeft=0, 1 at scrollLeft=max
    const maxScroll = el.scrollWidth - el.clientWidth;
    const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
    setScrollProgress(Math.max(0, Math.min(1, progress)));

    // Active index: which card's center is closest to viewport center?
    const cards = el.querySelectorAll<HTMLElement>('[data-card]');
    if (!cards.length) return;
    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    let bestIdx = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - containerCenter);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });
    setActiveIndex(bestIdx);
  }, []);

  // Initialize on mount once cards are laid out.
  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  return (
    <section className="relative w-full py-[120px]">
      {/* Anchor target for nav jumps. Combined with html { scroll-padding-top:
          var(--nav-height) }, clicking // projects in nav lands the section
          top flush below the sticky nav. */}
      <span id="projects" aria-hidden="true" />

      {/* Header — section title + counter + continuous progress bar */}
      <div className="mx-auto mb-8 flex w-full max-w-[1400px] flex-col items-start justify-between gap-6 px-6 lg:flex-row lg:items-end lg:px-16">
        <div>
          <p className="text-text-muted mb-3 font-mono text-sm">{'// projects'}</p>
          <h2
            className="text-text-primary font-mono font-bold tracking-[-0.01em]"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1 }}
          >
            things I&apos;ve <span className="text-syntax-string">shipped</span>.
          </h2>
        </div>

        <div className="flex w-full flex-col items-start gap-3 lg:w-auto lg:items-end">
          {/* Counter — driven by activeIndex */}
          <div className="font-mono text-sm">
            <span className="text-syntax-string">{pad(activeIndex + 1)}</span>
            <span className="text-text-muted"> / {pad(total)}</span>
          </div>
          {/* Continuous progress bar — fills as scrollProgress increases */}
          <div
            className="border-border-default bg-bg-secondary relative overflow-hidden rounded-[3px] border"
            style={{ width: 240, height: 6 }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(scrollProgress * 100)}
            aria-label="Projects scroll progress"
          >
            <div
              style={{
                width: `${scrollProgress * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, var(--syntax-function), var(--syntax-string))',
                transition: 'width 0.15s ease-out',
                borderRadius: 3,
              }}
            />
          </div>
        </div>
      </div>

      {/* Native horizontal scroller. Snap-to-card via scroll-snap-type. Custom
          scrollbar hidden — progress is reflected in the header bar instead.
          Keyboard navigation works for free thanks to tabIndex={0}. */}
      <div
        ref={scrollerRef}
        tabIndex={0}
        onScroll={handleScroll}
        aria-label="Projects horizontal scroller"
        className="hide-scrollbar focus:outline-none"
        style={{
          display: 'flex',
          gap: '4vw',
          overflowX: 'auto',
          overflowY: 'hidden',
          padding: '0 7vw 24px',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: '7vw',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i + 1} />
        ))}
      </div>
    </section>
  );
}
