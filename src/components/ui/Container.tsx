import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Centered content column with the design's max width and side gutters. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[1180px] px-8 max-[560px]:px-[22px]', className)}>
      {children}
    </div>
  );
}
