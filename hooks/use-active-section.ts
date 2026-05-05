'use client';

import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[], rootMargin = '-40% 0px -55% 0px'): string {
  const [active, setActive] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sectionIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return active;
}
