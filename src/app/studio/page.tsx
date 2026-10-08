import Image from 'next/image';
import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { ExpertStrip } from '@/components/sections/ExpertStrip';
import { TestimonialGrid } from '@/components/sections/TestimonialGrid';
import { Container } from '@/components/ui/Container';
import { UniverseCard } from '@/components/ui/UniverseCard';
import { getSiteSettings } from '@/lib/content/site-settings';
import { getTestimonials } from '@/lib/content/testimonials';

export const metadata: Metadata = {
  title: 'Studio | Maison La Recette',
  description:
    'Un studio pour donner une voix aux personnes et aux initiatives qui font évoluer notre alimentation.',
};

const projects = [
  {
    title: 'Des histoires à écouter',
    text: 'Des rencontres pour faire évoluer notre alimentation.',
    layout: 'split' as const,
    images: [
      {
        src: '/studio/projects/DSC_2935.jpg',
        alt: 'Un repas préparé avec soin',
      },
      {
        src: '/studio/projects/podcast1.png',
        alt: 'Une personne prépare des légumes',
      },
      {
        src: '/studio/projects/DSC_2935.jpg',
        alt: 'Un repas partagé',
      },
    ],
  },
  {
    title: 'La Recette, le podcast',
    text: 'Un podcast qui donne la parole aux producteurs, chefs, artisans, entrepreneurs et acteurs engagés.',
    layout: 'wide' as const,
    images: [
      {
        src: '/studio/projects/podcast1.png',
        alt: 'Une personne prépare des légumes pour le podcast',
      },
      {
        src: '/studio/projects/DSC_2935.jpg',
        alt: 'Un repas préparé autour du podcast',
      },
      {
        src: '/studio/projects/podcast1.png',
        alt: 'Un atelier de cuisine',
      },
    ],
  },
  {
    title: 'Des voix et des idées',
    text: 'Des formats pour découvrir des parcours, des savoir-faire et des initiatives inspirantes.',
    layout: 'wide' as const,
    images: [
      {
        src: '/studio/projects/DSC_2935.jpg',
        alt: 'Un repas préparé avec soin',
      },
      {
        src: '/studio/projects/podcast1.png',
        alt: 'Un atelier de cuisine',
      },
      {
        src: '/studio/projects/DSC_2935.jpg',
        alt: 'Un moment de partage autour de la cuisine',
      },
    ],
  },
  {
    title: 'L’alimentation de demain',
    text: 'Des histoires à écouter et des engagements à faire entendre.',
    layout: 'split' as const,
    images: [
      {
        src: '/studio/projects/podcast1.png',
        alt: 'Des légumes frais préparés en cuisine',
      },
      {
        src: '/studio/projects/DSC_2935.jpg',
        alt: 'Une équipe en cuisine',
      },
      {
        src: '/studio/projects/podcast1.png',
        alt: 'Un plat cuisiné',
      },
    ],
  },
];

