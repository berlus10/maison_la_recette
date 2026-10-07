import { describe, expect, it } from 'vitest';
import { content } from './index';

describe('fixtures content source', () => {
  it('returns the four experiences from the validated JSON fixture', async () => {
    const experiences = await content.getExperiences();

    expect(experiences).toHaveLength(4);
    expect(experiences.map((experience) => experience.slug)).toContain(
      'food-tour',
    );
  });

  it('returns no unapproved or invented testimonials', async () => {
    expect(await content.getTestimonials()).toEqual([]);
    expect(await content.getTestimonials({ featuredOnly: true })).toEqual([]);
  });

  it('returns validated about content', async () => {
    const about = await content.getAboutContent();

    expect(about.intro).toContain('journaliste');
    expect(about.values).toContain('Alimentation durable');
  });

  it('returns validated site settings with no social links until configured', async () => {
    const settings = await content.getSiteSettings();

    expect(settings.contactEmail).toBe('julie@maisonlarecette.fr');
    expect(settings.socialLinks).toEqual([]);
  });

  it('exposes the content accessors through one stable interface', () => {
    expect(Object.keys(content).sort()).toEqual([
      'getAboutContent',
      'getExperiences',
      'getSiteSettings',
      'getTestimonials',
    ]);
  });
});
