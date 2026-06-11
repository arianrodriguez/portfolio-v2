import type { HTMLAttributes, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/cn';

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Start visible (no observer) — used for above-the-fold hero content. */
  immediate?: boolean;
}

/**
 * Fades + lifts its children into place the first time they scroll into view.
 * Pass `immediate` to render visible right away.
 */
export function Reveal({ children, immediate = false, className, ...rest }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const shown = immediate || inView;

  return (
    <div
      ref={immediate ? undefined : ref}
      className={cn('reveal', shown && 'is-in', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
