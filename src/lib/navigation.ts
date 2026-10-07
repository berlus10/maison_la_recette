export type NavLink = { label: string; href: string };

export const MAIN_NAV: NavLink[] = [
  { label: 'Podcasts', href: '/podcast' },
  { label: 'Expériences', href: '/experiences' },
  { label: 'Studio', href: '/studio' },
];

export const HEADER_ACTIONS: { secondary: NavLink; primary: NavLink } = {
  secondary: { label: 'À propos', href: '/a-propos' },
  primary: { label: 'Demander un devis', href: '/devis' },
};

export const FOOTER_NAV: NavLink[] = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
  ...MAIN_NAV,
];

export const LEGAL_NAV: NavLink[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
];