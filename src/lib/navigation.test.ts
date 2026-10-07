import { describe, expect, it } from 'vitest';
import { FOOTER_NAV, HEADER_ACTIONS, LEGAL_NAV, MAIN_NAV } from './navigation';

describe('navigation', () => {
  it('toutes les adresses sont internes', () => {
    const all = [...MAIN_NAV, ...FOOTER_NAV, ...LEGAL_NAV, ...Object.values(HEADER_ACTIONS)];
    expect(all.every((l) => l.href.startsWith('/'))).toBe(true);
  });
  it('les adresses du pied de page sont uniques', () => {
    const hrefs = FOOTER_NAV.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});