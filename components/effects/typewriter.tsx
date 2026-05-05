'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
}

export function Typewriter({
  text,
  speed = 55,
  delay = 250,
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
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length && interval) {
          clearInterval(interval);
        }
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [text, speed, delay, reduced]);

  return (
    <span className={className}>
      {shown}
      <span className={cn('cursor-blink ml-0.5 inline-block', cursorClassName)}>▍</span>
    </span>
  );
}
