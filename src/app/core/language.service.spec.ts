import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([{ path: '**', children: [] }])] });
  });
  afterEach(() => vi.unstubAllGlobals());

  it('defaults to Hungarian until the route sets a language', () => {
    expect(TestBed.inject(LanguageService).lang()).toBe('hu');
  });

  it('the remembered language takes precedence over the browser language', () => {
    localStorage.setItem('lang', 'en');
    vi.stubGlobal('navigator', { language: 'hu-HU' });
    expect(TestBed.inject(LanguageService).preferred()).toBe('en');
  });

  it('without a saved choice it is Hungarian for a Hungarian browser and English otherwise', () => {
    const service = TestBed.inject(LanguageService);
    vi.stubGlobal('navigator', { language: 'hu-HU' });
    expect(service.preferred()).toBe('hu');
    vi.stubGlobal('navigator', { language: 'de-DE' });
    expect(service.preferred()).toBe('en');
  });

  it('on set it updates the document language but does not remember it', () => {
    const service = TestBed.inject(LanguageService);
    service.use('en');
    TestBed.tick();
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('lang')).toBeNull();
  });

  it('the route and the redirect do not overwrite the remembered language', async () => {
    localStorage.setItem('lang', 'en');
    const service = TestBed.inject(LanguageService);
    vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    service.use('hu');
    await service.navigateTo('hu', { replaceUrl: true });
    TestBed.tick();
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('remembers a deliberate switch', async () => {
    const service = TestBed.inject(LanguageService);
    vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    await service.toggle();
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('the toggle navigates to the address of the other language', async () => {
    const service = TestBed.inject(LanguageService);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    expect(service.other()).toBe('en');
    await service.toggle();
    expect(navigate).toHaveBeenCalledWith(
      '/en',
      expect.objectContaining({ skipLocationChange: false }),
    );
  });
});
