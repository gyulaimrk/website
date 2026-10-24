import { readStored, writeStored } from './storage';

describe('storage', () => {
  beforeEach(() => localStorage.clear());

  it('visszaadja a mentett, megengedett értéket', () => {
    writeStored('k', 'b');
    expect(readStored('k', ['a', 'b'] as const)).toBe('b');
  });

  it('érvénytelen vagy hiányzó értéknél undefined', () => {
    expect(readStored('k', ['a', 'b'] as const)).toBeUndefined();
    writeStored('k', 'x');
    expect(readStored('k', ['a', 'b'] as const)).toBeUndefined();
  });

  it('nem dob hibát, ha a tárolás nem elérhető', () => {
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
