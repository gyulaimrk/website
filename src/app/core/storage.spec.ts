import { readStored, writeStored } from './storage';

describe('storage', () => {
  beforeEach(() => localStorage.clear());

  it('returns the saved, allowed value', () => {
    writeStored('k', 'b');
    expect(readStored('k', ['a', 'b'] as const)).toBe('b');
  });

  it('undefined for an invalid or missing value', () => {
    expect(readStored('k', ['a', 'b'] as const)).toBeUndefined();
    writeStored('k', 'x');
    expect(readStored('k', ['a', 'b'] as const)).toBeUndefined();
  });

  it('does not throw when storage is unavailable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('tiltva');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('tiltva');
    });
    expect(readStored('k', ['a'] as const)).toBeUndefined();
    expect(() => writeStored('k', 'a')).not.toThrow();
    vi.restoreAllMocks();
  });
});
