export type PodcastFeedItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  durationMinutes: number;
  audioUrl?: string;
  link?: string;
};
