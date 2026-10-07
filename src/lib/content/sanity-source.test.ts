import about from '../../content/about.json';
import experiences from '../../content/experiences.json';
import { describe, expect, it } from 'vitest';
import { createSanitySource, type SanityQueryClient } from './sanity-source';

describe('Sanity content source adapter', () => {
  it('validates experience documents returned by Sanity', async () => {
    const client: SanityQueryClient = {
      async fetch() {
        return experiences;
      },
    };

    await expect(
      createSanitySource(client).getExperiences(),
    ).resolves.toHaveLength(4);
  });

  it('filters Sanity testimonials without inventing fixture reviews', async () => {
    const client: SanityQueryClient = {
      async fetch() {
        return [
          {
            id: 'review-example',
            name: 'Review in isolated test data',
            quote: 'This text exists only in the automated test.',
            isFeatured: true,
          },
          {
            id: 'review-not-featured',
            name: 'Another test record',
            quote: 'This text also exists only in the automated test.',
            isFeatured: false,
          },
        ];
      },
    };

    await expect(
      createSanitySource(client).getTestimonials({ featuredOnly: true }),
    ).resolves.toHaveLength(1);
  });

  it('validates the about document returned by Sanity', async () => {
    const client: SanityQueryClient = {
      async fetch() {
        return about;
      },
    };

    await expect(
      createSanitySource(client).getAboutContent(),
    ).resolves.toMatchObject({ mission: about.mission });
  });

  it('surfaces invalid documents instead of returning success-shaped defaults', async () => {
    const client: SanityQueryClient = {
      async fetch() {
        return [{ id: 'broken', slug: 'broken' }];
      },
    };

    await expect(createSanitySource(client).getExperiences()).rejects.toThrow();
  });
});
