'use client';

import { useEffect, useRef, useState } from 'react';

interface UseFadeInResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  visible: boolean;
}

/**
 * IntersectionObserver-driven scroll fade-in. The element becomes `visible`
 * the first time it enters the viewport, then disconnects (one-shot). Pair
 * with a Tailwind `transition-all` + `opacity/translate` flip on the element.
 *
 * Respects `prefers-reduced-motion: reduce` — visible is set to true
 * immediately and the observer is never installed.
 *
 * @param delay  optional delay in ms after the element intersects, used for
 *               staggering siblings (e.g. `useFadeIn(i * 100)`).
 */
export function useFadeIn<T extends HTMLElement = HTMLElement>(delay = 0): UseFadeInResult<T> {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        if (delay > 0) {
          timeoutId = setTimeout(() => setVisible(true), delay);
        } else {
          setVisible(true);
        }
        observer.disconnect();
      },
      { rootMargin: '0px 0px -80px 0px' },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [delay]);

  return { ref, visible };
}
