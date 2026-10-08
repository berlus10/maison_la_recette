import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parsePodcastFeed } from '../src/lib/podcast/parser';

async function main() {
  const rssUrl = process.env.PODCAST_RSS_URL;
  if (!rssUrl) {
    throw new Error(
      'PODCAST_RSS_URL must be set before snapshotting the podcast feed.',
    );
  }

  const response = await fetch(rssUrl, { signal: AbortSignal.timeout(20_000) });
  if (!response.ok) {
    throw new Error(
      `Podcast feed request failed with HTTP ${response.status}.`,
    );
  }

  const episodes = parsePodcastFeed(await response.text()).slice(0, 12);
  if (episodes.length !== 12) {
    throw new Error(
      `Expected 12 valid feed episodes, but parsed ${episodes.length}.`,
    );
  }

  if (episodes.some((episode) => !episode.audioUrl.startsWith('https://'))) {
    throw new Error('Every snapshot episode must have an HTTPS audio URL.');
  }

  await writeFile(
    resolve(process.cwd(), 'src/content/episodes.fixture.json'),
    `${JSON.stringify(episodes, null, 2)}\n`,
    'utf8',
  );

  console.log(
    `Saved ${episodes.length} episodes to src/content/episodes.fixture.json`,
  );
  console.table(
    episodes.map(({ title, publishedAt, durationMinutes, audioUrl }) => ({
      title,
      publishedAt,
      durationMinutes,
      audioUrl,
    })),
  );
}

main().catch((error: unknown) => {
  console.error('Unable to snapshot the Ausha podcast feed.', error);
  process.exitCode = 1;
});
