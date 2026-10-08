import { describe, expect, it } from 'vitest';
import {
  podcastDescriptionSummary,
  podcastDescriptionToText,
  splitPodcastTitle,
} from './presentation';

describe('splitPodcastTitle', () => {
  it('moves a leading [Extrait] label into a subtitle', () => {
    expect(
      splitPodcastTitle('[Extrait] Les algues dans nos assiettes'),
    ).toEqual({ subtitle: 'Extrait', title: 'Les algues dans nos assiettes' });
  });

  it('supports Ausha excerpt labels with guest information', () => {
    expect(
      splitPodcastTitle(
        '[EXTRAIT 1 - Jean-Marie Pédron ] - Les algues vont-elles arriver demain ?',
      ),
    ).toEqual({
      subtitle: 'EXTRAIT 1 - Jean-Marie Pédron',
      title: 'Les algues vont-elles arriver demain ?',
    });
  });

  it('keeps titles without an excerpt label intact', () => {
    expect(splitPodcastTitle('Un épisode sans préfixe')).toEqual({
      subtitle: undefined,
      title: 'Un épisode sans préfixe',
    });
  });

  it('does not remove an excerpt label without a following title', () => {
    expect(splitPodcastTitle('[Extrait]')).toEqual({
      subtitle: undefined,
      title: '[Extrait]',
    });
  });
});

describe('podcastDescriptionToText', () => {
  it('converts Ausha HTML descriptions and entities to readable text', () => {
    expect(
      podcastDescriptionToText(
        '<p>Julie &amp; Jean parlent&nbsp;des algues.</p><p>À écouter&nbsp;!</p>',
      ),
    ).toBe('Julie & Jean parlent des algues. À écouter !');
  });
});

describe('podcastDescriptionSummary', () => {
  it('uses only the first paragraph and shortens long descriptions', () => {
    expect(
      podcastDescriptionSummary(
        '<p>Un premier paragraphe beaucoup trop long qui doit être raccourci pour rester agréable à lire dans cette petite carte de présentation.</p><p>Le paragraphe suivant ne doit pas apparaître.</p>',
        50,
      ),
    ).toBe('Un premier paragraphe beaucoup trop long qui doit…');
  });
});
