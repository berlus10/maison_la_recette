import type { Testimonial } from './types';
import { fixturesSource } from './fixtures-source';

export async function getTestimonials(options?: {
  featuredOnly?: boolean;
}): Promise<Testimonial[]> {
  return fixturesSource.getTestimonials(options);
}
