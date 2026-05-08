import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Resend } from 'resend';

import { checkRateLimit } from '@/lib/rate-limit';
import { contactFormSchema } from '@/lib/validations';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
  // Surface missing config at module load instead of letting requests
  // fail mysteriously later with a generic Resend error.
  console.error('RESEND_API_KEY is not set in environment');
}

// TODO: change to waynehu.dev@gmail.com after verifying benhu.dev domain in Resend
const TO_EMAIL = 'diff30140556@gmail.com';
// TODO: change to noreply@benhu.dev after domain verify
const FROM_EMAIL = 'onboarding@resend.dev';

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0];
    if (first) return first.trim();
  }
  return 'unknown';
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const ip = getClientIp(req);

    const limit = checkRateLimit(ip);
    if (!limit.allowed) {
      if (limit.reason === 'minute') {
        return NextResponse.json(
          { error: 'slow down. one message per minute please' },
          { status: 429 },
        );
      }
      return NextResponse.json(
        { error: 'daily limit reached. try again tomorrow' },
        { status: 429 },
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'invalid request body' }, { status: 400 });
    }

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'invalid input' },
        { status: 400 },
      );
    }

    // Honeypot — silently 200 so the bot thinks it succeeded and we don't
    // burn a Resend send on it. Plaintext-only output everywhere downstream
    // means a bot's payload couldn't render as HTML/JS even if it arrived.
    // Read from the RAW body, not from `parsed.data`: `website` isn't part
    // of the zod schema (intentionally — see contact.tsx for the rationale)
    // so safeParse strips it out of validatedData. The raw body is the
    // only place the honeypot value still lives.
    const rawWebsite =
      typeof body === 'object' && body !== null && 'website' in body
        ? (body as { website: unknown }).website
        : undefined;
    if (typeof rawWebsite === 'string' && rawWebsite.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const validatedData = parsed.data;

    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: validatedData.email,
      subject: `New contact from ${validatedData.name}`,
      // Plaintext only — eliminates HTML/XSS surface entirely. The user's
      // input is never rendered in a browser.
      text: [
        `From: ${validatedData.name} <${validatedData.email}>`,
        ``,
        validatedData.message,
      ].join('\n'),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'failed to send. please try again' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Contact route unexpected error:', err);
    return NextResponse.json({ error: 'unexpected error' }, { status: 500 });
  }
}
