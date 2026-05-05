'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

import { GridSphere } from '@/components/effects/grid-sphere';
import { Typewriter } from '@/components/effects/typewriter';
import { personal } from '@/lib/data';

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
    <section id="hero" className="relative flex min-h-screen w-full items-center overflow-hidden">
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <p className="hero-text-shadow text-text-muted mb-6 font-mono text-sm">{'// $ whoami'}</p>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="hero-text-shadow font-mono leading-[0.95] font-bold tracking-tight"
        >
          <span className="text-text-primary block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px]">
            const name
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[120px]">
            <span className="text-text-muted">= </span>
            <span className="text-syntax-string">&ldquo;Ben Hu&rdquo;</span>
          </span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.15 }}
          className="hero-text-shadow text-syntax-function mt-8 font-mono text-lg sm:text-xl md:text-2xl"
        >
          {personal.title} <ArrowRight size={18} className="inline" />{' '}
          <Typewriter text={personal.tagline} className="text-text-primary" />
        </motion.p>

        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="hero-text-shadow text-text-primary mt-6 max-w-2xl text-base leading-relaxed sm:text-lg"
        >
          {personal.description}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.45 }}
          className="pointer-events-auto mt-10 flex flex-wrap items-center gap-3"
        >
          <button
            type="button"
            onClick={() => scrollTo('projects')}
            className="bg-syntax-string text-bg-primary hover:bg-syntax-string/90 inline-flex items-center gap-2 rounded-sm px-5 py-3 font-mono text-sm font-semibold transition-colors"
          >
            &gt; view_projects()
          </button>
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="border-border-default text-text-primary hover:border-syntax-function hover:text-syntax-function inline-flex items-center gap-2 rounded-sm border bg-transparent px-5 py-3 font-mono text-sm transition-colors"
          >
            $ contact --me
          </button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.6 }}
          className="border-border-default bg-bg-primary/60 mt-8 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-sm"
        >
          <span className="bg-syntax-string pulse-dot inline-block h-2 w-2 rounded-full" />
          <span className="text-text-secondary">{personal.status}</span>
        </motion.div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('about')}
        className="text-text-muted hover:text-syntax-string pointer-events-auto absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-xs transition-colors"
        aria-label="Scroll to about"
      >
        <span>↓ scroll</span>
        <ChevronDown size={14} className="bounce-subtle" />
      </button>

      <GridSphere />
    </section>
  );
}
