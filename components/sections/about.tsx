'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { PixelAvatar } from '@/components/effects/pixel-avatar';
import { about } from '@/data/content';

import { Skills } from './skills';

const CHECKER_BG = 'repeating-conic-gradient(#1a1b26 0% 25%, #20212e 0% 50%) 50% / 24px 24px';

export function About() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="relative w-full px-6 py-24 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-text-muted mb-8 font-mono text-sm">{'// about'}</p>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[280px_1fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="border-border-default bg-bg-secondary relative mx-0 w-full max-w-[280px] overflow-hidden rounded-xl border p-4 md:mx-auto md:max-w-[360px]">
              <div className="mb-2.5 flex items-center gap-1.5">
                <span
                  className="bg-syntax-error inline-block rounded-full"
                  style={{ width: 10, height: 10 }}
                />
                <span
                  className="bg-syntax-number inline-block rounded-full"
                  style={{ width: 10, height: 10 }}
                />
                <span
                  className="bg-syntax-string inline-block rounded-full"
                  style={{ width: 10, height: 10 }}
                />
                <span className="text-text-muted ml-auto font-mono text-[11px]">avatar.png</span>
              </div>

              <div
                className="flex aspect-square w-full items-end justify-center overflow-hidden rounded-lg"
                style={{ background: CHECKER_BG }}
              >
                <PixelAvatar />
              </div>

              <div className="text-text-secondary mt-3.5 flex items-center gap-2 font-mono text-xs">
                <span
                  className="bg-syntax-string pulse-dot inline-block rounded-full"
                  style={{ width: 8, height: 8 }}
                />
                <span>
                  online — <span className="text-syntax-string">open to work</span>
                </span>
              </div>
              <p className="text-text-muted mt-2 font-mono text-[11px]">📍 LA · remote-friendly</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="mb-6 font-mono leading-[1.1] font-bold tracking-[-0.01em]"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              <span className="text-text-primary">engineer who actually </span>
              <span className="text-syntax-string">ships.</span>
            </h2>

            <p className="text-text-primary mb-3.5 max-w-[640px] text-[17px] leading-[1.7]">
              {about.paragraphs[0]}
            </p>
            <p className="text-text-secondary mb-3.5 max-w-[640px] text-[17px] leading-[1.7]">
              {about.paragraphs[1]}
            </p>
            <p className="text-text-secondary mb-10 max-w-[640px] text-[17px] leading-[1.7]">
              {about.paragraphs[2]}
            </p>

            <Skills />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
