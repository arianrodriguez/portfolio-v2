import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Mono uppercase kicker with a rotated accent dot. */
export function Eyebrow({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <span className={cn('eyebrow', tone === 'dark' && 'eyebrow--dark', className)}>{children}</span>
  );
}
