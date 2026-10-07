export * from './about';
export * from './active-source';
export * from './experiences';
export * from './fixtures-source';
export * from './sanity-source';
export * from './source';
export * from './testimonials';
export * from './types';

import { getAboutContent } from './about';
import { getExperiences } from './experiences';
import { getTestimonials } from './testimonials';

// Switch this import to sanity-source after configuring the Sanity project.
export const content = {
  getAboutContent,
  getExperiences,
  getTestimonials,
};
