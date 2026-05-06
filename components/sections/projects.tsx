'use client';

import { useEffect, useRef, useState } from 'react';

import { projects } from '@/lib/data';

import { ProjectCard } from './projects/project-card';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function Projects() {
  const outerRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
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
    if (!useSticky) return;
    const computeHeight = () => {
      const outer = outerRef.current;
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
    return () => window.removeEventListener('resize', computeHeight);
  }, [useSticky]);

  // ===== Translate scrollY into translateX =====
  useEffect(() => {
    if (!useSticky) return;
    const handleScroll = () => {
      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;

      const rect = outer.getBoundingClientRect();
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const horizontalDistance = Math.max(0, trackWidth - viewportWidth);

      // rect.top: positive when section is below viewport top, negative when
      // it has scrolled past. Progress = how far we've scrolled past, clamped.
      const scrolledPast = Math.max(0, -rect.top);
      const maxScroll = outer.offsetHeight - viewportHeight;
      const progress = maxScroll > 0 ? Math.min(1, scrolledPast / maxScroll) : 0;

      const translateX = -progress * horizontalDistance;
      track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      setScrollProgress(progress);

      // Active card = the one whose on-screen center is closest to viewport
      // center. Same loop also writes per-card opacity so cards fade out
      // smoothly as they drift away from center (continuous, not binary).
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
      setActiveIndex(bestIdx);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [useSticky]);

  // ===== Mobile fallback scroller — closest-card detection =====
  useEffect(() => {
    if (useSticky) return;
    const el = mobileScrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = el.querySelectorAll<HTMLElement>('[data-card]');
      if (!cards.length) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const progress = maxScroll > 0 ? el.scrollLeft / maxScroll : 0;
      setScrollProgress(Math.max(0, Math.min(1, progress)));

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
      setActiveIndex(bestIdx);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [useSticky]);

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
          <span className="text-syntax-string">{pad(activeIndex + 1)}</span>
          <span className="text-text-muted"> / {pad(total)}</span>
        </div>
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
              borderRadius: 3,
            }}
          />
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
