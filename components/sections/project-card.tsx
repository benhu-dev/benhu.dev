'use client';

import { Code, ExternalLink } from 'lucide-react';
import Image from 'next/image';

import { TagPill } from '@/components/ui/tag-pill';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
}

export function ProjectCard({ project, isActive }: ProjectCardProps) {
  return (
    <article
      className={cn(
        'border-border-default bg-bg-secondary/80 mx-auto flex h-full w-[90vw] max-w-[1200px] flex-col overflow-hidden rounded-md border transition-all duration-700 ease-in-out md:w-[80vw]',
        isActive ? 'scale-100 opacity-100' : 'scale-[0.95] opacity-70',
      )}
    >
      <div className="bg-bg-primary border-border-default relative aspect-[16/9] w-full flex-shrink-0 overflow-hidden border-b">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes="(max-width: 768px) 90vw, 80vw"
          className="object-cover"
          priority={isActive}
        />
        <div className="from-bg-primary/40 absolute inset-0 bg-gradient-to-b to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-6 md:gap-4 md:p-8">
        <div className="text-text-muted flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] sm:text-xs">
          {project.stack.map((tech, i) => (
            <span key={tech} className="flex items-center gap-2">
              {i > 0 && <span className="text-text-muted">·</span>}
              <span className="text-syntax-function">{tech}</span>
            </span>
          ))}
        </div>

        <h3 className="font-mono text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm sm:text-base">{project.tagline}</p>

        <div className="flex flex-wrap gap-2">
          {project.stats.map((stat, i) => (
            <TagPill key={i} color="muted">
              <span className="mr-1.5" aria-hidden="true">
                {stat.icon}
              </span>
              {stat.text}
            </TagPill>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-syntax-string text-bg-primary hover:bg-syntax-string/90 inline-flex items-center gap-2 rounded-sm px-4 py-2 font-mono text-sm font-semibold transition-colors"
            >
              [ live <ExternalLink size={14} /> ]
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border-default text-text-primary hover:border-syntax-function hover:text-syntax-function inline-flex items-center gap-2 rounded-sm border bg-transparent px-4 py-2 font-mono text-sm transition-colors"
            >
              [ code <Code size={14} /> ]
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
