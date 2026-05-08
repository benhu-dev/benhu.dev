// Simple in-memory rate limiter keyed by IP. Suitable for a single-instance
// deployment or a personal site. On Vercel's serverless runtime the maps
// reset on every cold start, which is acceptable here — the goal is to slow
// down naive abuse, not to be a hard ceiling. For production scale, swap
// this for a shared store (Upstash Redis, Vercel KV, etc.) so limits hold
// across instances.

type Reason = 'minute' | 'day';

interface RateLimitResult {
  allowed: boolean;
  reason?: Reason;
}

const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const MINUTE_LIMIT = 1;
const DAY_LIMIT = 5;

const minuteMap: Map<string, number[]> = new Map();
const dayMap: Map<string, number[]> = new Map();

function pruneAndPeek(
  map: Map<string, number[]>,
  ip: string,
  windowMs: number,
  now: number,
): number[] {
  const cutoff = now - windowMs;
  const fresh = (map.get(ip) ?? []).filter((t) => t > cutoff);
  map.set(ip, fresh);
  return fresh;
}

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();

  const minuteHits = pruneAndPeek(minuteMap, ip, MINUTE_MS, now);
  if (minuteHits.length >= MINUTE_LIMIT) {
    return { allowed: false, reason: 'minute' };
  }

  const dayHits = pruneAndPeek(dayMap, ip, DAY_MS, now);
  if (dayHits.length >= DAY_LIMIT) {
    return { allowed: false, reason: 'day' };
  }

  minuteHits.push(now);
  dayHits.push(now);
  // The push above mutates the arrays in place; the map already holds the
  // same array references after pruneAndPeek wrote them back, so no further
  // .set() call is needed. (Map values are stored by reference.)

  return { allowed: true };
}
