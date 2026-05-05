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
  primary:
    'bg-syntax-string text-bg-primary hover:bg-syntax-string/90 border border-transparent font-semibold',
  secondary:
    'bg-transparent border border-border-default text-text-primary hover:border-syntax-function hover:text-syntax-function',
  ghost: 'bg-transparent border border-transparent text-text-secondary hover:text-syntax-function',
  danger: 'bg-syntax-error text-bg-primary hover:bg-syntax-error/90 border border-transparent',
};

const SIZES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-base',
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
        'inline-flex items-center justify-center gap-2 rounded-sm font-mono transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...rest}
    />
  );
});
