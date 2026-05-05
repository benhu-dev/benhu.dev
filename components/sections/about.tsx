'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { PixelAvatar } from '@/components/effects/pixel-avatar';
import { about, personal } from '@/lib/data';

import { Skills } from './skills';

export function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="relative w-full px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-text-muted mb-8 font-mono text-sm">{'// about'}</p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            <div className="border-border-default bg-bg-secondary overflow-hidden rounded-md border">
              <div className="border-border-default flex items-center gap-2 border-b px-3 py-2">
                <span className="bg-syntax-error h-2.5 w-2.5 rounded-full" />
                <span className="bg-syntax-number h-2.5 w-2.5 rounded-full" />
                <span className="bg-syntax-string h-2.5 w-2.5 rounded-full" />
                <span className="text-text-muted ml-2 font-mono text-xs">avatar.png</span>
              </div>
              <PixelAvatar className="border-0" />
            </div>
            <div className="mt-4 flex items-center gap-2 font-mono text-xs">
              <span className="bg-syntax-string pulse-dot h-2 w-2 rounded-full" />
              <span className="text-syntax-string">online — open to work</span>
            </div>
            <p className="text-text-muted mt-1 font-mono text-xs">{personal.location}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <h2 className="font-mono text-3xl leading-tight font-bold sm:text-4xl md:text-5xl">
              <span className="text-text-primary">engineer who actually </span>
              <span className="text-syntax-string">ships.</span>
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed sm:text-lg">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-text-primary">
                  {p}
                </p>
              ))}
            </div>

            <Skills />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
