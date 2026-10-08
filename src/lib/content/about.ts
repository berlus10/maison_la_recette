import type { AboutContent } from './types';
import { activeContentSource } from './active-source';

export async function getAboutContent(): Promise<AboutContent> {
  return activeContentSource.getAboutContent();
}
