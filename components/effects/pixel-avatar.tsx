import { cn } from '@/lib/utils';

interface PixelAvatarProps {
  className?: string;
}

const PIXEL_GRID = [
  '....NNNNNNNN....',
  '...NHHHHHHHHN...',
  '..NHHHHHHHHHHN..',
  '..NHFFFFFFFFHN..',
  '..NHFEFFFFEFHN..',
  '..NHFFFFFFFFHN..',
  '..NHFFMMMMFFHN..',
  '..NHFFFFFFFFHN..',
  '...NHHHHHHHHN...',
  '....NSSSSSSN....',
  '...SSSSSSSSSS...',
  '..SSCCCCCCCCSS..',
  '..SCCCCCCCCCSS..',
  '..SCCCCCCCCCCS..',
  '..SCCCCCCCCCCS..',
  '..SSSSSSSSSSSS..',
];

const PALETTE: Record<string, string> = {
  '.': 'transparent',
  N: '#1a1b26',
  H: '#3b2f2a',
  F: '#d3a37a',
  E: '#1a1b26',
  M: '#7a3b3b',
  S: '#9ece6a',
  C: '#7aa2f7',
};

export function PixelAvatar({ className }: PixelAvatarProps) {
  return (
    <div
      className={cn(
        'border-border-default bg-bg-primary aspect-square w-full overflow-hidden border',
        className,
      )}
      aria-label="Pixel-art avatar of Ben Hu"
      role="img"
    >
      <div className="grid h-full w-full" style={{ gridTemplateColumns: 'repeat(16, 1fr)' }}>
        {PIXEL_GRID.flatMap((row, rIdx) =>
          row
            .split('')
            .map((cell, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                style={{ backgroundColor: PALETTE[cell] ?? 'transparent' }}
              />
            )),
        )}
      </div>
    </div>
  );
}
