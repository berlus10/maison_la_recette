import { NextResponse } from 'next/server';
import { getPodcastEpisodes } from '@/lib/podcast/get-episodes';

const allowedAudioHosts = ['audio.ausha.co', 'b24-audiofiles.ausha.co'];

export async function GET(request: Request) {
  const { items } = await getPodcastEpisodes({ fresh: true });
  const latest = items[0];

  if (!latest) {
    return NextResponse.json(
      { error: 'No podcast episode is available for preview.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  const audioUrl = new URL(latest.audioUrl);
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
    console.error('Podcast preview audio request failed.', error);
    return NextResponse.json(
      { error: 'The podcast audio is currently unavailable.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  if (audioResponse.status !== 200 && audioResponse.status !== 206) {
    console.error(
      `Podcast preview audio returned HTTP ${audioResponse.status}.`,
    );
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

  return new Response(audioResponse.body, {
    status: audioResponse.status,
    headers,
  });
}
