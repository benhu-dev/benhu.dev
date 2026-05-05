import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = 'text', ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'bg-bg-primary border-border-default text-text-primary placeholder:text-text-muted focus:border-syntax-function focus:ring-syntax-function/30 w-full rounded-sm border px-3 py-2 font-mono text-sm transition-colors focus:ring-2 focus:outline-none',
        className,
      )}
      {...rest}
    />
  );
});
