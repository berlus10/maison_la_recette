import type { ReactNode } from 'react';

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** Icônes simples (SVG en ligne, sans dépendance), indexées par le nom du réseau en minuscules. */
export const SOCIAL_ICONS: Record<string, ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.8" fill="currentColor" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.8v.1M12 16v-5.5M12 13c0-1.5 1-2.5 2.3-2.5S16.5 11.5 16.5 13V16" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" {...stroke}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
    </svg>
  ),
};
