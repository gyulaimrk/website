import { prefersReducedMotion } from './prefers-reduced-motion';

describe('prefersReducedMotion', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('hamis, ha nincs matchMedia', () => {
    vi.stubGlobal('matchMedia', undefined);
    expect(prefersReducedMotion()).toBe(false);
  });

  it('a böngésző beállítását adja vissza', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    expect(prefersReducedMotion()).toBe(true);
  });
});
