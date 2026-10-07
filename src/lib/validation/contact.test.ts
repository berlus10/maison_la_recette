import { describe, expect, it } from 'vitest';
import { contactSchema } from './contact';

const validContact = {
  firstName: 'Alice',
  email: 'alice@example.com',
  subject: 'question',
  message: 'Bonjour, pouvez-vous me renseigner ?',
  consent: true,
  honeypot: '',
};

describe('contactSchema', () => {
  it('accepts valid data', () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it('rejects missing consent and a filled honeypot', () => {
    expect(
      contactSchema.safeParse({ ...validContact, consent: false }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...validContact, honeypot: 'spam' }).success,
    ).toBe(false);
  });
});
