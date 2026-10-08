'use client';

import { useState } from 'react';
import {
  podcastFeedPageSchema,
  type PodcastFeedItem,
} from '@/lib/podcast/types';
import { PodcastEpisodeCard } from './PodcastEpisodeCard';

const PAGE_SIZE = 6;

export function PodcastEpisodeList({
  initialItems,
  totalCount,
}: {
  initialItems: PodcastFeedItem[];
  totalCount: number;
}) {
  const [items, setItems] = useState(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const hasMore = items.length < totalCount;

  async function loadMore() {
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `/api/podcast?offset=${items.length}&limit=${PAGE_SIZE}`,
      );
      if (!response.ok) {
        throw new Error(
          `Loading more podcast episodes failed (${response.status}).`,
        );
      }

      const payload: unknown = await response.json();
      const page = podcastFeedPageSchema.parse(payload);
      if (page.items.length === 0 && items.length < page.totalCount) {
        throw new Error('The podcast feed returned no additional episodes.');
      }

      setItems((currentItems) => [...currentItems, ...page.items]);
    } catch (loadError) {
      console.error('More podcast episodes could not be loaded.', loadError);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {items.length > 0 ? (
        <div className="flex flex-col gap-5 sm:gap-7">
          {items.map((episode) => (
            <PodcastEpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      ) : (
        <p
          role="status"
          className="rounded-[20px] bg-[#EBEBEB] p-6 text-center text-[#2B2119]"
        >
          Aucun épisode n’est disponible pour le moment.
        </p>
      )}

      {error ? (
        <p role="alert" className="mt-5 text-center text-[#2B2119]">
          Les épisodes suivants n’ont pas pu être chargés. Réessaie dans un
          instant.
        </p>
      ) : null}
      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => void loadMore()}
            disabled={isLoading}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#2B2119] px-6 py-3 font-semibold text-[#2B2119] transition-colors hover:bg-[#D7EAE1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B2119] disabled:cursor-wait disabled:opacity-60"
          >
            {isLoading
              ? 'Chargement…'
              : error
                ? 'Réessayer'
                : `Charger plus d’épisodes (${totalCount - items.length})`}
          </button>
        </div>
      ) : null}
    </>
  );
}
