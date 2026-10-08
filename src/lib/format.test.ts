import { describe, expect, it } from 'vitest';
import { formatDuration, truncate } from './format';

describe('format', () => {
  it('formate les durées', () => {
    expect(formatDuration(1510)).toBe('25 min');
    expect(formatDuration(3723)).toBe('1 h 02');
    expect(formatDuration(null)).toBeNull();
  });
  it('tronque sans couper un mot', () => {
    expect(truncate('un deux trois quatre', 10)).toBe('un deux…');
    expect(truncate('court', 10)).toBe('court');
  });
});
