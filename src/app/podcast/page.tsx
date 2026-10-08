import Image from 'next/image';
import type { Metadata } from 'next';
import { ExpertStrip } from '@/components/sections/ExpertStrip';
import { PodcastEpisodeList } from '@/components/sections/PodcastEpisodeList';
import { PodcastPlatformMenu } from '@/components/sections/PodcastPlatformMenu';
import { showAllPlatforms } from '@/lib/podcast/platforms';
import { TestimonialGrid } from '@/components/sections/TestimonialGrid';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { getSiteSettings } from '@/lib/content/site-settings';
import { getTestimonials } from '@/lib/content/testimonials';
import { getPodcastEpisodes } from '@/lib/podcast/get-episodes';

export const metadata: Metadata = {
  title: 'Podcast La Recette',
  description:
    'Écoutez les histoires de celles et ceux qui façonnent l’alimentation de demain avec le podcast La Recette.',
};

export const revalidate = 3600;

export default async function PodcastPage() {
  const [podcast, testimonials, site] = await Promise.all([
    getPodcastEpisodes(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <>
      <section className="py-8 sm:py-12 lg:py-16">
        <Container className="max-w-[1528px]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,904fr)_minmax(0,525fr)] lg:items-start lg:gap-[clamp(2rem,5.73vw,6.1875rem)]">
            <div className="flex flex-col gap-8 pt-6 sm:pt-10 lg:gap-10 lg:pt-20">
              <div className="flex flex-col gap-5 lg:gap-8">
                <div className="lg:translate-y-2">
                  <h1 className="font-title text-5xl leading-[1.12] font-medium tracking-tight text-[#2B2119] sm:text-6xl lg:text-[5rem] lg:leading-[1.3]">
                    Podcasts
                  </h1>
                  <p className="mt-3 max-w-[904px] text-base leading-relaxed text-[#2B2119] sm:text-lg lg:mt-[10px] lg:text-xl lg:leading-[1.3]">
                    Dans La Recette, Julie part à la rencontre de celles et ceux
                    qui façonnent l’alimentation de demain. Producteurs, chefs,
                    artisans, entrepreneurs et acteurs engagés partagent leurs
                    histoires, leurs parcours et leurs ingrédients du
                    changement.
                  </p>
                </div>
                <div className="flex lg:-translate-y-2">
                  <PodcastPlatformMenu
                    platforms={showAllPlatforms}
                    label="Lire sur ma plateforme"
                    opensDown
                    triggerClassName="min-h-[53px] bg-[#2B2119] text-[#FBF8F2] hover:bg-[#16343B] focus-visible:outline-[#2B2119] sm:text-lg"
                  />
                </div>
              </div>
              <div className="lg:-translate-y-3">
                <ExpertStrip title="Des experts et professionnels qui nous expliquent :" />
              </div>
            </div>

            <figure className="relative isolate mx-auto aspect-[4/5] w-full max-w-[33rem] overflow-hidden rounded-[1.25rem] lg:mx-0 lg:aspect-[525/673] lg:max-w-none">
              <Image
                src="/podcast/img.jpg"
                alt="Des participants se retrouvent lors d’une rencontre du podcast La Recette"
                fill
                preload
                sizes="(min-width: 1024px) 525px, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#2B2119]/55 via-transparent to-transparent"
              />
              <figcaption className="absolute bottom-[5%] left-[5%] w-28 sm:w-36">
                <Image
                  src="/podcast/logo_podcast.svg"
                  alt="La Recette, le podcast"
                  width={240}
                  height={140}
                  className="h-auto w-full"
                />
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section id="episodes" className="scroll-mt-24 py-12 sm:py-16">
        <Container className="max-w-[1528px]">
          <div className="mx-auto mb-10 max-w-[904px] text-center">
            <h2 className="font-title text-4xl leading-tight font-medium text-black sm:text-5xl lg:text-[80px] lg:leading-[1.3]">
              Les épisodes
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#2B2119] sm:text-lg lg:text-xl">
              Écoutez les rencontres qui font évoluer notre façon de produire,
              cuisiner et consommer.
            </p>
          </div>
          <PodcastEpisodeList
            initialItems={podcast.items.slice(0, 6)}
            totalCount={podcast.items.length}
          />
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="max-w-[1528px]">
          <div className="mx-auto mb-10 max-w-[850px] text-center">
            <h2 className="font-title text-4xl leading-tight font-medium text-black sm:text-5xl lg:text-[80px] lg:leading-[1.3]">
              Vous en parlez mieux
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#2B2119] sm:text-lg lg:text-xl">
              Découvrez les retours de celles et ceux qui écoutent et partagent
              les histoires de La Recette.
            </p>
          </div>
          <TestimonialGrid testimonials={testimonials} tone="podcast" />
        </Container>
      </section>

      <section className="pb-16 sm:pb-24">
        <Container className="max-w-[1528px] 2xl:px-0">
          <div className="grid gap-8 rounded-[1.25rem] bg-[#D7EAE1] p-5 sm:p-8 lg:grid-cols-[minmax(0,503fr)_minmax(0,904fr)] lg:items-center lg:gap-[clamp(2rem,6.5vw,100px)] lg:p-10">
            <div className="relative aspect-square w-full overflow-hidden rounded-[1.25rem]">
              <Image
                src="/podcast/hero.jpg"
                alt="Deux personnes échangent autour de micros pendant l’enregistrement du podcast"
                fill
                sizes="(min-width: 1024px) 503px, 90vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-start gap-5">
              <h2 className="font-title text-4xl leading-[1.08] font-medium text-[#2B2119] sm:text-5xl lg:text-[clamp(3.5rem,4.5vw,5rem)]">
                Si vous voulez en parler
              </h2>
              <p className="text-base leading-relaxed text-[#2B2119] sm:text-lg lg:text-xl lg:leading-[1.3]">
                Vous avez une histoire à raconter ? Vous êtes professionnel·le
                et souhaitez partager votre projet, votre métier ou votre vision
                de l’alimentation durable ? Julie vous donne la parole dans La
                Recette.
              </p>
              <p className="text-base leading-relaxed text-[#2B2119] sm:text-lg">
                Une envie, une idée ou un projet à partager ? Contactez-nous.
              </p>
              <ButtonLink
                href={`mailto:${site.contactEmail}`}
                className="min-h-[53px] px-5 py-[10px] text-base sm:text-lg"
              >
                Me contacter <span aria-hidden="true">→</span>
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
