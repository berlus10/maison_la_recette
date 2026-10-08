import Link from 'next/link';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { HEADER_ACTIONS, MAIN_NAV } from '@/lib/navigation';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="bg-cream relative z-40">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-3 sm:gap-6">
        <Link
          href="/"
          aria-label="Maison La Recette, accueil"
          className="shrink-0"
        >
          <Logo />
        </Link>
        <nav aria-label="Navigation principale" className="hidden xl:block">
          <ul className="flex items-center gap-5 font-bold 2xl:gap-8">
            {MAIN_NAV.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="focus-visible:outline-studio-500 rounded-md py-2 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="hidden items-center gap-2 xl:flex 2xl:gap-3">
          <ButtonLink href={HEADER_ACTIONS.secondary.href} variant="secondary">
            {HEADER_ACTIONS.secondary.label}
          </ButtonLink>
          <ButtonLink href={HEADER_ACTIONS.primary.href}>
            {HEADER_ACTIONS.primary.label}
          </ButtonLink>
        </div>
        <MobileMenu
          links={MAIN_NAV}
          secondary={HEADER_ACTIONS.secondary}
          primary={HEADER_ACTIONS.primary}
        />
      </Container>
    </header>
  );
}
