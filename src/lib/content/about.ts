import about from '../../content/about.json';
import type { AboutContent } from './types';

export async function getAboutContent(): Promise<AboutContent> {
  return about as AboutContent;
}
