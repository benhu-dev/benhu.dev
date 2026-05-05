import { cn } from '@/lib/utils';

interface FileTabProps {
  filename?: string;
  className?: string;
}

export function FileTab({ filename = 'ben-hu.tsx', className }: FileTabProps) {
  return (
    <div
      className={cn(
        'border-border-default bg-bg-secondary text-text-secondary pointer-events-auto inline-flex items-center gap-2 rounded-t-md border border-b-0 px-3 py-1.5 font-mono text-xs',
        className,
      )}
      aria-hidden="true"
    >
      <span className="text-syntax-function">⌘</span>
      <span>{filename}</span>
      <span className="text-text-muted">×</span>
    </div>
  );
}
