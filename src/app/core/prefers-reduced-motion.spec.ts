import { prefersReducedMotion } from './prefers-reduced-motion';

describe('prefersReducedMotion', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('false if matchMedia is missing', () => {
    vi.stubGlobal('matchMedia', undefined);
    expect(prefersReducedMotion()).toBe(false);
  });

  it('returns the browser setting', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    expect(prefersReducedMotion()).toBe(true);
  });
});
