import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { content } from '@/lib/content';
import { FOOTER_NAV, LEGAL_NAV } from '@/lib/navigation';
import { Logo } from './Logo';

export async function Footer() {
  const site = await content.getSiteSettings();
  return (
    <footer className="bg-podcast-900 text-cream mt-24 rounded-t-[2rem]">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-[auto_1fr_auto] md:items-start">
          <Link href="/" aria-label="Maison La Recette, accueil">
            <Logo inverted />
          </Link>
          <nav aria-label="Pied de page">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 font-bold">
              {FOOTER_NAV.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {site.socialLinks.length > 0 ? (
            <ul className="flex gap-3">
              {site.socialLinks.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="bg-cream text-podcast-900 hover:bg-podcast-300 grid h-12 w-12 place-items-center rounded-full font-extrabold"
                  >
                    {s.label.charAt(0)}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="border-cream/20 text-cream/80 mt-10 flex flex-col gap-3 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>{site.tagline}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_NAV.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.contactEmail}`}
                className="underline-offset-4 hover:underline"
              >
                {site.contactEmail}
              </a>
            </li>
          </ul>
          <p>© {new Date().getFullYear()} Maison La Recette</p>
        </div>
      </Container>
    </footer>
  );
}
