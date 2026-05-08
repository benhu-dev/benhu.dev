'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
// `Github` / `Linkedin` were dropped from lucide-react brand icons; using
// the Lucide-styled equivalents from react-icons/lu so the visual weight
// matches the existing Mail icon.
import { LuGithub, LuLinkedin } from 'react-icons/lu';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contact } from '@/data/content';
import { useFadeIn } from '@/hooks/use-fade-in';
import { cn } from '@/lib/utils';
import {
  contactFormSchema,
  type ContactFormInput,
  type ContactFormOutput,
} from '@/lib/validations';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const FADE_BASE = 'transition-all duration-500 ease-out';
const FADE_HIDDEN = 'opacity-0 translate-y-3';
const FADE_SHOWN = 'opacity-100 translate-y-0';

export function Contact() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Honeypot lives outside the zod schema and outside react-hook-form.
  // Keeping it in plain local state means a real user who accidentally
  // fills it (e.g. via a stray autofill) is NOT blocked at validation —
  // the backend silently drops the submission instead, so a human gets
  // the same "looks successful" UX a bot would.
  const [honeypot, setHoneypot] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormOutput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const { ref: leftRef, visible: leftVisible } = useFadeIn<HTMLDivElement>(0);
  const { ref: rightRef, visible: rightVisible } = useFadeIn<HTMLFormElement>(100);

  const onSubmit = async (data: ContactFormOutput) => {
    setSubmitState('submitting');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, website: honeypot }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? '500: something broke on my end. try again?');
      }
      setSubmitState('success');
      reset();
      setHoneypot('');
      setTimeout(() => setSubmitState('idle'), 3000);
    } catch (err) {
      setSubmitState('error');
      setErrorMessage(
        err instanceof Error ? err.message : '500: something broke on my end. try again?',
      );
    }
  };

  const isSent = submitState === 'success';

  return (
    <section id="contact" className="relative w-full px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-text-muted mb-4 font-mono text-sm">{'// contact'}</p>

        <h2
          className="font-mono font-bold tracking-[-0.01em]"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.1 }}
        >
          <span className="text-text-primary">let&apos;s </span>
          <span className="text-syntax-string">build</span>
          <span className="text-text-primary"> something.</span>
        </h2>

        <p className="text-text-secondary mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
          Hiring, contracting, or just want to talk shop? My inbox is open and I read everything.
        </p>

        <div className="mt-10 grid grid-cols-1 items-start gap-6 md:grid-cols-2">
          {/* Left column wrapper — `self-start` keeps the card from stretching
              vertically to match the form's height. */}
          <div
            ref={leftRef}
            className={cn('self-start', FADE_BASE, leftVisible ? FADE_SHOWN : FADE_HIDDEN)}
          >
            {/* Return-block. Hover transitions for links live entirely in CSS
                via Tailwind hover:* — no JS handlers. */}
            <div className="border-border-default bg-bg-secondary/60 rounded-md border p-6 font-mono text-sm leading-relaxed">
              <p className="text-text-primary">
                <span className="text-syntax-keyword">return</span>{' '}
                <span className="text-text-muted">(</span>
              </p>

              <div className="mt-2 ml-4 space-y-2">
                <div>
                  <span className="text-text-primary">email: </span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-syntax-function hover:text-syntax-string inline-flex items-center gap-2 transition-colors duration-200"
                  >
                    <Mail size={16} aria-hidden="true" />
                    <span className="text-base sm:text-lg">&ldquo;{contact.email}&rdquo;</span>
                  </a>
                  <span className="text-text-muted">,</span>
                </div>

                <div>
                  <span className="text-text-primary">socials: </span>
                  <span className="text-text-muted">[</span>
                </div>

                <div className="ml-4 space-y-1">
                  <div>
                    <LuGithub
                      size={16}
                      aria-hidden="true"
                      className="mr-2 inline-block align-text-bottom"
                    />
                    <a
                      href={contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-syntax-function hover:text-syntax-string transition-colors duration-200"
                    >
                      @{contact.githubHandle}
                    </a>
                    <span className="text-text-muted">,</span>
                  </div>
                  <div>
                    <LuLinkedin
                      size={16}
                      aria-hidden="true"
                      className="mr-2 inline-block align-text-bottom"
                    />
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-syntax-function hover:text-syntax-string transition-colors duration-200"
                    >
                      {contact.linkedinHandle ? `/in/${contact.linkedinHandle}` : '/in/...'}
                    </a>
                    <span className="text-text-muted">,</span>
                  </div>
                </div>

                <div>
                  <span className="text-text-muted">]</span>
                </div>
              </div>

              <p className="text-text-primary mt-2">
                <span className="text-text-muted">)</span>;
              </p>
            </div>

            {/* Caption immediately below the return block, with the spec's
                marginTop: 24 — kept inside the left column (issue 3). */}
            <p className="text-text-muted mt-6 font-mono text-xs">
              {`// ${contact.responseTime} · LA (GMT-7)`}
            </p>
          </div>

          <form
            ref={rightRef}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className={cn(
              'border-border-default bg-bg-secondary/60 rounded-md border p-6',
              FADE_BASE,
              rightVisible ? FADE_SHOWN : FADE_HIDDEN,
            )}
          >
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="text-text-secondary font-mono text-xs">
                  <span className="text-syntax-keyword">const</span>{' '}
                  <span className="text-syntax-function">name</span>{' '}
                  <span className="text-text-muted">=</span>
                </label>
                <Input
                  id="name"
                  autoComplete="name"
                  placeholder="// your name..."
                  aria-invalid={errors.name ? 'true' : undefined}
                  {...register('name')}
                  className="mt-1.5"
                />
                {errors.name && (
                  <p className="text-syntax-error mt-1 font-mono text-xs">
                    {'// '}
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="text-text-secondary font-mono text-xs">
                  <span className="text-syntax-keyword">const</span>{' '}
                  <span className="text-syntax-function">email</span>{' '}
                  <span className="text-text-muted">=</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="// you@somewhere.dev..."
                  aria-invalid={errors.email ? 'true' : undefined}
                  {...register('email')}
                  className="mt-1.5"
                />
                {errors.email && (
                  <p className="text-syntax-error mt-1 font-mono text-xs">
                    {'// '}
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="text-text-secondary font-mono text-xs">
                  <span className="text-syntax-keyword">const</span>{' '}
                  <span className="text-syntax-function">message</span>{' '}
                  <span className="text-text-muted">=</span>
                </label>
                <Textarea
                  id="message"
                  rows={6}
                  placeholder="// your message..."
                  aria-invalid={errors.message ? 'true' : undefined}
                  {...register('message')}
                  className="mt-1.5"
                />
                {errors.message && (
                  <p className="text-syntax-error mt-1 font-mono text-xs">
                    {'// '}
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Honeypot. Off-screen positioning is the standard pattern —
                  do not use display:none / visibility:hidden, which more
                  sophisticated bots will skip. The field name "website" is
                  deliberately tempting for autofill bots; humans never see
                  it (aria-hidden + tabIndex=-1 + offscreen). Backed by
                  local state (NOT react-hook-form) so accidental human
                  fills don't trip frontend validation — the backend
                  silently drops filled-honeypot submissions instead. */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              />

              {/* Button uses .btn-primary equivalent (Button variant="primary").
                  Hover/glow live entirely in the variant — no inline overrides
                  needed. The success state is the only inline overlay, since
                  it's a one-off variant not in the base button styles. */}
              <Button
                type="submit"
                size="sm"
                variant="primary"
                disabled={isSubmitting || submitState === 'submitting' || isSent}
                // Tighter horizontal padding overrides size="sm"'s default (px-4 = 16)
                // by 4px on each side. Keep font-size from the size variant.
                style={{ padding: '8px 12px' }}
                className={cn(
                  // fit-content + self-start + inline-flex (safeguard) so the
                  // button hugs its text and sits at the form's left edge.
                  // size="sm" is this project's `.btn-small` analog.
                  'inline-flex w-fit self-start',
                  isSent &&
                    '!text-syntax-string !bg-transparent !shadow-[0_0_16px_-6px_var(--syntax-string)]',
                )}
              >
                {isSent ? "// message sent ✓ I'll reply within 48hrs" : '> submit()'}
              </Button>

              {submitState === 'error' && errorMessage && (
                <p className="text-syntax-error font-mono text-xs">
                  {'// '}
                  {errorMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
