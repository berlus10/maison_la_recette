import Image from 'next/image';
import { ButtonLink } from '@/components/ui/Button';
import {
  podcastDescriptionSummary,
  splitPodcastTitle,
} from '@/lib/podcast/presentation';
import { PodcastPreview } from './PodcastPreview';

export function PodcastFeatureRow({
  episodeTitle,
  episodeDescription,
}: {
  episodeTitle: string;
  episodeDescription: string;
}) {
  const { subtitle, title } = splitPodcastTitle(episodeTitle);
  const description = podcastDescriptionSummary(episodeDescription);

  return (
    <article className="row-podcast grid gap-5 rounded-[20px] p-5 text-white md:min-h-[385px] md:grid-cols-[minmax(0,412.46px)_minmax(0,1fr)]">
      <div className="relative h-56 overflow-hidden rounded-[20px] bg-white/10 md:h-[344.77px]">
        <Image
          src="/local-assets/home/cellela.png"
          alt="Des cultures potagères dans une ferme urbaine"
          fill
          sizes="(min-width: 1600px) 412px, (min-width: 768px) 30vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-col gap-2 py-1 md:justify-between md:gap-3">
        <div>
          {subtitle ? (
            <p className="mb-1 text-sm font-semibold tracking-[0.12em] uppercase sm:text-base">
              {subtitle}
            </p>
          ) : null}
          <h3 className="font-title text-2xl leading-tight font-medium sm:text-3xl lg:text-[40px] lg:leading-[52px]">
            {title}
          </h3>
          <p className="mt-2 text-base leading-relaxed sm:text-[20px] sm:leading-[26px]">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PodcastPreview />
          <ButtonLink
            href="/podcast"
            variant="light"
            className="px-5 py-2.5 text-base sm:px-6 sm:py-3 sm:text-xl"
          >
            En découvrir plus →
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
