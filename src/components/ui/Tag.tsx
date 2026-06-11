import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Mono pill used for tech tags. `strong` is the higher-contrast project variant. */
export function Tag({
  children,
  variant = 'default',
}: {
  children: ReactNode;
  variant?: 'default' | 'strong';
}) {
  return (
    <span
      className={cn(
        'font-mono text-[11.5px] px-[11px] py-[6px] rounded-lg border border-line',
        variant === 'default' ? 'bg-bg text-ink-2' : 'bg-bg-2 text-ink',
      )}
    >
      {children}
    </span>
  );
}
