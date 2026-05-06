'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface TypewriterProps {
  text: string;
  delay?: number;
  minSpeed?: number;
  maxSpeed?: number;
  className?: string;
  cursorClassName?: string;
}

export function Typewriter({
  text,
  delay = 800,
  minSpeed = 55,
  maxSpeed = 95,
  className,
  cursorClassName,
}: TypewriterProps) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? text : '');

  useEffect(() => {
    if (reduced) {
      setShown(text);
      return;
    }
    setShown('');
    let i = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      i += 1;
      setShown(text.slice(0, i));
      if (i < text.length) {
        const next = minSpeed + Math.random() * (maxSpeed - minSpeed);
        timeout = setTimeout(tick, next);
      }
    };

    const start = setTimeout(tick, delay);
    return () => {
      clearTimeout(start);
      if (timeout) clearTimeout(timeout);
    };
  }, [text, delay, minSpeed, maxSpeed, reduced]);

  return (
    <span className={className}>
      {shown}
      <span
        aria-hidden="true"
        className={cn(
          'bg-syntax-function blink-cursor ml-[2px] inline-block align-[-0.12em]',
          cursorClassName,
        )}
        style={{ width: '0.55em', height: '1em' }}
      />
    </span>
  );
}
