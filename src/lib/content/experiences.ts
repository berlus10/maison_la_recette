import type { Experience } from './types';
import { activeContentSource } from './active-source';

export async function getExperiences(): Promise<Experience[]> {
  return activeContentSource.getExperiences();
}