function StudioSectionHeading({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) {
  return (
    <div className="mx-auto max-w-[904px] text-center">
      <h2 className="font-title text-4xl leading-tight font-medium text-black sm:text-5xl lg:text-[80px] lg:leading-[1.3]">
        {title}
      </h2>
      <p className="mt-4 text-base leading-relaxed text-[#2B2119] sm:text-lg lg:text-[20px] lg:leading-[26px]">
        {intro}
      </p>
    </div>
  );
}

export default async function StudioPage() {
  const [testimonials, site] = await Promise.all([
    getTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <>
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto grid w-full max-w-[1630px] items-end gap-10 px-6 sm:px-10 lg:grid-cols-[minmax(0,904fr)_minmax(0,525fr)] lg:gap-[clamp(2rem,5.73vw,6.1875rem)] lg:px-[50px]">
          <div className="flex min-w-0 flex-col gap-10 lg:gap-14">
            <div>
              <h1 className="font-title text-5xl leading-tight font-medium text-[#2B2119] sm:text-6xl lg:text-[80px] lg:leading-[1.3]">
                Studio
              </h1>
              <p className="mt-3 max-w-[904px] text-base leading-relaxed text-[#2B2119] sm:text-lg lg:text-[20px] lg:leading-[26px]">
                Maison La Recette explore l’alimentation de demain à travers des
                rencontres, des expériences et des histoires. Podcast,
                événements, ateliers et studio : découvrez celles et ceux qui
                font évoluer notre façon de produire, cuisiner et consommer.
                Ici, on parle d’alimentation durable, mais surtout, on la vit.
              </p>
            </div>
            <ButtonLink
              href="#exemples"
              className="w-fit gap-2 bg-[#2B2119] text-[#FBF8F2] hover:bg-[#16343B]"
            >
              En découvrir plus <span aria-hidden="true">→</span>
            </ButtonLink>
            <ExpertStrip />
          </div>
          <figure className="relative min-h-[320px] overflow-hidden rounded-[20px] sm:min-h-[460px] lg:min-h-[600px]">
            <Image
              src="/studio/hero.jpg"
              alt="Une équipe prépare un plat dans une cuisine"
              fill
              priority
              sizes="(min-width: 1024px) 525px, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#2B2119]/55 via-transparent to-transparent"
            />
            <figcaption className="absolute bottom-[5%] left-[5%] aspect-square w-[7.5rem] shadow-lg sm:w-[9.25rem]">
              <Image
                src="/studio/logos/logo.svg"
                alt="Maison La Recette"
                width={159}
                height={159}
                className="h-full w-full object-contain"
              />
            </figcaption>
          </figure>
        </div>
      </section>

      <section id="exemples" className="scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[1630px] px-6 sm:px-10 lg:px-[50px]">
          <StudioSectionHeading
            title="Quelques exemples"
            intro="Découvrez des histoires et des rencontres autour de l’alimentation durable."
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,468fr)_minmax(0,998fr)] lg:gap-[clamp(2rem,4.24vw,4.0625rem)]">
            {projects.slice(0, 2).map((project) => (
              <UniverseCard
                key={project.title}
                tone="studio"
                pinSrc="/studio/puce.svg"
                title={project.title}
                text={project.text}
                layout={project.layout}
                images={project.images}
              />
            ))}
          </div>
          <div className="mt-8 grid gap-8 lg:mt-[65px] lg:grid-cols-[minmax(0,998fr)_minmax(0,468fr)] lg:gap-[clamp(2rem,4.24vw,4.0625rem)]">
            {projects.slice(2).map((project) => (
              <UniverseCard
                key={project.title}
                tone="studio"
                pinSrc="/studio/puce.svg"
                title={project.title}
                text={project.text}
                layout={project.layout}
                images={project.images}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto w-full max-w-[1630px] px-6 sm:px-10 lg:px-[50px]">
          <StudioSectionHeading
            title="Vous en parlez mieux"
            intro="Découvrez les retours de celles et ceux qui ont partagé une expérience avec Maison La Recette."
          />
          <div className="mt-10">
            <TestimonialGrid testimonials={testimonials} tone="studio" />
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="max-w-[1528px] 2xl:px-0">
          <div className="grid gap-8 rounded-[20px] bg-[#D9FCFC] p-6 sm:p-10 lg:grid-cols-[minmax(0,503fr)_minmax(0,904fr)] lg:items-center lg:gap-12 lg:p-10">
            <div className="relative aspect-square overflow-hidden rounded-[20px]">
              <Image
                src="/studio/projects/DSC_2935.jpg"
                alt="Un atelier de cuisine partagé"
                fill
                sizes="(min-width: 1024px) 503px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-start gap-5">
              <h2 className="font-title text-4xl leading-tight font-medium text-[#2B2119] sm:text-5xl lg:text-[48px] xl:text-[64px] 2xl:text-[72px]">
                En apprendre un peu +
              </h2>
              <p className="text-base leading-relaxed text-[#2B2119] sm:text-lg lg:text-[20px] lg:leading-[26px]">
                Vous souhaitez raconter une histoire, partager un engagement ou
                imaginer un podcast autour de l’alimentation ? Parlons de votre
                projet et trouvons ensemble le format qui vous correspond.
              </p>
              <ButtonLink
                href={`mailto:${site.contactEmail}`}
                className="gap-2 bg-[#2B2119] text-[#FBF8F2] hover:bg-[#16343B]"
              >
                Faire un devis <span aria-hidden="true">→</span>
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
