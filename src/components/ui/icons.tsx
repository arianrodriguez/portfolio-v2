import type { SVGProps } from 'react';

/**
 * Inline SVG icon set. Stroke icons inherit `currentColor`; size them with a
 * `className` (e.g. `className="w-4 h-4"`). Keeps the markup dependency-free.
 */
type IconProps = SVGProps<SVGSVGElement>;

const strokeBase: IconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
};

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg {...strokeBase} strokeWidth={2.2} {...props}>
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...strokeBase} strokeWidth={2.2} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...strokeBase} strokeWidth={1.8} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...strokeBase} strokeWidth={1.8} {...props}>
      <path d="M5 4h4l2 5-3 2a14 14 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...strokeBase} strokeWidth={1.8} {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...strokeBase} strokeWidth={2} {...props}>
      <path d="m5 12 5 5 9-11" />
    </svg>
  );
}

export function IconImage(props: IconProps) {
  return (
    <svg {...strokeBase} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

export function IconLinkedIn(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM0 8h5v16H0V8Zm7.5 0H12v2.2h.07c.63-1.2 2.17-2.46 4.46-2.46C21.4 7.74 24 10 24 14.6V24h-5v-8.3c0-2-.04-4.55-2.77-4.55-2.78 0-3.2 2.16-3.2 4.4V24h-5V8Z" />
    </svg>
  );
}

export function IconGitHub(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}
