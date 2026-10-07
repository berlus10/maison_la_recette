import siteSettings from '../../content/site.json';
import { siteSettingsSchema } from './schemas';

export type SiteSettings = ReturnType<typeof siteSettingsSchema.parse>;

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettingsSchema.parse(siteSettings);
}
