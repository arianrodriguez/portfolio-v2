import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { IconArrowUpRight } from '@/components/ui/icons';
import { useScrolled } from '@/hooks/useScrolled';
import { navLinks } from '@/data/navigation';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';

/** Fixed top nav: transparent over the dark hero, frosted-light once scrolled. */
export function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-[100] border-b transition-[background,border-color,box-shadow] duration-[400ms] ease-smooth',
        scrolled
          ? 'border-line bg-[rgba(251,251,249,.82)] shadow-[0_1px_0_rgba(0,0,0,.02)] backdrop-blur-[16px]'
          : 'border-transparent',
      )}
    >
      <Container className="relative flex h-[72px] items-center justify-between">
        {/* Brand */}
        <a
          href="#top"
          className={cn(
            'flex items-center gap-3 font-display text-[18px] font-semibold tracking-[-.01em]',
            scrolled ? 'text-ink' : 'text-white',
          )}
        >
          <span className="brand-mark" data-scrolled={scrolled} />
          {site.brand}
        </a>

        {/* Desktop links */}
        <div className="flex items-center gap-9 max-[980px]:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'text-[15px] font-medium transition-colors',
                scrolled ? 'text-ink-2 hover:text-ink' : 'text-white/70 hover:text-white',
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contacto"
          className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-[11px] bg-accent px-[18px] py-[11px] text-[14.5px] font-semibold text-white shadow-[0_6px_20px_var(--color-accent-soft)] transition-[transform,box-shadow] duration-200 ease-smooth hover:-translate-y-0.5 hover:shadow-[0_10px_28px_var(--color-accent-soft)] max-[980px]:hidden"
        >
          Trabajemos juntos
          <IconArrowUpRight className="h-[15px] w-[15px]" />
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'hidden h-[42px] w-[42px] items-center justify-center max-[980px]:flex',
            scrolled ? 'text-ink' : 'text-white',
          )}
        >
          <span className="menu-bars" />
        </button>

        {/* Mobile menu */}
        {open && (
          <div className="absolute inset-x-0 top-[72px] hidden flex-col border-b border-line bg-bg py-2 max-[980px]:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-8 py-3.5 text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </Container>
    </nav>
  );
}
