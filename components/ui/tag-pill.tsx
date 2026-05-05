import { cn } from '@/lib/utils';

type TagColor = 'function' | 'keyword' | 'number' | 'string' | 'muted';

interface TagPillProps {
  color?: TagColor;
  children: React.ReactNode;
  className?: string;
}

const COLORS: Record<TagColor, string> = {
  function: 'border-syntax-function text-syntax-function bg-syntax-function/10',
  keyword: 'border-syntax-keyword text-syntax-keyword bg-syntax-keyword/10',
  number: 'border-syntax-number text-syntax-number bg-syntax-number/10',
  string: 'border-syntax-string text-syntax-string bg-syntax-string/10',
  muted: 'border-border-default text-text-secondary bg-bg-secondary',
};

export function TagPill({ color = 'function', children, className }: TagPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs',
        COLORS[color],
        className,
      )}
    >
      {children}
    </span>
  );
}
