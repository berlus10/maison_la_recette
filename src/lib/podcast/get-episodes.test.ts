import { afterEach, describe, expect, it, vi } from 'vitest';
import { getPodcastEpisodes } from './get-episodes';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('getPodcastEpisodes', () => {
  it('bypasses the feed cache when a fresh episode URL is requested', async () => {
    vi.stubEnv('PODCAST_RSS_URL', 'https://feed.example.test/rss');
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        new Response(
          `<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"><channel><item><title>Épisode récent</title><pubDate>Mon, 05 Oct 2026 10:00:00 GMT</pubDate><enclosure url="https://example.com/audio/latest.mp3?token=fresh" type="audio/mpeg"/><itunes:duration>60</itunes:duration></item></channel></rss>`,
          { status: 200 },
        ),
      );
    vi.stubGlobal('fetch', fetchMock);

    const result = await getPodcastEpisodes({ fresh: true });

    expect(result.source).toBe('ausha');
    expect(result.items[0]?.audioUrl).toBe(
      'https://example.com/audio/latest.mp3?token=fresh',
    );
    expect(fetchMock).toHaveBeenCalledWith(
      'https://feed.example.test/rss',
      expect.objectContaining({ cache: 'no-store' }),
    );
  });

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
