'use client';

import { useState } from 'react';

import type { Project } from '@/lib/types';

import { ProjectScreenshot } from './project-screenshot';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const CARD_BASE_STYLE: React.CSSProperties = {
  flex: '0 0 86vw',
  width: '86vw',
  maxWidth: 'none',
  minWidth: 320,
  height: '70vh',
  minHeight: 480,
  scrollSnapAlign: 'start',
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [hover, setHover] = useState(false);

  return (
    <article
      data-card
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="bg-bg-secondary relative flex flex-col overflow-hidden rounded-[14px] border"
      style={{
        ...CARD_BASE_STYLE,
        borderColor: hover ? 'var(--syntax-function)' : 'var(--border-default)',
        boxShadow: hover
          ? '0 24px 48px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(122,162,247,0.2)'
          : '0 8px 24px -12px rgba(0,0,0,0.5)',
        transition: 'border-color 0.32s ease, box-shadow 0.32s ease',
      }}
    >
      {/* Top: mockup screenshot region — flex:1 so it takes remaining space */}
      <div className="relative flex-1 overflow-hidden" style={{ minHeight: 0 }}>
        {/* Inner zoom wrapper — only the SVG scales on hover, not the badge or fade */}
        <div
          className="h-full w-full"
          style={{
            transform: hover ? 'scale(1.06)' : 'scale(1)',
            transformOrigin: 'center center',
            transition: 'transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1)',
          }}
        >
          <ProjectScreenshot palette={project.palette} label={project.id} type={project.type} />
        </div>

        {/* index badge — outside the zoom wrapper so it stays fixed */}
        <div
          className="border-border-default text-text-secondary absolute top-4 left-[18px] rounded-sm border px-2.5 py-1 font-mono text-xs backdrop-blur-md"
          style={{ background: 'rgba(26,27,38,0.7)' }}
        >
          <span className="text-text-muted">#</span>
          <span className="text-syntax-number">{String(index).padStart(2, '0')}</span>
        </div>

        {/* fade-to-bg-2 at the bottom */}
        <div
          className="pointer-events-none absolute right-0 bottom-0 left-0"
          style={{
            height: 60,
            background: 'linear-gradient(to bottom, rgba(26,27,38,0) 0%, var(--bg-secondary) 100%)',
          }}
        />
      </div>

      {/* Bottom: content region — fixed sizing */}
      <div className="border-border-default bg-bg-secondary flex flex-shrink-0 flex-col gap-3 border-t px-7 pt-5 pb-6">
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
          style={{ fontSize: 'clamp(24px, 2.6vw, 36px)', lineHeight: 1.05 }}
        >
          {project.title}
        </h3>

        {/* tagline */}
        <p
          className="text-text-secondary flex-shrink-0 font-sans"
          style={{ fontSize: 15, lineHeight: 1.5, maxWidth: 720 }}
        >
          {project.tagline}
        </p>

        {/* stats + buttons row */}
        <div className="mt-1 flex flex-shrink-0 flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
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
          <div className="flex gap-2.5">
            <a
              href={project.liveUrl ?? '#'}
              target={project.liveUrl ? '_blank' : undefined}
              rel={project.liveUrl ? 'noopener noreferrer' : undefined}
              onClick={(e) => {
                if (!project.liveUrl) e.preventDefault();
              }}
              className="border-syntax-string bg-syntax-string text-bg-primary hover:text-syntax-string inline-flex cursor-pointer items-center gap-1 rounded border px-3.5 py-1.5 font-mono text-xs font-semibold transition-all duration-200 hover:bg-transparent hover:shadow-[inset_0_0_0_2px_var(--syntax-string),0_0_24px_-8px_var(--syntax-string)]"
            >
              [ live <span style={{ fontSize: 11 }}>↗</span> ]
            </a>
            <a
              href={project.codeUrl ?? '#'}
              target={project.codeUrl ? '_blank' : undefined}
              rel={project.codeUrl ? 'noopener noreferrer' : undefined}
              onClick={(e) => {
                if (!project.codeUrl) e.preventDefault();
              }}
              className="border-border-default text-text-primary hover:border-syntax-function hover:text-syntax-function inline-flex cursor-pointer items-center gap-1 rounded border bg-transparent px-3.5 py-1.5 font-mono text-xs transition-all duration-200 hover:shadow-[inset_0_0_0_1px_var(--syntax-function),0_0_20px_-8px_var(--syntax-function)]"
            >
              [ code <span style={{ fontSize: 11 }}>↗</span> ]
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
