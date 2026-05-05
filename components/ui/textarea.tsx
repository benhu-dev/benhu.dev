import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, rows = 5, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'bg-bg-primary border-border-default text-text-primary placeholder:text-text-muted focus:border-syntax-function focus:ring-syntax-function/30 w-full resize-y rounded-sm border px-3 py-2 font-mono text-sm transition-colors focus:ring-2 focus:outline-none',
        className,
      )}
      {...rest}
    />
  );
});
