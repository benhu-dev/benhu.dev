'use client';

import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { projects } from '@/lib/data';
import { cn } from '@/lib/utils';

import { ProjectCard } from './project-card';

const TRANSITION_MS = 700;
const COOLDOWN_MS = 200;
const IDLE_MS = 150;
const MOBILE_BREAKPOINT = 768;

export function Projects() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [active, setActive] = useState(false);

  const isAnimatingRef = useRef(false);
  const cooldownRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  const total = projects.length;

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const useScrollJack = !isMobile && !reduced;

  const scrollToNextSection = useCallback(() => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const scrollToPrevSection = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const advance = useCallback(
    (direction: 1 | -1) => {
      if (isAnimatingRef.current || cooldownRef.current) return;
      const current = indexRef.current;
      const next = current + direction;

      if (next < 0) {
        scrollToPrevSection();
        return;
      }
      if (next >= total) {
        scrollToNextSection();
        return;
      }

      isAnimatingRef.current = true;
      setIndex(next);
      setTimeout(() => {
        isAnimatingRef.current = false;
        cooldownRef.current = true;
        setTimeout(() => {
          cooldownRef.current = false;
        }, COOLDOWN_MS);
      }, TRANSITION_MS);
    },
    [scrollToNextSection, scrollToPrevSection, total],
  );

  // Lock body scroll + wheel handler when section is fully visible
  useEffect(() => {
    if (!useScrollJack) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.intersectionRatio >= 0.95) {
          setActive(true);
        } else {
          setActive(false);
        }
      },
      { threshold: [0, 0.5, 0.95, 1] },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [useScrollJack]);

  useEffect(() => {
    if (!useScrollJack) return;
    if (!active) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [active, useScrollJack]);

  useEffect(() => {
    if (!useScrollJack || !active) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        // idle reached — allow next switch
      }, IDLE_MS);

      if (isAnimatingRef.current || cooldownRef.current) return;
      if (Math.abs(e.deltaY) < 8 && Math.abs(e.deltaX) < 8) return;
      const direction: 1 | -1 = e.deltaY > 0 || e.deltaX > 0 ? 1 : -1;
      advance(direction);
    };

    const onKey = (e: KeyboardEvent) => {
      const keysNext = ['ArrowDown', 'ArrowRight', 'PageDown', ' '];
      const keysPrev = ['ArrowUp', 'ArrowLeft', 'PageUp'];
      if (keysNext.includes(e.key)) {
        e.preventDefault();
        advance(1);
      } else if (keysPrev.includes(e.key)) {
        e.preventDefault();
        advance(-1);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [active, advance, useScrollJack]);

  // Mobile: track scroll position to update active dot
  useEffect(() => {
    if (useScrollJack) return;
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const scrollLeft = track.scrollLeft;
      const cardWidth = track.clientWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== indexRef.current) {
        setIndex(Math.max(0, Math.min(total - 1, newIndex)));
      }
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [useScrollJack, total]);

  const goTo = useCallback(
    (target: number) => {
      const safe = Math.max(0, Math.min(total - 1, target));
      if (useScrollJack) {
        if (safe !== indexRef.current) setIndex(safe);
      } else {
        const track = trackRef.current;
        if (!track) return;
        track.scrollTo({ left: safe * track.clientWidth, behavior: 'smooth' });
      }
    },
    [total, useScrollJack],
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={cn(
        'relative w-full overflow-hidden',
        useScrollJack ? 'h-screen' : 'min-h-screen py-20',
      )}
    >
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 pt-20 pb-6 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-text-muted mb-2 font-mono text-sm">{'// projects'}</p>
            <h2 className="font-mono text-3xl leading-tight font-bold sm:text-4xl md:text-5xl">
              <span className="text-text-primary">things I&apos;ve </span>
              <span className="text-syntax-string">shipped.</span>
            </h2>
          </div>
          <div className="hidden flex-col items-end gap-2 md:flex">
            <p className="text-text-muted font-mono text-sm">
              <span className="text-text-primary">{String(index + 1).padStart(2, '0')}</span> /{' '}
              {String(total).padStart(2, '0')}
            </p>
            <div className="flex gap-1.5">
              {projects.map((p, i) => (
                <span
                  key={p.id}
                  className={cn(
                    'h-1 w-8 rounded-full transition-colors',
                    i === index ? 'bg-syntax-string' : 'bg-border-default',
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {useScrollJack ? (
          <div className="relative mt-6 flex flex-1 items-center overflow-hidden">
            <div
              className="flex h-full transition-transform ease-in-out"
              style={{
                width: `${total * 100}%`,
                transform: `translateX(-${(index * 100) / total}%)`,
                transitionDuration: `${TRANSITION_MS}ms`,
              }}
            >
              {projects.map((project, i) => (
                <div
                  key={project.id}
                  className="flex h-full items-center justify-center"
                  style={{ width: `${100 / total}%` }}
                >
                  <ProjectCard project={project} isActive={i === index} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            ref={trackRef}
            className="mt-6 flex flex-1 snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {projects.map((project, i) => (
              <div
                key={project.id}
                className="flex w-full flex-shrink-0 snap-center items-stretch px-1"
              >
                <ProjectCard project={project} isActive={i === index} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between font-mono text-xs">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous project"
              className="border-border-default text-text-secondary hover:border-syntax-function hover:text-syntax-function inline-flex h-9 w-9 items-center justify-center rounded-sm border transition-colors disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === total - 1}
              aria-label="Next project"
              className="border-border-default text-text-secondary hover:border-syntax-function hover:text-syntax-function inline-flex h-9 w-9 items-center justify-center rounded-sm border transition-colors disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {!useScrollJack && (
            <div className="flex gap-1.5">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to project ${i + 1}`}
                  className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    i === index ? 'bg-syntax-string' : 'bg-border-default',
                  )}
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={scrollToNextSection}
            className="text-text-muted hover:text-syntax-function transition-colors"
          >
            [ skip → ]
          </button>
        </div>
      </div>
    </section>
  );
}
