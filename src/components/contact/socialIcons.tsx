import type { ReactNode } from 'react';

/** Logos des réseaux en couleurs d'origine (SVG en ligne), indexés par nom en minuscules. */
export const SOCIAL_ICONS: Record<string, ReactNode> = {
  instagram: (
    <svg viewBox="0 0 24 24" className="size-10" aria-hidden="true">
      <defs>
        <linearGradient id="instagram-gradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#FEDA75" />
          <stop offset="0.3" stopColor="#FA7E1E" />
          <stop offset="0.55" stopColor="#D62976" />
          <stop offset="0.8" stopColor="#962FBF" />
          <stop offset="1" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="22"
        height="22"
        rx="6"
        fill="url(#instagram-gradient)"
      />
      <rect
        x="5.2"
        y="5.2"
        width="13.6"
        height="13.6"
        rx="4"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
      />
      <circle
        cx="12"
        cy="12"
        r="3.2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
      />
      <circle cx="16.4" cy="7.6" r="1" fill="#fff" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="size-10" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="4" fill="#0A66C2" />
      <circle cx="7.6" cy="7.6" r="1.4" fill="#fff" />
      <rect x="6.4" y="10" width="2.4" height="7.6" fill="#fff" />
      <path
        d="M11 10h2.3v1c.5-.8 1.4-1.2 2.4-1.2 2 0 2.8 1.3 2.8 3.3v4.5h-2.4v-4c0-1-.3-1.7-1.3-1.7-1 0-1.4.7-1.4 1.8v3.9H11z"
        fill="#fff"
      />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="size-10" aria-hidden="true">
      <rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#FF0000" />
      <path d="M10 9.2 15.2 12 10 14.8z" fill="#fff" />
    </svg>
  ),
};
