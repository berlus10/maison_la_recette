import { FeatureRow } from '@/components/sections/FeatureRow';
import { PodcastFeatureRow } from '@/components/sections/PodcastFeatureRow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { UniverseCard } from '@/components/ui/UniverseCard';
import { getPodcastEpisodes } from '@/lib/podcast/get-episodes';

export const revalidate = 3600;

export default async function HomePage() {
  const podcast = await getPodcastEpisodes();
  const latest = podcast.items[0];

  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="mx-auto w-full max-w-[1630px] px-6 sm:px-10 lg:px-[50px]">
          <div className="mx-auto flex max-w-[1528px] flex-col items-center gap-5 text-center lg:min-h-[218px] lg:justify-center">
            <div>
              <h1 className="font-title text-5xl leading-tight font-medium text-black sm:text-6xl lg:text-[80px] lg:leading-[104px]">
                Maison La Recette
              </h1>
              <p className="text-black sm:text-xl sm:leading-[26px]">
                L’alimentation de demain, en podcast et en vrai.
              </p>
            </div>
            <p className="max-w-[1124px] text-base leading-relaxed text-black sm:text-lg lg:text-[20px] lg:leading-[26px]">
              Maison La Recette explore l’alimentation de demain à travers des
              rencontres, des expériences et des histoires. Podcast, événements,
              ateliers et studio : découvrez celles et ceux qui font évoluer
              notre façon de produire, cuisiner et consommer. Ici, on parle
              d’alimentation durable, mais surtout, on la vit.
            </p>
          </div>
          <div className="mt-12 grid justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 2xl:gap-[62.66px]">
            <UniverseCard
              tone="podcast"
              title="Podcast"
              text="Écoutez celles et ceux qui font bouger l’alimentation."
              href="/podcast"
              images={[
                {
                  src: '/local-assets/home/studio-1.jpg',
                  alt: 'Photo du podcast',
                },
                {
                  src: '/local-assets/home/evenement.JPG',
                  alt: 'Autre photo du podcast',
                },
                {
                  src: '/local-assets/home/podcast-1.png',
                  alt: 'Troisième photo du podcast',
                },
              ]}
            />
            <UniverseCard
              tone="event"
              title="Évènement"
              text="Découvrez l’alimentation autrement."
              href="/experiences"
              images={[
                {
                  src: '/local-assets/home/evenement.JPG',
                  alt: 'Photo de l’évènement',
                },
                {
                  src: '/local-assets/home/podcast-1.png',
                  alt: 'Autre photo de l’évènement',
                },
                {
                  src: '/local-assets/home/studio-1.jpg',
                  alt: 'Troisième photo de l’évènement',
                },
              ]}
            />
            <UniverseCard
              tone="studio"
              title="Studio"
              text="Donnez une voix à vos engagements."
              href="/studio"
              className="md:col-span-2 md:max-w-[467.85px] md:justify-self-center lg:col-span-1 lg:max-w-[467.85px]"
              images={[
                {
                  src: '/local-assets/home/evenement.JPG',
                  alt: 'Photo du studio',
                },
                {
                  src: '/local-assets/home/podcast-1.png',
                  alt: 'Autre photo du studio',
                },
                {
                  src: '/local-assets/home/studio-1.jpg',
                  alt: 'Troisième photo du studio',
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-[1630px] px-6 sm:px-10 lg:px-[50px]">
          <div className="mx-auto max-w-[1124px] text-center">
            <SectionHeading title="En savoir plus" />
            <p className="mt-4 text-lg leading-relaxed font-medium text-black sm:text-xl">
              L’alimentation de demain, ça s’écoute, ça se découvre et ça se
              vit.
            </p>
            <p className="mt-3 text-base leading-relaxed text-black sm:text-lg">
              Podcast, expériences et studio : Maison La Recette crée des
              formats pour découvrir autrement celles et ceux qui font évoluer
              notre alimentation.
              <br className="hidden sm:block" /> Des histoires à écouter, des
              rencontres à vivre et des expériences à partager.
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-6">
            {latest ? (
              <PodcastFeatureRow
                episodeTitle={latest.title}
                episodeDescription={latest.description}
              />
            ) : null}
            <FeatureRow
              tone="event"
              title="Des expériences pour goûter, apprendre et partager"
              text={[
                'Food tours, ateliers, immersions… Maison La Recette vous emmène à la rencontre de celles et ceux qui font l’alimentation de demain.',
                'Pour les entreprises, des formats sur mesure pour vos équipes : team building, ateliers, immersions ou événements.',
                'Pour les particuliers, des expériences conviviales pour découvrir Lyon, ses savoir-faire et de nouvelles façons de bien manger.',
                'On ne se contente pas d’en parler : on le vit ensemble.',
              ]}
              cta="Découvrir les expériences"
              href="/experiences"
              image={{
                src: '/local-assets/home/studio-1.jpg',
                alt: 'Un chef prépare un plat dans une cuisine professionnelle',
              }}
            />
            <FeatureRow
              tone="studio"
              title="La Recette, le podcast qui met l’alimentation en voix"
              text={[
                'Et si on pouvait changer notre façon de manger, une rencontre à la fois ? Dans La Recette, Julie part à la rencontre de celles et ceux qui façonnent l’alimentation de demain : producteurs, chefs, artisans, entrepreneurs et acteurs engagés. À travers leurs histoires, leurs parcours et leurs initiatives, ils partagent leurs ingrédients du changement et nous donnent des clés pour mieux comprendre les enjeux de notre alimentation.',
                'Écoutez les épisodes directement ici, téléchargez-les pour les écouter où vous voulez ou retrouvez La Recette sur votre plateforme préférée.',
                'À écouter, à partager et à découvrir sans modération.',
              ]}
              cta="En découvrir plus"
              href="/podcast"
              image={{
                src: '/local-assets/home/evenement.JPG',
                alt: 'Portrait de Julie en extérieur',
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}
