'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { experience } from '@/data/content';
import type { ExperienceEntry } from '@/data/types';
import { cn } from '@/lib/utils';

// Module-level tag categorization — built once, not on every render.
const TAG_BLUE = new Set([
  'React',
  'TypeScript',
  'Next.js',
  'Tailwind',
  'Vue',
  'Redux',
  'Sass',
  'React Native',
]);
const TAG_PURPLE = new Set([
  'Node.js',
  'GraphQL',
  'PostgreSQL',
  'Postgres',
  'Node',
  'Prisma',
  'Redis',
]);
const TAG_ORANGE = new Set(['AWS', 'Docker', 'Terraform', 'GitHub Actions', 'Vercel', 'WordPress']);

function tagColor(name: string): string {
  if (TAG_BLUE.has(name)) return 'var(--syntax-function)';
  if (TAG_PURPLE.has(name)) return 'var(--syntax-keyword)';
  if (TAG_ORANGE.has(name)) return 'var(--syntax-number)';
  return 'var(--text-secondary)';
}

const FADE_BASE = 'transition-all duration-500 ease-out';
const FADE_HIDDEN = 'opacity-0 translate-y-3';
const FADE_SHOWN = 'opacity-100 translate-y-0';

// Single source of truth for the timeline's x-coordinate (in px from the
// timeline container's left edge). Both the line's center and every circle's
// center sit at exactly this x.
const TIMELINE_X = 17;
const NODE_SIZE = 18;
const NODE_TOP = 12; // matches each entry's top-margin within its li
const ENTRY_PL = 44; // li padding-left — leaves ~26px between circle and content

type CircleRef = React.RefObject<HTMLSpanElement | null>;

interface EntryProps {
  entry: ExperienceEntry;
  index: number;
  onActivate: (i: number) => void;
  circleRef: CircleRef;
}

