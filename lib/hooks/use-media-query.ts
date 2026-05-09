import { useSyncExternalStore } from 'react';

// Subscribe to a CSS media query. Returns false during SSR (no DOM available)
// and the live match state on the client; rerenders when the match flips.
// useSyncExternalStore is the right primitive here — useEffect-based
// implementations can briefly return a stale value during transitions.
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener('change', callback);
      return () => mql.removeEventListener('change', callback);
    },
    () => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia(query).matches;
    },
    () => false,
  );
}
