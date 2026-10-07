import { NextResponse } from 'next/server';
import { fetchPodcastFeed } from '../../../lib/podcast/parser';

export async function GET() {
  const items = await fetchPodcastFeed();
  return NextResponse.json({ items }, { status: 200 });
}
