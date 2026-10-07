import { z } from 'zod';

const nonEmptyText = z.string().trim().min(1);

export const podcastEpisodeSchema = z.object({
  id: nonEmptyText,
  title: nonEmptyText,
  slug: nonEmptyText,
  description: nonEmptyText,
  publishedAt: z.iso.datetime(),
  season: z.number().int().positive(),
  durationMinutes: z.number().positive(),
  platforms: z.array(
    z.object({
      name: nonEmptyText,
      url: z.url(),
    }),
  ),
});

export const experienceSchema = z.object({
  id: nonEmptyText,
  slug: nonEmptyText,
  title: nonEmptyText,
  shortDescription: nonEmptyText,
  description: nonEmptyText,
  audience: z.enum(['particuliers', 'entreprises']),
  duration: nonEmptyText,
  price: z.string().optional(),
  category: z.enum(['atelier', 'tour', 'immersion', 'team-building']),
  isFeatured: z.boolean().optional(),
});

export const testimonialSchema = z.object({
  id: nonEmptyText,
  name: nonEmptyText,
  role: z.string().optional(),
  quote: nonEmptyText,
});

export const aboutContentSchema = z.object({
  intro: nonEmptyText,
  mission: nonEmptyText,
  values: z.array(nonEmptyText),
});

export const experiencesSchema = z.array(experienceSchema);
export const testimonialsSchema = z.array(testimonialSchema);
