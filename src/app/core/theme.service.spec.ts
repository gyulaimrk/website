import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.removeItem('theme');
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
  });
  afterEach(() => vi.unstubAllGlobals());

  /** Starts the service and runs the steps after the first render. */
  function start() {
    const service = TestBed.inject(ThemeService);
    TestBed.tick();
    return service;
  }

  it('dark before the first render, because of hydration', () => {
    expect(TestBed.inject(ThemeService).theme()).toBe('dark');
  });

  it('follows the system light setting after the first render', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    expect(start().theme()).toBe('light');
  });

  it('the saved choice takes precedence', () => {
    localStorage.setItem('theme', 'light');
    expect(start().theme()).toBe('light');
  });

  it('does not overwrite the saved value before startup', () => {
    localStorage.setItem('theme', 'light');
    TestBed.inject(ThemeService);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('on toggle it updates the document and saves the choice', () => {
    const service = start();
    service.toggle();
    TestBed.tick();
    expect(service.theme()).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
  });

  it('a toggle before the first render is not overwritten by the saved or system theme', () => {
    localStorage.setItem('theme', 'dark');
    const service = TestBed.inject(ThemeService);
    service.toggle();
    TestBed.tick();
    expect(service.theme()).toBe('light');
    expect(document.documentElement.dataset['theme']).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('does not save the system theme, only a deliberate switch', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const service = start();
    expect(service.theme()).toBe('light');
    expect(localStorage.getItem('theme')).toBeNull();
    service.toggle();
    TestBed.tick();
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
