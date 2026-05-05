import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { sendContactEmail } from '@/lib/email';
import { contactFormSchema } from '@/lib/validations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const ipBuckets: Map<string, number[]> = new Map();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0];
    if (first) return first.trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (ipBuckets.get(ip) ?? []).filter((t) => t > windowStart);
  if (recent.length >= RATE_LIMIT_MAX) {
    ipBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipBuckets.set(ip, recent);
  return false;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot — silently succeed for bots
  if (parsed.data.honeypot && parsed.data.honeypot.trim() !== '') {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  try {
    await sendContactEmail(parsed.data);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Contact email failed:', message);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
