'use client';

import Image from 'next/image';
import { useState } from 'react';
import { UniverseCard } from '@/components/ui/UniverseCard';
import type { Experience } from '@/lib/content';

type Audience = Experience['audience'];

type ExperienceImage = {
  src: string;
  alt: string;
};

const experienceImages: Record<string, ExperienceImage> = {
  'atelier-culinaire': {
    src: '/experiences/atelier-culinaire.jpg',
    alt: 'Préparation de légumes pendant un atelier culinaire',
  },
  'food-tour': {
    src: '/experiences/atelier-culinaire.jpg',
    alt: 'Préparation de légumes pendant un atelier culinaire',
  },
  'immersion-a-la-ferme': {
    src: '/experiences/immersion-ferme.jpg',
    alt: 'Récolte de légumes dans un potager',
  },
  'evenement-entreprise': {
    src: '/experiences/evenement-equipe.jpg',
    alt: 'Portrait d’une femme dans un paysage de campagne',
  },
};

const steps = [
  {
    number: '1',
    title: 'Rencontre',
    description:
      'Arrivée sur les lieux, présentation du professionnel, de l’activité et du sujet.',
    color: 'text-[#FF7C68]',
  },
  {
    number: '2',
    title: 'Échanges',
    description:
      'Parler du sujet de l’activité et échanger tous ensemble avec les professionnels.',
    color: 'text-[#DA5A45]',
  },
  {
    number: '3',
    title: 'Atelier',
    description:
      'Une activité sur place pour apprendre des gestes et compléter l’éveil théorique.',
    color: 'text-[#B43723]',
  },
  {
    number: '4',
    title: 'Dégustation',
    description:
      'Si vous avez la chance de produire un plat, partagez-le avec tous et régalez-vous.',
    color: 'text-[#8F1500]',
  },
];

export function ExperienceShowcase({
  experiences,
  contactEmail,
}: {
  experiences: Experience[];
  contactEmail: string;
}) {
  const [audience, setAudience] = useState<Audience>('entreprises');
  const filteredExperiences = experiences.filter(
    (experience) => experience.audience === audience,
  );

  return (
    <section id="experience-showcase" className="pt-0 pb-16 sm:pb-24">
      <div className="mx-auto w-full max-w-[1592px] px-5 sm:px-8">
        <div
          role="group"
          aria-label="Choisir le public de l’activité"
          className="grid min-h-[3.6rem] grid-cols-2 rounded-full bg-[#fbf4e6] p-[3px]"
        >
          <button
            type="button"
            aria-pressed={audience === 'entreprises'}
            onClick={() => setAudience('entreprises')}
            className={`focus-visible:outline-event-900 flex min-w-0 items-center justify-center gap-2 rounded-full px-2 py-2 text-center text-xs font-semibold transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 sm:gap-3 sm:px-4 sm:text-base lg:text-[1.55rem] ${
              audience === 'entreprises'
                ? 'bg-event-900 text-cream'
                : 'text-event-900 hover:bg-event-100'
            }`}
          >
            <span>Activité pour des professionnels</span>
            <AudienceArrow direction="down-left" />
          </button>
          <button
            type="button"
            aria-pressed={audience === 'particuliers'}
            onClick={() => setAudience('particuliers')}
            className={`focus-visible:outline-event-900 flex min-w-0 items-center justify-center gap-2 rounded-full px-2 py-2 text-center text-xs font-semibold transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 sm:gap-3 sm:px-4 sm:text-base lg:text-[1.55rem] ${
              audience === 'particuliers'
                ? 'bg-event-900 text-cream'
                : 'text-event-900 hover:bg-event-100'
            }`}
          >
            <AudienceArrow direction="down-right" />
            <span>Activité pour des particuliers</span>
          </button>
        </div>

        <div className="mx-auto mt-16 flex max-w-[904px] flex-col items-center gap-3 text-center sm:mt-24 sm:gap-5">
          <h2 className="font-title text-ink text-4xl leading-tight font-medium sm:text-5xl lg:text-[5rem] lg:leading-[1.3]">
            Quelques exemples
          </h2>
          <p className="text-ink text-base leading-relaxed sm:text-lg lg:text-xl lg:leading-[1.3]">
            Pour vous rendre compte de ce qui a déjà été fait.
          </p>
        </div>

        <ol className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:mt-[100px] xl:grid-cols-4 xl:gap-x-[76px] xl:gap-y-0">
          {steps.map((step, index) => (
            <li
              key={step.number}
              className="relative flex flex-col items-center gap-2 text-center"
            >
              {index < steps.length - 1 ? <StepArrow /> : null}
              <span
                aria-hidden="true"
                className={`font-title text-[7.5rem] leading-none font-medium ${step.color}`}
              >
                {step.number}
              </span>
              <h3
                className={`font-title text-2xl leading-tight font-medium sm:text-3xl 2xl:text-[2.5rem] 2xl:leading-[1.3] ${step.color}`}
              >
                {step.title}
              </h3>
              <p className="text-ink max-w-[19rem] text-base leading-relaxed sm:text-lg 2xl:text-xl 2xl:leading-[1.3]">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div
          id="experience-list"
          aria-live="polite"
          className="mt-16 2xl:mt-[65px]"
        >
          {filteredExperiences.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-[65px]">
              {filteredExperiences.map((experience, index) => {
                const image =
                  experienceImages[experience.slug] ??
                  experienceImages['atelier-culinaire'];
                const isWide = index % 4 === 1 || index % 4 === 2;
                const subject = encodeURIComponent(
                  `Parlons de l’expérience « ${experience.title} »`,
                );
                return (
                  <UniverseCard
                    key={experience.id}
                    tone="event"
                    pinSrc="/experiences/puce.svg"
                    layout={isWide ? 'wide' : 'split'}
                    className={
                      isWide
                        ? 'md:col-span-2 xl:col-span-2'
                        : index % 4 === 3
                          ? 'xl:col-start-3'
                          : ''
                    }
                    title={experience.title}
                    text={experience.shortDescription}
                    images={[
                      image,
                      { src: image.src, alt: '' },
                      { src: image.src, alt: '' },
                    ]}
                    href={`mailto:${contactEmail}?subject=${subject}`}
                    linkLabel={`Imaginer cette activité : ${experience.title}`}
                  />
                );
              })}
            </div>
          ) : (
            <div className="bg-event-100 rounded-[1.25rem] p-8 text-center">
              <p className="font-title text-event-900 text-2xl font-semibold">
                Aucune activité n’est encore publiée pour ce public.
              </p>
              <p className="text-ink mt-2">
                Écrivez-nous pour imaginer un format adapté à votre projet.
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="bg-event-900 text-cream hover:bg-event-700 focus-visible:outline-event-900 mt-5 inline-flex rounded-full px-6 py-3 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                Nous contacter
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function StepArrow() {
  return (
    <Image
      src="/experiences/fleche.svg"
      alt=""
      width={114}
      height={39}
      aria-hidden="true"
      className="absolute top-[8.5rem] -right-[3.5rem] hidden h-auto w-[6.8rem] xl:block"
    />
  );
}

function AudienceArrow({
  direction,
}: {
  direction: 'down-left' | 'down-right';
}) {
  return direction === 'down-left' ? (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-5 shrink-0 sm:size-7"
    >
      <path
        d="M20 4 4 20m0-10v10h10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="size-5 shrink-0 sm:size-7"
    >
      <path
        d="m4 4 16 16m-10 0h10V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
