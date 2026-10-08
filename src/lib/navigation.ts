export type NavLink = { label: string; href: string };

export const MAIN_NAV: NavLink[] = [
  { label: 'Podcasts', href: '/podcast' },
  { label: 'Expériences', href: '/experiences' },
  { label: 'Studio', href: '/studio' },
];

export const HEADER_ACTIONS: { secondary: NavLink; primary: NavLink } = {
  secondary: { label: 'Mon histoire', href: '/a-propos' },
  primary: { label: 'Contact', href: '/contact' },
};

export const FOOTER_ROWS: NavLink[][] = [
  [
    { label: 'Home', href: '/' },
    { label: 'A Propos', href: '/a-propos' },
    { label: 'Contacts', href: '/contact' },
  ],
  MAIN_NAV,
];

export const FOOTER_NAV: NavLink[] = FOOTER_ROWS.flat();

export const LEGAL_NAV: NavLink[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
];
