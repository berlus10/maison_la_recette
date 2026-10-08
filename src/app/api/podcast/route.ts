import { NextResponse } from 'next/server';
import { getPodcastEpisodes } from '../../../lib/podcast/get-episodes';

const DEFAULT_PAGE_SIZE = 6;
const MAX_PAGE_SIZE = 12;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const offsetValue = url.searchParams.get('offset');
  const limitValue = url.searchParams.get('limit');

  if (offsetValue !== null || limitValue !== null) {
    const offset = Number(offsetValue ?? '0');
    const limit = Number(limitValue ?? DEFAULT_PAGE_SIZE);

    if (
      !Number.isInteger(offset) ||
      offset < 0 ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > MAX_PAGE_SIZE
    ) {
      return NextResponse.json(
        { error: 'Podcast pagination parameters are invalid.' },
        { status: 400 },
      );
    }

    const result = await getPodcastEpisodes();
    return NextResponse.json({
      ...result,
      items: result.items.slice(offset, offset + limit),
      totalCount: result.items.length,
    });
  }

  const result = await getPodcastEpisodes();
  return NextResponse.json(result, { status: 200 });
}
