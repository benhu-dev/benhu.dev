'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { experience } from '@/lib/data';
import type { ExperienceEntry } from '@/lib/types';

interface EntryProps {
  entry: ExperienceEntry;
  index: number;
}

function TimelineEntry({ entry, index }: EntryProps) {
  const reduced = useReducedMotion();
  return (
    <motion.li
      initial={{ opacity: 0, x: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: reduced ? 0 : index * 0.1 }}
      className="relative pl-10"
    >
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, delay: reduced ? 0 : index * 0.1 }}
        className="bg-bg-primary border-syntax-function absolute top-3 left-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2"
        style={{ boxShadow: '0 0 12px rgba(122, 162, 247, 0.5)' }}
      />

      <div className="border-border-default bg-bg-secondary/60 relative rounded-md border p-5 sm:p-6">
        {entry.isCurrent && (
          <span className="text-syntax-string absolute top-3 right-4 font-mono text-xs">
            {'// current'}
          </span>
        )}
        <h3 className="font-mono text-2xl font-bold sm:text-3xl">{entry.company}</h3>
        <p className="mt-1 font-mono text-sm">
          <span className="text-syntax-function">{entry.role}</span>
          <span className="text-text-muted"> · </span>
          <span className="text-text-muted">{entry.period}</span>
        </p>
        <div className="text-text-secondary mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs">
          {entry.stack.map((tech, i) => (
            <span key={tech} className="flex items-center gap-2">
              {i > 0 && <span className="text-text-muted">·</span>}
              <span className="text-syntax-keyword">{tech}</span>
            </span>
          ))}
        </div>
        <p className="text-text-primary mt-4 leading-relaxed">{entry.description}</p>
      </div>
    </motion.li>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative w-full px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-text-muted mb-4 font-mono text-sm">{'// experience'}</p>
        <h2 className="font-mono text-3xl font-bold sm:text-4xl md:text-5xl">
          <span className="text-syntax-keyword">function</span>{' '}
          <span className="text-text-primary">career()</span>{' '}
          <span className="text-text-muted">{'{'}</span>
        </h2>

        <ol className="border-syntax-function/40 mt-10 space-y-6 border-l-2 pl-2">
          {experience.map((entry, i) => (
            <TimelineEntry key={entry.company + i} entry={entry} index={i} />
          ))}
        </ol>

        <p className="text-text-muted mt-6 font-mono text-2xl">{'}'}</p>
      </div>
    </section>
  );
}
