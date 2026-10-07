import type {
  aboutContentSchema,
  experienceSchema,
  podcastEpisodeSchema,
  testimonialSchema,
} from './schemas';
import type { z } from 'zod';

export type PodcastEpisode = z.infer<typeof podcastEpisodeSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type AboutContent = z.infer<typeof aboutContentSchema>;
