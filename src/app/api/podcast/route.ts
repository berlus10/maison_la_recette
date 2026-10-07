import { NextResponse } from 'next/server';
import { getPodcastEpisodes } from '../../../lib/podcast/get-episodes';

export async function GET() {
  const result = await getPodcastEpisodes();
  return NextResponse.json(result, { status: 200 });
}
