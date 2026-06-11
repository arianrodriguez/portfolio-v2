import { IconChevronDown } from '@/components/ui/icons';

/**
 * Minimal scroll cue for the bottom of a full-screen hero: a softly bouncing
 * down-chevron over a thin track with an accent beam that travels downward on a
 * loop. Clicking it smooth-scrolls to the target section.
 */
export function ScrollIndicator({ href = '#servicios' }: { href?: string }) {
  return (
    <a href={href} aria-label="Desplázate hacia abajo" className="scroll-indicator">
      <IconChevronDown className="scroll-indicator__arrow" />
      <span className="scroll-indicator__track">
        <span className="scroll-indicator__beam" />
      </span>
    </a>
  );
}
