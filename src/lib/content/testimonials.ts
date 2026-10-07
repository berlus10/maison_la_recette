import testimonials from '../../content/testimonials.json';
import type { Testimonial } from './types';

export async function getTestimonials(): Promise<Testimonial[]> {
  return testimonials as Testimonial[];
}