function TimelineEntry({ entry, index, onActivate, circleRef }: EntryProps) {
  const descRef = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(false);
  const isCurrent = entry.isCurrent === true;
  const nodeColor = isCurrent ? 'var(--syntax-string)' : 'var(--syntax-function)';

  // Unified observer anchored on the description paragraph (the <p> at the
  // BOTTOM of each card). The description's top entering the viewport is
  // the natural reading anchor — it fires when the user has actually
  // arrived at the entry, regardless of card height. Drives both
  // `visible` (card fade-in) and `onActivate(index)` (parent's line draw)
  // from a single callback so the two motions stay in lockstep.
  // rootMargin is 0 on all sides — no predictive offset needed because
  // the description sits at a content-anchored, naturally well-separated
  // position in each card; consecutive entries can no longer collide on
  // the same scroll position the way wrapper-anchored triggers could.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      onActivate(index);
      return;
    }
    const node = descRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          onActivate(index);
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0,
      },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [index, onActivate]);

  return (
    <li className="relative" style={{ paddingLeft: ENTRY_PL }}>
      {/* Timeline node — the parent measures this element's y-position via
          circleRef to compute where the bright line should stop. */}
      <span
        ref={circleRef}
        aria-hidden="true"
        className="bg-bg-primary absolute flex items-center justify-center rounded-full"
        style={{
          left: TIMELINE_X - NODE_SIZE / 2,
          top: NODE_TOP,
          width: NODE_SIZE,
          height: NODE_SIZE,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: nodeColor,
          boxSizing: 'border-box',
        }}
      >
        {isCurrent && (
          // Two-layer structure: halo (radial-gradient, scaled by breathe-glow)
          // sits behind a solid core (opacity-only via breathe-core). The
          // wrapper is the size of the core; the halo is absolutely positioned
          // and centered, so it can spill past the 18×18 outer ring at peak.
          <span
            className="relative flex items-center justify-center"
            style={{ width: 10, height: 10 }}
          >
            {/* Halo layer */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute rounded-full"
              style={{
                top: '50%',
                left: '50%',
                width: 22,
                height: 22,
                background:
                  'radial-gradient(circle, rgba(158,206,106,0.7) 0%, rgba(158,206,106,0.3) 40%, rgba(158,206,106,0) 70%)',
                animation: 'breathe-glow 2s ease-in-out infinite',
              }}
            />
            {/* Solid core dot */}
            <span
              className="relative rounded-full"
              style={{
                width: 8,
                height: 8,
                background: 'var(--syntax-string)',
                boxShadow: '0 0 4px var(--syntax-string)',
                animation: 'breathe-core 2s ease-in-out infinite',
              }}
            />
          </span>
        )}
      </span>

      <div
        className={cn(
          'border-border-default bg-bg-secondary/60 relative rounded-md border p-5 sm:p-6',
          FADE_BASE,
          visible ? FADE_SHOWN : FADE_HIDDEN,
        )}
      >
        {isCurrent && (
          <span className="text-syntax-string absolute top-3 right-4 inline-flex items-center gap-1.5 font-mono text-xs">
            {/* Dot B — same halo + core structure as Dot A, slightly smaller
                to match the inline-text context. */}
            <span
              className="relative inline-flex items-center justify-center"
              style={{ width: 9, height: 9 }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  width: 20,
                  height: 20,
                  background:
                    'radial-gradient(circle, rgba(158,206,106,0.7) 0%, rgba(158,206,106,0.3) 40%, rgba(158,206,106,0) 70%)',
                  animation: 'breathe-glow 2s ease-in-out infinite',
                }}
              />
              <span
                className="relative rounded-full"
                style={{
                  width: 7,
                  height: 7,
                  background: 'var(--syntax-string)',
                  boxShadow: '0 0 4px var(--syntax-string)',
                  animation: 'breathe-core 2s ease-in-out infinite',
                }}
              />
            </span>
            {'// current'}
          </span>
        )}

        <h3
          className="text-text-primary font-mono font-bold tracking-[-0.01em]"
          style={{
            fontSize: 'clamp(24px, 2.6vw, 30px)',
            lineHeight: 1.15,
            paddingRight: isCurrent ? 90 : 0,
          }}
        >
          {entry.company}
        </h3>

        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-sm">
          <span className="text-syntax-function font-medium">{entry.role}</span>
          <span className="text-text-muted">·</span>
          <span className="text-text-muted">{entry.period}</span>
        </p>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[13px]">
          {entry.stack.map((tech, i) => (
            <span key={tech} className="inline-flex items-center gap-3">
              <span style={{ color: tagColor(tech) }}>{tech}</span>
              {i < entry.stack.length - 1 && <span className="text-text-muted">·</span>}
            </span>
          ))}
        </div>

        <p
          ref={descRef}
          className="text-text-primary mt-4 max-w-[680px] font-sans text-base leading-[1.7]"
        >
          {entry.description}
        </p>
      </div>
    </li>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  // One ref-like object per entry, decided at render time. We hold the array
  // in a useMemo with empty deps — the array identity is stable across
  // renders, while React mutates each inner `.current` when the corresponding
  // <span> mounts. Stored this way (not in `useRef.current`) so reading
  // `circleRefs[i]` in JSX doesn't trip the react-hooks/refs lint rule.
  const circleRefs = useMemo<Array<{ current: HTMLSpanElement | null }>>(
    () => experience.map(() => ({ current: null })),
    [],
  );
  const [activeIndex, setActiveIndex] = useState(-1);
  const [lineHeight, setLineHeight] = useState(0);

  // Monotonic activation: never decreases, so out-of-order observer firings
  // (e.g. fast scroll) cannot retract the bright line.
  const handleActivate = useCallback((i: number) => {
    setActiveIndex((prev) => (i > prev ? i : prev));
  }, []);

  // Recompute the bright line's target height whenever activeIndex changes.
  // For non-last entries: target = the active circle's center Y in container
  // coords. For the LAST entry: target = the bottom edge of the dim track
  // (containerHeight - NODE_TOP, mirroring track's `bottom: NODE_TOP`), so
  // the line extends past the final circle and tails off at the track end.
  // useLayoutEffect runs synchronously after DOM mutations but before paint
  // — the height update lands in the same commit as the activeIndex change,
  // so the line draws to the new target without a frame of visual lag. If
  // refs aren't attached yet for some reason, retry once on the next frame
  // rather than silently dropping the update.
  useLayoutEffect(() => {
    if (activeIndex < 0) {
      setLineHeight(0);
      return;
    }
    const compute = (): boolean => {
      const containerEl = containerRef.current;
      if (!containerEl) return false;
      const isLast = activeIndex === experience.length - 1;
      let targetY: number;
      if (isLast) {
        targetY = containerEl.getBoundingClientRect().height - NODE_TOP;
      } else {
        // Non-last entry N activated → line draws to circle N+1, the NEXT
        // circle. Semantically: "you're reading entry N, the timeline has
        // already connected through circle N and is now leading to N+1."
        // The previous behavior (drawing to circle N) made the line appear
        // one circle behind the user's reading position.
        const targetIndex = activeIndex + 1;
        const circleEl = circleRefs[targetIndex]?.current;
        if (!circleEl) return false;
        const containerTop = containerEl.getBoundingClientRect().top;
        const circleRect = circleEl.getBoundingClientRect();
        targetY = circleRect.top + circleRect.height / 2 - containerTop;
      }
      setLineHeight(targetY);
      return true;
    };

    if (compute()) return;
    const rafId = requestAnimationFrame(() => {
      compute();
    });
    return () => cancelAnimationFrame(rafId);
  }, [activeIndex, circleRefs]);

  // Resize listener — re-measure with the same isLast branching so the line
  // stays correctly positioned at full extent (or at the active circle's
  // center) across viewport changes.
  useEffect(() => {
    const onResize = () => {
      if (activeIndex < 0) return;
      const containerEl = containerRef.current;
      if (!containerEl) return;

      const isLast = activeIndex === experience.length - 1;
      let targetY: number;
      if (isLast) {
        const containerHeight = containerEl.getBoundingClientRect().height;
        targetY = containerHeight - NODE_TOP;
      } else {
        // Same N+1 targeting as the layout-effect — the resize re-measure
        // must look up the SAME circle as the layout-effect, otherwise the
        // line would jump back one circle every time the viewport resizes.
        const targetIndex = activeIndex + 1;
        const circleEl = circleRefs[targetIndex]?.current;
        if (!circleEl) return;
        const containerTop = containerEl.getBoundingClientRect().top;
        const circleRect = circleEl.getBoundingClientRect();
        targetY = circleRect.top + circleRect.height / 2 - containerTop;
      }
      setLineHeight(targetY);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeIndex, circleRefs]);

  // Safety net for the last entry — an IntersectionObserver targeted at the
  // LAST circle with an intentionally CONSERVATIVE rootMargin. Negative 10%
  // shrinks the detection zone so the last circle has to genuinely enter
  // the viewport (and sit at least 10% of viewport-height above the bottom
  // edge) before this fires. That keeps it from racing the per-entry
  // observer for the second-to-last entry: the per-entry IO with +20% is
  // the primary trigger for ALL entries including the last; this is
  // strictly insurance for fast-scroll / weird-viewport edge cases. Once
  // the last index activates the early-return prevents reattachment.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lastIndex = experience.length - 1;
    if (activeIndex >= lastIndex) return;
    const lastCircle = circleRefs[lastIndex]?.current;
    if (!lastCircle) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          handleActivate(lastIndex);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    );
    observer.observe(lastCircle);
    return () => observer.disconnect();
  }, [activeIndex, handleActivate, circleRefs]);

  return (
    <section id="experience" className="relative w-full px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-text-muted mb-4 font-mono text-sm">{'// experience'}</p>

        <h2
          className="font-mono font-bold tracking-[-0.01em]"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1, marginBottom: 56 }}
        >
          <span className="text-text-muted">function </span>
          <span className="text-syntax-function">career</span>
          <span className="text-text-primary">()</span>
          <span className="text-text-primary"> {'{'}</span>
        </h2>

        {/* Relative timeline wrapper: holds the dim track, the single bright
            animated line, and the OL of entries. The animated line's height
            is driven by activeIndex/lineHeight in the parent — there are no
            per-entry segments anywhere below this point. */}
        <div ref={containerRef} className="relative">
          {/* Track — dim full-length background line, always visible */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              left: TIMELINE_X - 1,
              top: NODE_TOP,
              bottom: NODE_TOP,
              width: 2,
              background: 'var(--border-default)',
              opacity: 0.5,
            }}
          />

          {/* Single animated bright line — exactly one of these in the file.
              Height transitions over 0.7s whenever activeIndex bumps to a
              new entry, producing the "draws to next stop" effect. The
              `lineHeight - NODE_TOP` term compensates for the `top: NODE_TOP`
              so the line's bottom lands exactly on the circle's center.

              On the LAST activation the line extends past the final circle
              all the way to the dim track's bottom edge — to avoid a hard
              square cut hanging in empty space, the background becomes a
              gradient whose final 8% fades to transparent, giving the tail
              a soft taper. Earlier activations keep solid colour so each
              circle-to-circle segment looks crisp. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              left: TIMELINE_X - 1,
              top: NODE_TOP,
              width: 2,
              height: lineHeight > 0 ? `${lineHeight - NODE_TOP}px` : '0px',
              background:
                activeIndex === experience.length - 1
                  ? 'linear-gradient(to bottom, var(--syntax-function) 0%, var(--syntax-function) 92%, transparent 100%)'
                  : 'var(--syntax-function)',
              transition: 'height 1.6s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '0 0 1px 1px',
            }}
          />

          <ol className="relative space-y-9">
            {experience.map((entry, i) => (
              <TimelineEntry
                key={entry.company + i}
                entry={entry}
                index={i}
                onActivate={handleActivate}
                circleRef={circleRefs[i]!}
              />
            ))}
          </ol>
        </div>

        <p
          className="text-text-primary mt-6 font-mono font-bold"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1 }}
        >
          {'}'}
        </p>
      </div>

      {/* Local keyframes — scoped here so style.css stays small.
          breathe-glow drives a separate halo LAYER (radial-gradient) behind
          each dot, scaling from 1× to 1.6× while staying centered. The dot
          itself never resizes — breathe-core only animates its opacity.
          Result: light visibly expands and contracts in peripheral vision
          without the dot appearing to grow. translate(-50%, -50%) is required
          because the halo is positioned with top:50%; left:50%. */}
      <style>{`
        @keyframes breathe-glow {
          0%, 100% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.35);
          }
        }

        @keyframes breathe-core {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
