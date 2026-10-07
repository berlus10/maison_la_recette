import experiences from '../../content/experiences.json';
import type { Experience } from './types';

export async function getExperiences(): Promise<Experience[]> {
  return experiences as Experience[];
}
