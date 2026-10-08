import { describe, expect, it } from 'vitest';
import { parsePodcastFeed } from './parser';

const oneEpisodeFeed = `<?xml version="1.0"?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <item>
      <guid>007</guid>
      <title>Épisode zéro : cuisiner mieux</title>
      <description>Un épisode de test.</description>
      <link>https://example.com/episodes/007</link>
      <pubDate>Mon, 05 Oct 2026 10:00:00 GMT</pubDate>
      <enclosure url="https://example.com/audio/007.mp3" type="audio/mpeg" />
      <itunes:duration>01:05</itunes:duration>
      <itunes:season>3</itunes:season>
    </item>
  </channel>
</rss>`;

describe('parsePodcastFeed', () => {
  it('maps RSS metadata, preserves string identifiers, and converts duration', () => {
    expect(parsePodcastFeed(oneEpisodeFeed)).toEqual([
      {
        id: '007',
        slug: 'episode-zero-cuisiner-mieux',
        title: 'Épisode zéro : cuisiner mieux',
        description: 'Un épisode de test.',
        publishedAt: '2026-10-05T10:00:00.000Z',
        season: 3,
        durationMinutes: 2,
        audioUrl: 'https://example.com/audio/007.mp3',
        link: 'https://example.com/episodes/007',
      },
    ]);
  });

  it('returns an empty list for malformed or empty feed content', () => {
    expect(parsePodcastFeed('<rss><channel /></rss>')).toEqual([]);
    expect(parsePodcastFeed('not xml')).toEqual([]);
  });
});
