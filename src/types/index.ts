/** Domain contracts shared across the portfolio. */

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  /** Display index, e.g. "01". */
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  /** Kicker, e.g. "P.01 — Genética + IA". */
  number: string;
  /** Floating badge over the media, e.g. "Visión por computadora". */
  badge: string;
  title: string;
  role: string;
  description: string;
  tags: string[];
  stats: ProjectStat[];
  /** Caption shown while the media slot is empty. */
  imagePlaceholder: string;
  /** Optional final image; falls back to the placeholder when absent. */
  imageSrc?: string;
  /** Flip the media to the right column (zig-zag layout). */
  reversed?: boolean;
  caseHref: string;
}
