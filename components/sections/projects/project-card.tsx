'use client';

import { useState } from 'react';

import type { Project } from '@/data/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Height/min-height live on the <article>'s className (responsive utilities)
// rather than here — a static React.CSSProperties object can't carry a media
// query, and we need different sizes for mobile vs desktop.
const CARD_BASE_STYLE: React.CSSProperties = {
  flex: '0 0 86vw',
  width: '86vw',
  maxWidth: 'none',
  minWidth: 320,
  scrollSnapAlign: 'start',
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <article
      data-card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="bg-bg-secondary relative flex h-[50vh] min-h-[380px] flex-col justify-end overflow-hidden rounded-[14px] border sm:h-[70vh] sm:min-h-[480px]"
      style={{
        ...CARD_BASE_STYLE,
        borderColor: hover ? 'var(--syntax-function)' : 'var(--border-default)',
        boxShadow: hover
          ? '0 24px 48px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(122,162,247,0.25), 0 0 30px -5px rgba(122,162,247,0.45)'
          : '0 8px 24px -12px rgba(0,0,0,0.5)',
        transition: 'border-color 0.32s ease, box-shadow 0.32s ease',
      }}
    >
      {/* Full-card screenshot. Absolute so it sits out of flex flow — the
          frosted info bar is the only in-flow child, anchored via parent's
          justify-end. Three stacked layers: blurred backdrop → dark scrim →
          contained foreground. The blurred backdrop fills empty space when
          the contained image's aspect ratio doesn't match the card's
          (especially on tall mobile cards), so the card always reads as
          visually complete. */}
      <div className="absolute inset-0">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(28px) saturate(115%) brightness(0.7)',
            // scale(1.15) clips blur halos against the article's
            // overflow-hidden — blur(28px) bleeds pixels past the bbox.
            transform: 'scale(1.15)',
            transformOrigin: 'center center',
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'rgba(13, 14, 22, 0.35)' }}
        />

        <div
          className="relative h-full w-full pt-8 sm:pt-0"
          style={{
            transform: hover ? 'scale(1.06)' : 'scale(1)',
            transformOrigin: 'center center',
            transition: 'transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- intentional plain <img>: arbitrary screenshot aspect ratios + lazy-loading is sufficient here. */}
          <img
            src={project.image}
            alt={project.imageAlt ?? `${project.title} screenshot`}
            className="h-full w-full object-contain object-top"
            loading="lazy"
          />
        </div>
      </div>

      {/* Index badge — absolute, layered above image */}
      <div
        className="border-border-default text-text-secondary absolute top-4 left-[18px] z-10 rounded-sm border px-2.5 py-1 font-mono text-xs backdrop-blur-md"
        style={{ background: 'rgba(26,27,38,0.7)' }}
      >
        <span className="text-text-muted">#</span>
        <span className="text-syntax-number">{String(index).padStart(2, '0')}</span>
      </div>

      {/* Frosted-glass info bar — anchored to bottom via parent's justify-end.
          backdrop-filter blur+saturate gives the glass a clean, color-true
          feel; pure blur alone reads washed-out. */}
      <div
        className="relative z-10 flex flex-shrink-0 flex-col gap-2.5 px-5 pt-4 pb-5 sm:gap-3 sm:px-7 sm:pt-5 sm:pb-6"
        style={{
          background: 'rgba(26,27,38,0.7)',
          backdropFilter: 'blur(15px) saturate(140%)',
          WebkitBackdropFilter: 'blur(16px) saturate(140%)',
          borderTop: '1px solid rgba(122,162,247,0.15)',
        }}
      >
        {/* tech tags */}
        <div className="flex flex-shrink-0 flex-wrap gap-x-2.5 gap-y-1 font-mono text-xs">
          {project.stack.map((t) => (
            <span key={t.name} style={{ color: t.color }}>
              <span className="text-text-muted">·</span> {t.name}
            </span>
          ))}
        </div>

        {/* title */}
        <h3
          className="text-text-primary flex-shrink-0 font-mono font-bold tracking-[-0.01em]"
          style={{ fontSize: 'clamp(20px, 2.6vw, 36px)', lineHeight: 1.05 }}
        >
          {project.title}
        </h3>

        {/* tagline — full text on mobile (cards may grow taller, intended);
            2-line clamp at sm:+ where cards are wide enough to fit the gist
            in two lines without losing context. */}
        <p
          className="text-text-secondary flex-shrink-0 font-sans sm:line-clamp-2"
          style={{
            fontSize: 'clamp(13px, 1.05vw, 15px)',
            lineHeight: 1.5,
            maxWidth: 720,
          }}
        >
          {project.tagline}
        </p>

        {/* stats + buttons row */}
        <div className="mt-1 flex flex-shrink-0 flex-wrap items-center justify-end gap-4 sm:justify-between">
          <div className="hidden flex-wrap gap-2 sm:flex">
            {project.stats.map((stat, i) => (
              <span
                key={i}
                className="border-border-default text-text-primary inline-flex items-center gap-1.5 rounded-full border py-[5px] pr-3 pl-2.5 font-mono text-xs"
                style={{ background: 'rgba(122,162,247,0.08)' }}
              >
                <span className="text-[13px] leading-none" aria-hidden="true">
                  {stat.icon}
                </span>
                <span>{stat.label}</span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-syntax-string bg-syntax-string text-bg-primary hover:text-syntax-string inline-flex cursor-pointer items-center gap-1 rounded border px-3.5 py-1.5 font-mono text-xs font-semibold transition-all duration-200 hover:bg-transparent hover:shadow-[inset_0_0_0_2px_var(--syntax-string),0_0_24px_-8px_var(--syntax-string)]"
              >
                [ live <span style={{ fontSize: 11 }}>↗</span> ]
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border-border-default text-text-primary hover:border-syntax-function hover:text-syntax-function inline-flex cursor-pointer items-center gap-1 rounded border bg-transparent px-3.5 py-1.5 font-mono text-xs transition-all duration-200 hover:shadow-[inset_0_0_0_1px_var(--syntax-function),0_0_20px_-8px_var(--syntax-function)]"
              >
                [ code <span style={{ fontSize: 11 }}>↗</span> ]
              </a>
            )}
            {project.internalLabel && (
              <span
                className="border-border-default text-text-muted inline-flex cursor-not-allowed items-center gap-1 rounded border bg-transparent px-3.5 py-1.5 font-mono text-xs"
                title="Internal application — not publicly accessible"
                aria-label={`${project.internalLabel} — not publicly accessible`}
              >
                [ {project.internalLabel}{' '}
                <span style={{ fontSize: 11 }} aria-hidden="true">
                  🔒
                </span>{' '}
                ]
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
