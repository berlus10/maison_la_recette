import about from '../../content/about.json';
import experiences from '../../content/experiences.json';
import testimonials from '../../content/testimonials.json';
import { describe, expect, it } from 'vitest';
import {
  aboutContentSchema,
  experiencesSchema,
  testimonialsSchema,
} from './schemas';

describe('demonstration content schemas', () => {
  it('validates all experience fixtures', () => {
    expect(experiencesSchema.safeParse(experiences).success).toBe(true);
  });

  it('validates the about fixture', () => {
    expect(aboutContentSchema.safeParse(about).success).toBe(true);
  });

  it('validates the provided testimonial fixtures', () => {
    expect(testimonialsSchema.safeParse(testimonials).success).toBe(true);
    expect(testimonials).toHaveLength(3);
  });

  it('rejects an experience missing a title', () => {
    const invalidExperiences = [{ ...experiences[0], title: '' }];

    expect(experiencesSchema.safeParse(invalidExperiences).success).toBe(false);
  });
});
