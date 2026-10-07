import { z } from 'zod';

export const podcastFeedItemSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  publishedAt: z.iso.datetime(),
  season: z.number().int().positive(),
  durationMinutes: z.number().positive(),
  audioUrl: z.url(),
  link: z.url(),
});

export const podcastFeedItemsSchema = z.array(podcastFeedItemSchema);

export type PodcastFeedItem = z.infer<typeof podcastFeedItemSchema>;
