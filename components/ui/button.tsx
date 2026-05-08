import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const VARIANTS: Record<Variant, string> = {
  primary: [
    'border border-syntax-string bg-syntax-string text-bg-primary font-semibold',
    'hover:bg-transparent hover:text-syntax-string',
    // Reference pattern: inset shadow simulates a 2px border (no layout shift)
    // + a soft outer glow.
    'hover:shadow-[inset_0_0_0_2px_var(--syntax-string),0_0_24px_-8px_var(--syntax-string)]',
  ].join(' '),
  secondary: [
    'border border-border-default bg-transparent text-text-primary',
    'hover:border-syntax-function hover:text-syntax-function',
    // Inset shadow simulates a 2px border without layout shift; outer shadow
    // is a soft blue glow.
    'hover:shadow-[inset_0_0_0_1px_var(--syntax-function),0_0_20px_-8px_var(--syntax-function)]',
  ].join(' '),
  ghost: 'border border-transparent bg-transparent text-text-secondary hover:text-syntax-function',
  danger:
    'border border-syntax-error bg-syntax-error text-bg-primary font-semibold hover:bg-transparent hover:text-syntax-error',
};

const SIZES: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-sm',
  // `md` carries a built-in mobile step-down so hero CTAs scale at narrow
  // viewports. Desktop values restored at `md` (Tailwind = 768px), which is
  // also the nav's hamburger breakpoint — keeping CTA scale tied to the
  // same layout transition.
  md: 'px-4 py-2 text-xs md:px-5 md:py-2.5 md:text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, type, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded font-mono transition-all duration-200',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      // Same browser-extension-injected `fdprocessedid` issue as Input —
      // form-fill assistants stamp this attribute on submit buttons too.
      suppressHydrationWarning
      {...rest}
    />
  );
});
