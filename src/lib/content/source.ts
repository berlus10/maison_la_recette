import type { AboutContent, Experience, Testimonial } from './types';

export type TestimonialQuery = {
  featuredOnly?: boolean;
};

export interface ContentSource {
  getExperiences(): Promise<Experience[]>;
  getTestimonials(query?: TestimonialQuery): Promise<Testimonial[]>;
  getAboutContent(): Promise<AboutContent>;
}
