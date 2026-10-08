import { describe, expect, it } from 'vitest';
import type { DevisInput } from '../validation/devis';
import { buildQuoteAcknowledgement, buildQuoteNotification } from './quote';

const request: DevisInput = {
  fullName: 'Camille <b>Martin</b>',
  email: 'camille@acme.fr',
  organization: 'Acme\nBcc: pirate@exemple.fr',
  groupSize: '15-30',
  period: 'novembre 2026',
  offer: 'atelier',
  message: '<img src=x onerror=alert(1)>',
  consent: true,
};

describe('buildQuoteNotification', () => {
  const email = buildQuoteNotification(request, 'julie@exemple.fr');

  it('écrit à Julie et permet de répondre au client', () => {
    expect(email.to).toBe('julie@exemple.fr');
    expect(email.replyTo).toBe('camille@acme.fr');
  });

  it("garde l'objet sur une seule ligne", () => {
    expect(email.subject).not.toMatch(/[\r\n]/);
  });

  it('échappe le HTML saisi par le client', () => {
    expect(email.html).not.toContain('<img');
    expect(email.html).not.toContain('<b>Martin');
    expect(email.html).toContain('&lt;img src=x');
  });

  it('affiche les libellés lisibles', () => {
    expect(email.html).toContain('Atelier culinaire');
    expect(email.html).toContain('15 à 30 personnes');
  });
});

describe('buildQuoteAcknowledgement', () => {
  it('écrit au client, nom échappé, et annonce la réponse sous 48 h', () => {
    const email = buildQuoteAcknowledgement(request);
    expect(email.to).toBe('camille@acme.fr');
    expect(email.html).toContain('&lt;b&gt;Martin');
    expect(email.html).toContain('48 h');
  });
});
