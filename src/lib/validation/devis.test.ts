import { describe, expect, it } from 'vitest';
import { devisSchema } from './devis';

const valid = {
  fullName: 'Camille Martin',
  email: 'camille@acme.fr',
  organization: 'Acme',
  groupSize: '15-30',
  period: 'novembre 2026',
  consent: true,
};

describe('devisSchema', () => {
  it('accepte une demande valide', () => {
    expect(devisSchema.safeParse(valid).success).toBe(true);
  });
  it('accepte les champs facultatifs', () => {
    expect(
      devisSchema.safeParse({
        ...valid,
        phone: '0600000000',
        offer: 'food-tour',
      }).success,
    ).toBe(true);
  });
  it('refuse sans consentement', () => {
    expect(devisSchema.safeParse({ ...valid, consent: false }).success).toBe(
      false,
    );
  });
  it('refuse une taille de groupe inconnue', () => {
    expect(devisSchema.safeParse({ ...valid, groupSize: '1000' }).success).toBe(
      false,
    );
  });
  it('refuse un e-mail invalide', () => {
    expect(
      devisSchema.safeParse({ ...valid, email: 'pas-un-mail' }).success,
    ).toBe(false);
  });
});
