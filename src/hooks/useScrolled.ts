import { useEffect, useState } from 'react';

/**
 * True once the window has scrolled past `threshold` pixels.
 * Drives the navbar's transition from transparent (over the dark hero)
 * to a frosted light bar.
 */
export function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
