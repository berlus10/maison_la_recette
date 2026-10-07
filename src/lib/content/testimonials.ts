import type { Testimonial } from './types';
import { activeContentSource } from './active-source';

export async function getTestimonials(options?: {
  featuredOnly?: boolean;
}): Promise<Testimonial[]> {
  return activeContentSource.getTestimonials(options);
}
