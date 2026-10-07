import type { PodcastFeedItem } from './types';

export function getFallbackPodcastItems(): PodcastFeedItem[] {
  return [
    {
      id: 'episode-1',
      title: 'Épisode 1 — L’alimentation durable au quotidien',
      slug: 'episode-1-alimentation-durable',
      description: 'Un premier épisode pour comprendre les gestes simples du quotidien.',
      publishedAt: '2026-10-01',
      durationMinutes: 32,
      link: '#',
    },
    {
      id: 'episode-2',
      title: 'Épisode 2 — Manger mieux sans se compliquer',
      slug: 'episode-2-manger-mieux',
      description: 'Des conseils concrets pour une cuisine plus sage et plus accessible.',
      publishedAt: '2026-10-08',
      durationMinutes: 29,
      link: '#',
    },
  ];
}
