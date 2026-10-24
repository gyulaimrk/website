import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.removeItem('theme');
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
  });
  afterEach(() => vi.unstubAllGlobals());

  /** Elindítja a szolgáltatást, és lefuttatja az első megjelenítés utáni lépéseket. */
  function start() {
    const service = TestBed.inject(ThemeService);
    TestBed.tick();
    return service;
  }

  it('az első megjelenítés előtt sötét, a hidratálás miatt', () => {
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  it('a rendszer világos beállítását az első megjelenítés után követi', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    expect(start().theme()).toBe('light');
  });

  it('a mentett választás előnyt élvez', () => {
    localStorage.setItem('theme', 'light');
    expect(start().theme()).toBe('light');
  });

  it('a mentett értéket nem írja felül az indulás előtt', () => {
    localStorage.setItem('theme', 'light');
    TestBed.inject(ThemeService);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('váltáskor frissíti a dokumentumot és elmenti a választást', () => {
    const service = start();
    service.toggle();
    TestBed.tick();
    expect(service.theme()).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });
});
