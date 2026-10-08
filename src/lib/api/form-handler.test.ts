import { afterEach, describe, expect, it, vi } from 'vitest';
import { devisSchema } from '../validation/devis';
import { createFormHandler } from './form-handler';

const valid = {
  fullName: 'Camille Martin',
  email: 'camille@acme.fr',
  organization: 'Acme',
  groupSize: '15-30',
  period: 'novembre 2026',
  consent: true,
};

function post(body: unknown) {
  return new Request('http://localhost/api/devis', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

function setup(send = vi.fn().mockResolvedValue(undefined)) {
  const handler = createFormHandler({
    label: 'api/test',
    schema: devisSchema,
    honeypotField: 'website',
    send,
  });
  return { handler, send };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('createFormHandler', () => {
  it('envoie et répond 200 pour une demande valide', async () => {
    const { handler, send } = setup();
    const response = await handler(post(valid));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(send).toHaveBeenCalledTimes(1);
  });

  it('ne renvoie pas les données saisies dans la réponse', async () => {
    const { handler } = setup();
    const response = await handler(post(valid));

    expect(JSON.stringify(await response.json())).not.toContain('camille');
  });

  it('refuse une demande invalide avec les erreurs par champ', async () => {
    const { handler, send } = setup();
    const response = await handler(post({ ...valid, consent: false }));
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.errors.fieldErrors.consent).toBeDefined();
    expect(send).not.toHaveBeenCalled();
  });

  it('refuse un corps qui n’est pas du JSON', async () => {
    const { handler, send } = setup();
    const response = await handler(post('pas du json'));

    expect(response.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it('n’envoie rien si le champ piège est rempli', async () => {
    const { handler, send } = setup();
    const response = await handler(post({ ...valid, website: 'http://spam' }));

    expect(response.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });

  it('répond 502 et journalise si l’envoi échoue', async () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const { handler } = setup(vi.fn().mockRejectedValue(new Error('boom')));
    const response = await handler(post(valid));

    expect(response.status).toBe(502);
    expect((await response.json()).ok).toBe(false);
    expect(consoleError).toHaveBeenCalled();
  });
});
