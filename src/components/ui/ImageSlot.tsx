import { cn } from '@/lib/cn';
import { IconImage } from '@/components/ui/icons';

interface ImageSlotProps {
  /** Final image URL. When absent, a styled placeholder is shown. */
  src?: string;
  alt?: string;
  placeholder?: string;
  /** Corner radius in px. */
  radius?: number;
  /** CSS aspect-ratio, e.g. "4 / 3". */
  aspect?: string;
  /** 'light' for off-white sections, 'dark' for the hero panel. */
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Drop-in image area. Mirrors the prototype's `<image-slot>` look: a framed
 * region that shows the picture once supplied, or an elegant dashed
 * placeholder until then. Replace by passing `src` (no drag-drop needed).
 */
export function ImageSlot({
  src,
  alt = '',
  placeholder = 'Imagen',
  radius = 12,
  aspect,
  tone = 'light',
  className,
}: ImageSlotProps) {
  const dark = tone === 'dark';

  return (
    <div
      className={cn(
        'relative overflow-hidden block w-full',
        dark ? 'bg-transparent' : 'bg-bg-2',
        className,
      )}
      style={{ borderRadius: radius, aspectRatio: aspect }}
    >
      {src ? (
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center',
            dark ? 'text-white/50' : 'text-ink-3',
          )}
        >
          <IconImage className="h-7 w-7 opacity-40" />
          <span className="max-w-[90%] text-[13px] font-medium">{placeholder}</span>
          <span
            className={cn(
              'pointer-events-none absolute inset-[6px] border border-dashed',
              dark ? 'border-white/20' : 'border-[rgba(14,14,18,.18)]',
            )}
            style={{ borderRadius: Math.max(radius - 4, 0) }}
          />
        </div>
      )}
    </div>
  );
}
