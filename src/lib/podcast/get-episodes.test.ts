import { afterEach, describe, expect, it, vi } from 'vitest';
import { getPodcastEpisodes } from './get-episodes';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('getPodcastEpisodes', () => {
  it('uses the checked-in snapshot when no feed URL is configured', async () => {
    vi.stubEnv('PODCAST_RSS_URL', '');

    const result = await getPodcastEpisodes();

    expect(result.source).toBe('fallback');
    expect(result.items).toHaveLength(12);
  });

  it('uses the checked-in snapshot when the feed request fails', async () => {
    vi.stubEnv('PODCAST_RSS_URL', 'https://feed.example.test/rss');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('', { status: 503 })),
    );

    const result = await getPodcastEpisodes();

    expect(result.source).toBe('fallback');
    expect(result.items).toHaveLength(12);
  });
});
