import type { Experience } from './types';
import { fixturesSource } from './fixtures-source';

export async function getExperiences(): Promise<Experience[]> {
  return fixturesSource.getExperiences();
}
