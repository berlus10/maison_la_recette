import type { Metadata } from 'next';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { TestimonialGrid } from '@/components/sections/TestimonialGrid';
import { content } from '@/lib/content';
import { ExperienceShowcase } from './ExperienceShowcase';

export const metadata: Metadata = {
  title: 'Événements et expériences',
  description:
    'Des événements autour de l’alimentation durable, imaginés pour les équipes et les particuliers.',
};

export default async function ExperiencesPage() {
  const [experiences, testimonials, site] = await Promise.all([
    content.getExperiences(),
    content.getTestimonials(),
    content.getSiteSettings(),
  ]);
  return (
    <>
      <section className="pt-8 pb-8 sm:pt-12 sm:pb-10 lg:pt-16">
        <Container className="grid max-w-[1592px] gap-8 lg:grid-cols-[minmax(0,904fr)_minmax(0,525fr)] lg:items-end lg:gap-[clamp(2rem,5.73vw,6.1875rem)]">
          <div className="flex min-w-0 flex-col items-start lg:justify-between">
            <div>
              <h1 className="font-title text-ink text-5xl leading-[1.12] font-medium tracking-tight sm:text-6xl lg:text-[5rem] lg:leading-[1.3]">
                Événements
              </h1>
              <p className="text-ink mt-3 max-w-[904px] text-base leading-[1.5] sm:text-lg lg:text-xl lg:leading-[1.3]">
                Des événements autour de l’alimentation durable. Maison La
                Recette imagine des expériences sur mesure pour sensibiliser,
                transmettre et créer du lien autour de l’alimentation durable.
                Entreprises, professionnels ou particuliers, découvrez des
                formats adaptés à vos envies : teambuildings, ateliers,
                animations, rencontres ou événements privés. Un moment pour
                apprendre, partager et agir, tout en s’amusant.
              </p>
              <ButtonLink
                href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(
                  'Demande de devis pour un événement',
                )}`}
                className="mt-7 min-h-[53px] px-5 text-lg sm:text-xl"
              >
                Faire mon devis <span aria-hidden="true"> →</span>
              </ButtonLink>
            </div>

            <div className="mt-12 w-full lg:mt-14">
              <p className="font-title text-ink mb-4 text-base sm:text-lg">
                Ils m’ont déjà fait confiance :
              </p>
              <ul
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5"
                aria-label="Partenaires et clients"
              >
                {[
                  {
                    name: 'Carrefour',
                    src: '/experiences/partners/carrefour.svg',
                  },
                  {
                    name: 'Back Market',
                    src: '/experiences/partners/back-market.svg',
                  },
                  {
                    name: 'Biocoop',
                    src: '/experiences/partners/biocoop.svg',
                  },
                  {
                    name: 'Sodexo',
                    src: '/experiences/partners/sodexo.svg',
                  },
                  {
                    name: 'Elior',
                    src: '/experiences/partners/elior.svg',
                  },
                ].map((partner) => (
                  <li
                    key={partner.name}
                    className="overflow-hidden rounded-[1.1rem]"
                  >
                    <Image
                      src={partner.src}
                      alt={`Logo de ${partner.name}`}
                      width={172}
                      height={110}
                      unoptimized
                      className="block h-auto w-full"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <figure className="bg-event-100 relative isolate mx-auto aspect-[4/5] w-full max-w-[33rem] overflow-hidden rounded-[1.25rem] lg:mx-0 lg:aspect-[525/673] lg:max-h-[42rem]">
            <Image
              src="/experiences/hero-atelier.jpg"
              alt="Préparation de légumes pendant un atelier culinaire"
              fill
              preload
              unoptimized
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="from-ink/65 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
            />
            <figcaption className="absolute bottom-[5%] left-[5%] aspect-square w-[7.5rem] shadow-lg sm:w-[9.25rem]">
              <Image
                src="/experiences/logo-evenements.svg"
                alt="Maison La Recette - Événements"
                width={148}
                height={148}
                className="h-full w-full object-contain"
              />
            </figcaption>
          </figure>
        </Container>
        <br />
        <br />
      </section>

      <ExperienceShowcase
        experiences={experiences}
        contactEmail={site.contactEmail}
      />

      <section className="py-16 sm:py-18">
        <Container className="max-w-[1528px]">
          <div className="mx-auto mb-10 max-w-[850px] text-center">
            <h2 className="font-title text-ink mt-3 text-4xl leading-tight font-semibold sm:text-5xl">
              Vous en parlez mieux
            </h2>
            <p className="text-ink mt-4 text-lg leading-relaxed">
              Découvrez les retours de celles et ceux qui ont partagé une
              expérience avec Maison La Recette. Des rencontres, des découvertes
              et surtout de beaux moments autour de l’alimentation durable.
            </p>
          </div>
          <TestimonialGrid testimonials={testimonials} tone="event" />
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="max-w-[1528px] 2xl:px-0">
          <div className="grid items-center gap-8 rounded-[1.25rem] bg-[#FFDCD6] p-5 sm:p-8 lg:grid-cols-[minmax(0,503fr)_minmax(0,904fr)] lg:gap-[clamp(2rem,6.5vw,100px)] lg:p-10">
            <div className="relative aspect-square w-full overflow-hidden rounded-[1.25rem]">
              <Image
                src="/experiences/bar.jpg"
                alt="Rencontre et découverte autour de l’alimentation dans un bar"
                fill
                sizes="(min-width: 1024px) 33vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-start gap-5">
              <h2 className="font-title text-ink text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-[clamp(3.5rem,4.5vw,5rem)]">
                En apprendre un peu +
              </h2>
              <p className="text-ink text-base leading-relaxed sm:text-lg lg:text-xl lg:leading-[1.3]">
                Maison La Recette explore l’alimentation de demain à travers des
                rencontres, des expériences et des histoires. Podcast,
                événements, ateliers et studio : découvrez celles et ceux qui
                font évoluer notre façon de produire, cuisiner et consommer.
                Ici, on parle d’alimentation durable, mais surtout, on la vit.
              </p>
              <ButtonLink
                href="/"
                className="min-h-[53px] px-5 py-[10px] text-lg leading-tight sm:text-xl lg:text-[25px] lg:leading-[33px]"
              >
                En découvrir plus <span aria-hidden="true">→</span>
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
