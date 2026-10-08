import { NextResponse } from 'next/server';
import { getPodcastEpisodes } from '@/lib/podcast/get-episodes';

const allowedAudioHosts = ['audio.ausha.co', 'b24-audiofiles.ausha.co'];

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const slug = requestUrl.searchParams.get('slug');
  const { items } = await getPodcastEpisodes({ fresh: true });
  const episode = slug ? items.find((item) => item.slug === slug) : items[0];

  if (!episode) {
    return NextResponse.json(
      {
        error: slug
          ? 'Podcast episode was not found.'
          : 'No podcast episode is available.',
      },
      { status: slug ? 404 : 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const audioUrl = new URL(episode.audioUrl);
  if (
    audioUrl.protocol !== 'https:' ||
    !allowedAudioHosts.includes(audioUrl.hostname)
  ) {
    return NextResponse.json(
      { error: 'The podcast audio URL uses an unsupported host.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const range = request.headers.get('range');

  let audioResponse: Response;
  try {
    audioResponse = await fetch(audioUrl, {
      cache: 'no-store',
      headers: range ? { Range: range } : undefined,
    });
  } catch (error) {
    console.error('Podcast audio request failed.', error);
    return NextResponse.json(
      { error: 'The podcast audio is currently unavailable.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  if (audioResponse.status !== 200 && audioResponse.status !== 206) {
    console.error(`Podcast audio returned HTTP ${audioResponse.status}.`);
    return NextResponse.json(
      { error: 'The podcast audio is currently unavailable.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const headers = new Headers({
    'Cache-Control': 'no-store, max-age=0',
    'Content-Type': audioResponse.headers.get('content-type') ?? 'audio/mpeg',
    'Accept-Ranges': audioResponse.headers.get('accept-ranges') ?? 'bytes',
  });
  for (const header of ['content-length', 'content-range']) {
    const value = audioResponse.headers.get(header);
    if (value) headers.set(header, value);
  }

  if (requestUrl.searchParams.get('download') === '1') {
    const safeSlug = episode.slug.replace(/[^a-z0-9-]/gi, '-');
    headers.set(
      'Content-Disposition',
      `attachment; filename="${safeSlug}.mp3"`,
    );
  }

  return new Response(audioResponse.body, {
    status: audioResponse.status,
    headers,
  });
}
