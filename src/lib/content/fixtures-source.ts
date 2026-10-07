import about from '../../content/about.json';
import experiences from '../../content/experiences.json';
import testimonials from '../../content/testimonials.json';
import {
  aboutContentSchema,
  experiencesSchema,
  testimonialsSchema,
} from './schemas';
import type { ContentSource } from './source';

export const fixturesSource: ContentSource = {
  async getExperiences() {
    return experiencesSchema.parse(experiences);
  },

  async getTestimonials(query) {
    const allTestimonials = testimonialsSchema.parse(testimonials);
    return query?.featuredOnly
      ? allTestimonials.filter((testimonial) => testimonial.isFeatured)
      : allTestimonials;
  },

  async getAboutContent() {
    return aboutContentSchema.parse(about);
  },
};
