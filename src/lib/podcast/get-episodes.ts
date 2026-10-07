import { getFallbackPodcastItems } from './fallback';
import { parsePodcastFeed } from './parser';

export type PodcastFeedResult = {
  items: ReturnType<typeof parsePodcastFeed>;
  source: 'ausha' | 'fallback';
};

export async function getPodcastEpisodes(): Promise<PodcastFeedResult> {
  const rssUrl = process.env.PODCAST_RSS_URL;

  if (!rssUrl) {
    console.warn(
      'PODCAST_RSS_URL is not set; serving the checked-in podcast snapshot.',
    );
    return { items: getFallbackPodcastItems(), source: 'fallback' };
  }

  try {
    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new Error(
        `Podcast feed request failed with HTTP ${response.status}.`,
      );
    }

    const items = parsePodcastFeed(await response.text());
    if (items.length === 0) {
      throw new Error('Podcast feed did not contain any valid episode items.');
    }

    return { items, source: 'ausha' };
  } catch (error) {
    console.warn(
      'Podcast RSS unavailable; serving the checked-in snapshot.',
      error,
    );
    return { items: getFallbackPodcastItems(), source: 'fallback' };
  }
}
