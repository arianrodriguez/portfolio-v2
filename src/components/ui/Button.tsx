import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'ghost';

const base =
  'inline-flex items-center gap-2.5 font-semibold text-[15.5px] px-6 py-3.5 rounded-[13px] ' +
  'border border-transparent cursor-pointer transition-[transform,background,box-shadow] ' +
  'duration-200 ease-smooth hover:-translate-y-0.5 [&_svg]:w-4 [&_svg]:h-4';

const variants: Record<Variant, string> = {
  primary: 'bg-white text-dark hover:shadow-[0_12px_30px_rgba(0,0,0,.3)]',
  ghost: 'bg-transparent text-white border-dark-line hover:bg-white/[.06]',
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  /** Renders an anchor when provided, otherwise a `<button>`. */
  href?: string;
  className?: string;
}

/** Hero / CTA button. Polymorphic: anchor when `href` is set, button otherwise. */
export function Button({ children, variant = 'primary', href, className }: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
