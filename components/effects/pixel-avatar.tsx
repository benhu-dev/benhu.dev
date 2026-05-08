import { personal } from '@/data/content';
import { cn } from '@/lib/utils';

interface PixelAvatarProps {
  className?: string;
}

export function PixelAvatar({ className }: PixelAvatarProps) {
  // Rendered as a <div> with background-image rather than <Image> because
  // CSS background sizing/positioning are independent — `background-size:
  // contain` scales without touching alignment, and `background-position:
  // bottom center` then anchors the image to the floor. With <Image>,
  // `object-contain` and `object-bottom` interact in a way that leaves the
  // character floating mid-frame when the source has transparent padding.
  return (
    <div
      role="img"
      aria-label={`Pixel-art avatar of ${personal.name}`}
      className={cn('h-[92%] w-[92%]', className)}
      style={{
        backgroundImage: 'url(/images/avatar.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
        imageRendering: 'pixelated',
      }}
    />
  );
}
