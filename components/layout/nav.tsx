'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';

import { Logo } from './logo';

const NAV_ITEMS = [
  { id: 'about', label: '// about' },
  { id: 'projects', label: '// projects' },
  { id: 'experience', label: '// experience' },
  { id: 'contact', label: '// contact' },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sectionIds = useMemo(() => NAV_ITEMS.map((i) => i.id), []);
  const active = useActiveSection(sectionIds);
  const headerRef = useRef<HTMLElement | null>(null);

  // Publish the rendered nav height to a CSS variable. Hero (and anything
  // else that needs to clear the sticky nav) reads `var(--nav-height)`.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const height = entry.contentRect.height;
      document.documentElement.style.setProperty('--nav-height', `${height}px`);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ease-out',
          scrolled
            ? 'border-b-border-default bg-bg-primary/70 backdrop-blur-md'
            : 'backdrop-blur-0 border-b-transparent bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex cursor-pointer items-center gap-2.5"
            aria-label="Scroll to top"
          >
            <Logo size={22} />
            <span className="text-text-primary font-mono text-sm">ben-hu.tsx</span>
          </button>

          <ul className="hidden items-center gap-6 font-mono text-sm md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      'cursor-pointer px-1 py-2 transition-colors duration-200',
                      isActive
                        ? 'text-syntax-string'
                        : 'text-text-secondary hover:text-text-primary',
                    )}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
            <li>
              <Button variant="primary" size="sm" onClick={() => scrollTo('contact')}>
                &gt; hire_me
              </Button>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-text-primary cursor-pointer md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {open && (
        <div
          className="bg-bg-primary fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={cn(
                  'cursor-pointer font-mono text-2xl transition-colors',
                  isActive ? 'text-syntax-string' : 'text-text-primary',
                )}
              >
                {item.label}
              </button>
            );
          })}
          <Button variant="primary" size="lg" onClick={() => scrollTo('contact')} className="mt-4">
            &gt; hire_me
          </Button>
        </div>
      )}
    </>
  );
}
