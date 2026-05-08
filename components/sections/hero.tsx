'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { GridSphere } from '@/components/effects/grid-sphere';
import { Typewriter } from '@/components/effects/typewriter';
import { Button } from '@/components/ui/button';
import { personal } from '@/data/content';

export function Hero() {
  const reduced = useReducedMotion();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden lg:h-[100dvh]"
    >
      <div
        className="pointer-events-none relative z-10 flex flex-col px-6 pb-20 lg:px-16 lg:pb-24"
        style={{ paddingTop: 'var(--nav-height)' }}
      >
        <div className="mx-auto mt-12 w-full max-w-[1400px] lg:mt-16">
          <p className="hero-text-shadow text-text-muted mb-6 max-w-[880px] font-mono text-[13px]">
            {'// $ whoami'}
          </p>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="max-w-[880px]">
              <motion.h1
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="hero-text-shadow mb-[18px] font-mono leading-[1.0] font-bold tracking-[-0.02em]"
                style={{ fontSize: 'clamp(48px, 7.5vw, 104px)' }}
              >
                <span className="text-text-muted">const </span>
                <span className="text-text-primary">name</span>
                <span className="text-text-muted"> = </span>
                <span className="text-syntax-string">&ldquo;{personal.name}&rdquo;</span>
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="show"
                variants={fadeUp}
                transition={{ delay: 0.15 }}
                className="hero-text-shadow mb-10 font-mono md:mb-7 lg:whitespace-nowrap"
                style={{ fontSize: 'clamp(20px, 2.5vw, 30px)' }}
              >
                <span className="text-syntax-function">{personal.title}</span>{' '}
                <span className="text-text-muted">→</span>{' '}
                <Typewriter text={personal.tagline} className="text-text-secondary" />
              </motion.p>

              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                transition={{ delay: 0.45 }}
                className="pointer-events-auto mb-6 flex flex-wrap items-center gap-[14px] md:mb-4"
              >
                <Button variant="primary" size="md" onClick={() => scrollTo('projects')}>
                  &gt; view_projects()
                </Button>
                <Button variant="secondary" size="md" onClick={() => scrollTo('contact')}>
                  $ contact --me
                </Button>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                transition={{ delay: 0.6 }}
                className="border-border-default bg-bg-secondary inline-flex items-center gap-2 rounded-full border py-1.5 pr-3 pl-2.5 font-mono text-xs md:gap-3 md:py-[10px] md:pr-5 md:pl-4 md:text-sm"
              >
                <span
                  className="bg-syntax-string pulse-dot inline-block rounded-full"
                  style={{ width: 10, height: 10 }}
                />
                {/* Status pill is split visually around the em-dash for the
                    two-tone styling (white / muted / white). Source of truth
                    is `personal.status` — we split on " — " to keep the
                    multi-color rendering without hardcoding the words. */}
                {(() => {
                  const [primary, secondary = ''] = personal.status.split(' — ');
                  return (
                    <>
                      <span className="text-text-primary font-semibold">{primary}</span>
                      {secondary && (
                        <>
                          <span className="text-text-muted">—</span>
                          <span className="text-text-primary">{secondary}</span>
                        </>
                      )}
                    </>
                  );
                })()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('about')}
        className="text-text-muted hover:text-text-secondary pointer-events-auto absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1.5 font-mono text-[11px] transition-colors lg:bottom-12"
        aria-label="Scroll to about"
      >
        <span className="fade-bob inline-block">↓</span>
        <span>scroll</span>
      </button>

      <GridSphere />
    </section>
  );
}
