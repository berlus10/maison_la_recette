'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { PodcastFeedItem } from '@/lib/podcast/types';
import {
  podcastDescriptionSummary,
  splitPodcastTitle,
} from '@/lib/podcast/presentation';
import { getEpisodePlatforms } from '@/lib/podcast/platforms';
import { PodcastPlatformMenu } from './PodcastPlatformMenu';
import { PodcastPreview } from './PodcastPreview';

const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

export function PodcastEpisodeCard({ episode }: { episode: PodcastFeedItem }) {
  const { subtitle, title } = splitPodcastTitle(episode.title);
  const description = podcastDescriptionSummary(episode.description, 280);
  const previewUrl = `/api/podcast/audio?slug=${encodeURIComponent(episode.slug)}`;
  const downloadUrl = `${previewUrl}&download=1`;
  const platforms = getEpisodePlatforms(episode.link);
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <article className="row-podcast grid gap-5 rounded-[20px] p-4 text-white sm:p-5 md:grid-cols-[minmax(0,330px)_minmax(0,1fr)] md:gap-6 lg:gap-10">
      <div className="grid aspect-square w-full max-w-[330px] place-items-center justify-self-center rounded-2xl bg-white/20 p-3 md:max-w-none md:self-center">
        <div
          className={`relative aspect-square w-full max-w-[340px] animate-spin [animation-duration:6s] ${
            isSpinning ? '' : '[animation-play-state:paused]'
          }`}
        >
          <Image
            src="/podcast/disque.svg"
            alt=""
            fill
            unoptimized
            sizes="340px"
            className="object-contain"
          />
        </div>
      </div>
      <div className="flex min-w-0 flex-col gap-4 py-1">
        <div>
          <p className="text-sm leading-relaxed text-white/80">
            Saison {episode.season} <span aria-hidden="true">·</span>{' '}
            {dateFormatter.format(new Date(episode.publishedAt))}{' '}
            <span aria-hidden="true">·</span> {episode.durationMinutes} min
          </p>
          {subtitle ? (
            <p className="mt-2 text-sm font-semibold tracking-[0.1em] text-white uppercase">
              {subtitle}
            </p>
          ) : null}
          <h3 className="font-title mt-1 text-2xl leading-tight font-medium text-white sm:text-3xl">
            {title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-white sm:text-lg">
            {description}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-3">
          <PodcastPreview
            tone="light"
            onPlayingChange={setIsSpinning}
            src={previewUrl}
            className="max-w-[310px]"
          />
          <div className="ml-auto flex items-center gap-3">
            <a
              href={downloadUrl}
              download
              aria-label={`Télécharger l’épisode : ${title}`}
              title="Télécharger l’épisode"
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FBF8F2] text-[#2B2119] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
                <path d="M5 16v4h14v-4" />
              </svg>
            </a>
            <PodcastPlatformMenu platforms={platforms} />
          </div>
        </div>
      </div>
    </article>
  );
}
