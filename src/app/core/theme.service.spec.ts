import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
  });
  afterEach(() => vi.unstubAllGlobals());

  it('alapból sötét, ha a rendszer nem kér világosat', () => {
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  it('a rendszer világos beállítását követi', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
  });

  it('a mentett választás előnyt élvez', () => {
    localStorage.setItem('theme', 'light');
    expect(TestBed.inject(ThemeService).theme()).toBe('light');
  });

  it('váltáskor frissíti a dokumentumot és elmenti a választást', () => {
    const service = TestBed.inject(ThemeService);
    TestBed.flushEffects?.();
    service.toggle();
    TestBed.tick?.();
    expect(service.theme()).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });
});
