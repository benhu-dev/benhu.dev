'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contact } from '@/lib/data';
import {
  contactFormSchema,
  type ContactFormInput,
  type ContactFormOutput,
} from '@/lib/validations';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const reduced = useReducedMotion();
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormOutput>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', message: '', honeypot: '' },
  });

  const onSubmit = async (data: ContactFormOutput) => {
    setSubmitState('submitting');
    setErrorMessage(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }
      setSubmitState('success');
      reset();
      setTimeout(() => setSubmitState('idle'), 3000);
    } catch (err) {
      setSubmitState('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <section id="contact" className="relative w-full px-4 py-24 sm:px-6 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-text-muted mb-4 font-mono text-sm">{'// contact'}</p>
        <h2 className="font-mono text-3xl font-bold sm:text-4xl md:text-5xl">
          <span className="text-text-primary">let&apos;s build </span>
          <span className="text-syntax-string">something.</span>
        </h2>
        <p className="text-text-secondary mt-4 max-w-2xl text-base leading-relaxed sm:text-lg">
          Hiring, contracting, or just want to talk shop? My inbox is open and I read everything.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="border-border-default bg-bg-secondary/60 rounded-md border p-6 font-mono text-sm leading-relaxed"
          >
            <p className="text-text-primary">
              <span className="text-syntax-keyword">return</span>{' '}
              <span className="text-text-muted">(</span>
            </p>
            <div className="mt-2 ml-4 space-y-2">
              <div>
                <span className="text-text-primary">email: </span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-syntax-function inline-flex items-center gap-2 hover:underline"
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
                  <span aria-hidden="true">🐙 </span>
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-syntax-function hover:underline"
                  >
                    @benhu-dev
                  </a>
                  <span className="text-text-muted">,</span>
                </div>
                <div>
                  <span aria-hidden="true">💼 </span>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-syntax-function hover:underline"
                  >
                    /in/your-id
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
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: reduced ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="border-border-default bg-bg-secondary/60 rounded-md border p-6"
            noValidate
          >
            <div className="space-y-5">
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

              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                {...register('honeypot')}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting || submitState === 'submitting'}
                variant={submitState === 'success' ? 'primary' : 'primary'}
              >
                {submitState === 'success' ? '✓ message_sent' : '> submit()'}
              </Button>

              {submitState === 'error' && errorMessage && (
                <p className="text-syntax-error font-mono text-xs">
                  {'// '}
                  {errorMessage}
                </p>
              )}
            </div>
          </motion.form>
        </div>

        <p className="text-text-muted mt-6 font-mono text-xs">
          {`// ${contact.responseTime} · Taipei (UTC+8)`}
        </p>
      </div>
    </section>
  );
}
