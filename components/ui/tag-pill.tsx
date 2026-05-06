import { cn } from '@/lib/utils';

type TagColor = 'function' | 'keyword' | 'number' | 'string' | 'muted';

interface TagPillProps {
  color?: TagColor;
  children: React.ReactNode;
  className?: string;
}

const COLOR_BORDER: Record<TagColor, string> = {
  function: 'border-syntax-function text-syntax-function',
  keyword: 'border-syntax-keyword text-syntax-keyword',
  number: 'border-syntax-number text-syntax-number',
  string: 'border-syntax-string text-syntax-string',
  muted: 'border-border-default text-text-secondary',
};

export function TagPill({ color = 'function', children, className }: TagPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border bg-white/[0.02] px-3 py-[5px] font-mono text-[13px] leading-[1.4] whitespace-nowrap',
        COLOR_BORDER[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
