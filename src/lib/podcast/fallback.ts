import episodes from '../../content/episodes.fixture.json';
import { podcastFeedItemsSchema } from './types';

export function getFallbackPodcastItems() {
  return podcastFeedItemsSchema.parse(episodes);
}
