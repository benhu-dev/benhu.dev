'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';

import { FileTab } from './file-tab';

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
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
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-bg-primary/85 border-border-default border-b backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="border-border-default bg-bg-secondary text-syntax-string hover:border-syntax-string flex h-7 w-7 items-center justify-center rounded-sm border font-mono text-xs font-bold transition-colors"
              aria-label="Scroll to top"
            >
              [B]
            </button>
            <FileTab className="hidden sm:inline-flex" />
          </div>

          <ul className="hidden items-center gap-6 font-mono text-sm md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className={cn(
                      'hover:text-syntax-string transition-colors duration-150',
                      isActive ? 'text-syntax-string' : 'text-text-secondary',
                    )}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
            <li>
              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="bg-syntax-string text-bg-primary hover:bg-syntax-string/90 rounded-sm px-3 py-1.5 font-mono text-sm font-semibold transition-colors"
              >
                &gt; hire_me
              </button>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-text-primary md:hidden"
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
                  'font-mono text-2xl transition-colors',
                  isActive ? 'text-syntax-string' : 'text-text-primary',
                )}
              >
                {item.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="bg-syntax-string text-bg-primary mt-4 rounded-sm px-6 py-3 font-mono text-lg font-semibold"
          >
            &gt; hire_me
          </button>
        </div>
      )}
    </>
  );
}
