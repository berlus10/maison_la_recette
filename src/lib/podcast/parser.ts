import { XMLParser } from 'fast-xml-parser';
import { getFallbackPodcastItems } from './fallback';
import type { PodcastFeedItem } from './types';

export async function fetchPodcastFeed(): Promise<PodcastFeedItem[]> {
  const rssUrl = process.env.PODCAST_RSS_URL;

  if (!rssUrl) {
    return getFallbackPodcastItems();
  }

  try {
    const response = await fetch(rssUrl, { next: { revalidate: 3600 } });

    if (!response.ok) {
      return getFallbackPodcastItems();
    }

    const xml = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      parseTagValue: false,
    });

    const data = parser.parse(xml);
    const items = data?.rss?.channel?.item ?? [];

    if (!Array.isArray(items)) {
      return getFallbackPodcastItems();
    }

    return items.map((item: Record<string, unknown>, index: number) => ({
      id: String(item.guid ?? `${index + 1}`),
      title: String(item.title ?? `Épisode ${index + 1}`),
      slug: String(item.title ?? `episode-${index + 1}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-'),
      description: String(item.description ?? 'Épisode du podcast.'),
      publishedAt: String(item.pubDate ?? new Date().toISOString()),
      durationMinutes: 30,
      link: String(item.link ?? '#'),
    }));
  } catch {
    return getFallbackPodcastItems();
  }
}
