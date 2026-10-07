import { XMLParser } from 'fast-xml-parser';
import { podcastFeedItemSchema, type PodcastFeedItem } from './types';

type XmlRecord = Record<string, unknown>;

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  textNodeName: '#text',
  parseTagValue: false,
  parseAttributeValue: false,
});

function asRecord(value: unknown): XmlRecord | undefined {
  return typeof value === 'object' && value !== null
    ? (value as XmlRecord)
    : undefined;
}

function text(value: unknown): string | undefined {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value).trim();
  }

  const record = asRecord(value);
  return record ? text(record['#text']) : undefined;
}

function parseDurationMinutes(value: unknown): number | undefined {
  const duration = text(value);
  if (!duration) {
    return undefined;
  }

  const parts = duration.split(':').map(Number);
  if (parts.some((part) => !Number.isFinite(part) || part < 0)) {
    return undefined;
  }

  let seconds: number;
  if (parts.length === 3) {
    seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    seconds = parts[0] * 60 + parts[1];
  } else if (parts.length === 1) {
    seconds = parts[0];
  } else {
    return undefined;
  }

  return seconds > 0 ? Math.ceil(seconds / 60) : undefined;
}

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseItem(item: unknown, index: number): PodcastFeedItem | undefined {
  const record = asRecord(item);
  if (!record) {
    return undefined;
  }

  const enclosure = asRecord(record.enclosure);
  const audioUrl = text(enclosure?.['@_url']);
  const title = text(record.title);
  const publishedAtText = text(record.pubDate);
  const durationMinutes = parseDurationMinutes(record['itunes:duration']);
  const publishedAt = publishedAtText
    ? new Date(publishedAtText).toISOString()
    : undefined;

  if (!title || !publishedAt || !durationMinutes || !audioUrl) {
    return undefined;
  }

  const guid = text(record.guid);
  const link = text(record.link) ?? audioUrl;
  const season = Number(text(record['itunes:season']) ?? '1');
  const description =
    text(record.description) ??
    text(record['content:encoded']) ??
    'Épisode du podcast La Recette.';

  return podcastFeedItemSchema.parse({
    id: guid || audioUrl || `episode-${index + 1}`,
    slug: slugify(title),
    title,
    description,
    publishedAt,
    season: Number.isInteger(season) && season > 0 ? season : 1,
    durationMinutes,
    audioUrl,
    link,
  });
}

export function parsePodcastFeed(xml: string): PodcastFeedItem[] {
  const parsed: unknown = parser.parse(xml);
  const root = asRecord(parsed);
  const rss = asRecord(root?.rss);
  const channel = asRecord(rss?.channel);
  const rawItems = channel?.item;
  const items = Array.isArray(rawItems) ? rawItems : [rawItems];

  return items
    .map((item, index) => parseItem(item, index))
    .filter((item): item is PodcastFeedItem => item !== undefined);
}
