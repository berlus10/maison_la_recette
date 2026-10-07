import { describe, expect, it } from 'vitest';
import { buildPeriodOptions } from './period-options';

describe('buildPeriodOptions', () => {
  it('liste les mois suivants puis une option flexible', () => {
    expect(buildPeriodOptions(new Date(2026, 9, 7), 3)).toEqual([
      'novembre 2026',
      'décembre 2026',
      'janvier 2027',
      'Période flexible',
    ]);
  });
});
