import {
  aboutContentSchema,
  experiencesSchema,
  testimonialsSchema,
} from './schemas';
import type { ContentSource } from './source';

export type SanityQueryClient = {
  fetch(query: string): Promise<unknown>;
};

const experiencesQuery = `*[_type == "experience"] | order(_createdAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  shortDescription,
  description,
  audience,
  duration,
  price,
  category,
  "isFeatured": coalesce(isFeatured, false)
}`;

const testimonialsQuery = `*[_type == "testimonial"] | order(_createdAt desc) {
  "id": _id,
  name,
  role,
  quote,
  "isFeatured": coalesce(isFeatured, false)
}`;

const aboutQuery = `*[_type == "about"][0] {
  intro,
  mission,
  values
}`;

export function createSanitySource(client: SanityQueryClient): ContentSource {
  return {
    async getExperiences() {
      return experiencesSchema.parse(await client.fetch(experiencesQuery));
    },

    async getTestimonials(query) {
      const testimonials = testimonialsSchema.parse(
        await client.fetch(testimonialsQuery),
      );

      return query?.featuredOnly
        ? testimonials.filter((testimonial) => testimonial.isFeatured)
        : testimonials;
    },

    async getAboutContent() {
      return aboutContentSchema.parse(await client.fetch(aboutQuery));
    },
  };
}

let sanityClient: SanityQueryClient | undefined;

async function configuredSanitySource(): Promise<ContentSource> {
  if (!sanityClient) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (!projectId) {
      throw new Error(
        'NEXT_PUBLIC_SANITY_PROJECT_ID is required to use the Sanity content source.',
      );
    }

    const { createClient } = await import('next-sanity');
    sanityClient = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2026-10-07',
      useCdn: true,
    });
  }

  return createSanitySource(sanityClient);
}

export const sanitySource: ContentSource = {
  async getExperiences() {
    return (await configuredSanitySource()).getExperiences();
  },

  async getTestimonials(query) {
    return (await configuredSanitySource()).getTestimonials(query);
  },

  async getAboutContent() {
    return (await configuredSanitySource()).getAboutContent();
  },
};
