'use client';

import { useEffect, useRef, useState } from 'react';

import { projects } from '@/data/content';

import { ProjectCard } from './projects/project-card';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function Projects() {
  const outerRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);

  // Refs to the DOM nodes that scroll-derived values render into. The scroll
  // handler writes to these directly via `.textContent` / `.style.width` /
  // `setAttribute`, bypassing React's render cycle. With 60+ scroll events
  // per second, even a cheap re-render of the Header subtree adds up — at
  // profile time, scripting was 45% of CPU during scroll. After this
  // refactor, <Projects> renders once at mount and effectively never again.
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // Per-frame state held in refs (no React state, no re-render).
  const scrollProgressRef = useRef(0);
  const activeIndexRef = useRef(0);

  const [useSticky, setUseSticky] = useState(true);

  const total = projects.length;

  // ===== Media-query subscription =====
  useEffect(() => {
    const mqMobile = window.matchMedia('(max-width: 1023px), (pointer: coarse)');
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setUseSticky(!mqMobile.matches && !mqReduce.matches);
    };
    update();
    mqMobile.addEventListener('change', update);
    mqReduce.addEventListener('change', update);
    return () => {
      mqMobile.removeEventListener('change', update);
      mqReduce.removeEventListener('change', update);
    };
  }, []);

  // ===== Outer section height = viewport + horizontal travel =====
  // The outer section is intentionally tall so the sticky child can "ride"
  // through the entire horizontal distance. Recomputed on resize.
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    // Non-sticky mode (mobile / reduced-motion): clear any inline height left
    // over from a previous desktop render. Without this, switching between
    // desktop and mobile via DevTools (or a real-world resize) leaves a tall
    // empty area below the section on mobile, because the previous run wrote
    // an explicit pixel height that never got removed.
    if (!useSticky) {
      outer.style.height = '';
      return;
    }

    const computeHeight = () => {
      const track = trackRef.current;
      if (!outer || !track) return;
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const horizontalDistance = Math.max(0, trackWidth - viewportWidth);
      const viewportHeight = window.innerHeight;
      outer.style.height = `${viewportHeight + horizontalDistance}px`;
    };
    computeHeight();
    window.addEventListener('resize', computeHeight);
    return () => {
      window.removeEventListener('resize', computeHeight);
      // Also clear on unmount-or-deps-change to keep the DOM clean for the
      // next render path.
      outer.style.height = '';
    };
  }, [useSticky]);

  // ===== Translate scrollY into translateX (desktop sticky) =====
  // rAF-throttled so we do at most one update per frame regardless of
  // scroll-event firing rate. All output is written to the DOM directly via
  // refs — no React re-render, no reconciliation cost during scroll.
  useEffect(() => {
    if (!useSticky) return;

    let rafId: number | null = null;
    let needsUpdate = false;

    const tick = () => {
      rafId = null;
      if (!needsUpdate) return;
      needsUpdate = false;

      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;

      const rect = outer.getBoundingClientRect();
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const horizontalDistance = Math.max(0, trackWidth - viewportWidth);

      const scrolledPast = Math.max(0, -rect.top);
      const maxScroll = outer.offsetHeight - viewportHeight;
      const progress = maxScroll > 0 ? Math.min(1, scrolledPast / maxScroll) : 0;

      const translateX = -progress * horizontalDistance;
      track.style.transform = `translate3d(${translateX}px, 0, 0)`;

      // Direct DOM writes for progress bar — no React re-render.
      scrollProgressRef.current = progress;
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${progress * 100}%`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.setAttribute('aria-valuenow', String(Math.round(progress * 100)));
      }

      // Active card detection + per-card opacity dimming.
      const cards = track.querySelectorAll<HTMLElement>('[data-card]');
      const viewportCenter = viewportWidth / 2;
      const dimThreshold = viewportWidth * 0.5;
      let bestIdx = 0;
      let bestDist = Infinity;
      cards.forEach((cardEl, i) => {
        const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2 + translateX;
        const dist = Math.abs(cardCenter - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
        const normalized = Math.min(1, dist / dimThreshold);
        cardEl.style.opacity = String(1 - normalized * 0.7);
      });

      // Counter only changes a handful of times per scroll — gate the DOM
      // write on actual index change so we're not thrashing textContent.
      if (bestIdx !== activeIndexRef.current) {
        activeIndexRef.current = bestIdx;
        if (counterRef.current) {
          counterRef.current.textContent = pad(bestIdx + 1);
        }
      }
    };

    const onScroll = () => {
      needsUpdate = true;
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    // Initial tick to align positions with current scroll on mount.
    needsUpdate = true;
    rafId = requestAnimationFrame(tick);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [useSticky]);

  // ===== Mobile fallback scroller — same rAF + direct-DOM pattern =====
  useEffect(() => {
    if (useSticky) return;
    const el = mobileScrollerRef.current;
    if (!el) return;

    let rafId: number | null = null;
    let needsUpdate = false;

    const tick = () => {
      rafId = null;
      if (!needsUpdate) return;
      needsUpdate = false;

      const cards = el.querySelectorAll<HTMLElement>('[data-card]');
      if (!cards.length) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
      const clamped = Math.max(0, Math.min(1, progress));

      scrollProgressRef.current = clamped;
      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${clamped * 100}%`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.setAttribute('aria-valuenow', String(Math.round(clamped * 100)));
      }

      const center = el.scrollLeft + el.clientWidth / 2;
      const dimThreshold = el.clientWidth * 0.5;
      let bestIdx = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
        const normalized = Math.min(1, dist / dimThreshold);
        card.style.opacity = String(1 - normalized * 0.7);
      });

      if (bestIdx !== activeIndexRef.current) {
        activeIndexRef.current = bestIdx;
        if (counterRef.current) {
          counterRef.current.textContent = pad(bestIdx + 1);
        }
      }
    };

    const onScroll = () => {
      needsUpdate = true;
      if (rafId === null) {
        rafId = requestAnimationFrame(tick);
      }
    };

    needsUpdate = true;
    rafId = requestAnimationFrame(tick);

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [useSticky]);

  // The Header renders ONCE at mount with the initial values below; from
  // then on, the rAF tick keeps `counterRef`, `progressFillRef`, and
  // `progressBarRef` updated directly. React never reconciles this subtree
  // again during scroll.
  const Header = (
    <div className="mx-auto flex w-full max-w-[1400px] flex-shrink-0 flex-col items-start justify-between gap-6 px-6 pt-8 lg:flex-row lg:items-end lg:px-16">
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
        <div className="font-mono text-sm">
          <span ref={counterRef} className="text-syntax-string">
            {pad(1)}
          </span>
          <span className="text-text-muted"> / {pad(total)}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div
            ref={progressBarRef}
            className="border-border-default bg-bg-secondary relative overflow-hidden rounded-[3px] border"
            style={{ width: 240, height: 6 }}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
            aria-label="Projects scroll progress"
          >
            <div
              ref={progressFillRef}
              style={{
                width: '0%',
                height: '100%',
                background: 'linear-gradient(90deg, var(--syntax-function), var(--syntax-string))',
                borderRadius: 3,
              }}
            />
          </div>
          {!useSticky && (
            <span
              aria-hidden="true"
              className="text-syntax-function flex items-center gap-1 font-mono text-xs"
            >
              <span
                style={{
                  display: 'inline-block',
                  animation: 'swipe-hint 1.6s ease-in-out infinite',
                }}
              >
                →
              </span>
              <span>swipe</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );

  // ===== Mobile / reduced-motion fallback =====
  if (!useSticky) {
    return (
      <section id="projects" className="relative w-full py-[120px]">
        {Header}
        <div
          ref={mobileScrollerRef}
          className="hide-scrollbar mt-8 flex snap-x snap-mandatory gap-[4vw] overflow-x-auto overflow-y-hidden px-6 pb-6"
          style={{ WebkitOverflowScrolling: 'touch', scrollPaddingLeft: 24 }}
        >
          {projects.map((p, i) => (
            <div key={p.id} style={{ scrollSnapAlign: 'start' }}>
              <ProjectCard project={p} index={i + 1} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ===== Desktop sticky horizontal scroll =====
  // Outer section: tall enough to "house" the entire horizontal travel.
  // Sticky container: pinned to viewport top while outer is in view.
  // Track: imperatively translated based on scroll progress.
  return (
    <section
      ref={outerRef}
      id="projects"
      className="relative w-full"
      // height set imperatively in the height-compute effect
    >
      <div
        ref={stickyRef}
        className="flex flex-col overflow-hidden"
        style={{ position: 'sticky', top: 0, height: '100vh' }}
      >
        {Header}

        <div className="flex min-h-0 flex-1 items-center" style={{ paddingBottom: 24 }}>
          <div
            ref={trackRef}
            className="flex will-change-transform"
            style={{
              gap: '4vw',
              paddingLeft: '7vw',
              paddingRight: '7vw',
              transform: 'translate3d(0,0,0)',
            }}
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
