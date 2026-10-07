import { describe, expect, it } from 'vitest';
import { devisSchema } from './devis';

const validDevis = {
  company: 'Acme',
  contactName: 'Alice Martin',
  email: 'alice@example.com',
  phone: '0600000000',
  eventType: 'team-building',
  peopleCount: '20',
  message: 'Nous souhaitons organiser un atelier pour notre équipe.',
  consent: true,
  honeypot: '',
};

describe('devisSchema', () => {
  it('accepts valid data and coerces the participant count to a number', () => {
    const result = devisSchema.safeParse(validDevis);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.peopleCount).toBe(20);
    }
  });

  it('rejects an invalid email', () => {
    expect(
      devisSchema.safeParse({ ...validDevis, email: 'not-an-email' }).success,
    ).toBe(false);
  });

  it('requires explicit consent', () => {
    expect(
      devisSchema.safeParse({ ...validDevis, consent: false }).success,
    ).toBe(false);
  });

  it('rejects a filled honeypot', () => {
    expect(
      devisSchema.safeParse({ ...validDevis, honeypot: 'spam' }).success,
    ).toBe(false);
  });
});
