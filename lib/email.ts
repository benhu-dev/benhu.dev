import { Resend } from 'resend';

import { contact, personal } from '@/data/content';

import type { ContactFormInput } from './validations';

// Composed from `personal` so a future rename only happens in one place.
// Currently unused by the live API route (see app/api/contact/route.ts,
// which uses Resend's onboarding sender until the benhu.dev domain is
// verified). When that flips, the route can switch to sendContactEmail
// and pick this address up automatically.
const FROM_ADDRESS = `${personal.name} Portfolio <noreply@${personal.domain}>`;

let resendClient: Resend | null = null;

function getResend(): Resend {
  if (resendClient) return resendClient;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }
  resendClient = new Resend(apiKey);
  return resendClient;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderEmailHtml(payload: ContactFormInput): string {
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br />');
  const ts = new Date().toISOString();
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #111;">
      <h2 style="margin: 0 0 16px;">New message from ${safeName}</h2>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
      <p style="margin: 0 0 8px;"><strong>Sent:</strong> ${ts}</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
      <p style="white-space: pre-wrap; line-height: 1.6;">${safeMessage}</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 16px 0;" />
      <p style="color: #888; font-size: 12px;">Sent via ${personal.domain} contact form.</p>
    </div>
  `;
}

export async function sendContactEmail(payload: ContactFormInput): Promise<void> {
  const resend = getResend();
  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: [contact.email],
    replyTo: payload.email,
    subject: `New message from ${payload.name} via ${personal.domain}`,
    html: renderEmailHtml(payload),
  });
  if (error) {
    throw new Error(`Resend error: ${error.message ?? 'unknown'}`);
  }
}
