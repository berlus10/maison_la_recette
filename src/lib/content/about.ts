import type { AboutContent } from './types';
import { fixturesSource } from './fixtures-source';

export async function getAboutContent(): Promise<AboutContent> {
  return fixturesSource.getAboutContent();
}
