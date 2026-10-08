import Link from 'next/link';
import { content } from '@/lib/content';
import { FOOTER_ROWS } from '@/lib/navigation';
import { Logo } from './Logo';

const circle =
  'grid h-12 w-12 place-items-center rounded-full bg-mark text-sm font-medium text-cream xl:h-[68px] xl:w-[68px]';

export async function Footer() {
  const site = await content.getSiteSettings();
  const socials = site.socialLinks.slice(0, 3);

  return (
    <footer className="bg-footer mt-24 rounded-t-[20px] xl:mt-[214px]">
      <div className="mx-auto flex w-full max-w-[1728px] flex-col gap-8 px-5 pt-10 pb-12 sm:px-8 md:flex-row md:items-center md:justify-between xl:px-[100px] xl:pt-[50px] xl:pb-[100px]">
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/"
            aria-label="Maison La Recette, accueil"
            className="shrink-0"
          >
            <Logo />
          </Link>
          <span aria-hidden className="h-[75px] w-0.5 shrink-0 bg-black" />
          <nav aria-label="Pied de page" className="flex flex-col gap-2.5">
            {FOOTER_ROWS.map((row) => (
              <ul
                key={row[0].href}
                className="font-text flex flex-wrap items-center gap-x-6 gap-y-1 text-lg leading-[33px] font-medium text-black lg:gap-x-[50px] xl:text-[25px]"
              >
                {row.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        <ul className="flex items-center gap-5">
          {socials.length > 0
            ? socials.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={circle}
                  >
                    {s.label.charAt(0)}
                  </a>
                </li>
              ))
            : [0, 1, 2].map((i) => (
                <li key={i}>
                  <span aria-hidden className={circle} />
                </li>
              ))}
        </ul>
      </div>
    </footer>
  );
}
