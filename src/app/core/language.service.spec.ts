import { TestBed } from '@angular/core/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.unstubAllGlobals());

  it('a mentett nyelvet használja', () => {
    localStorage.setItem('lang', 'en');
    expect(TestBed.inject(LanguageService).lang()).toBe('en');
  });

  it('mentés nélkül a magyar böngészőnyelvnél magyar, egyébként angol', () => {
    vi.stubGlobal('navigator', { language: 'hu-HU' });
    expect(TestBed.inject(LanguageService).lang()).toBe('hu');
    TestBed.resetTestingModule();
    vi.stubGlobal('navigator', { language: 'de-DE' });
    expect(TestBed.inject(LanguageService).lang()).toBe('en');
  });

  it('váltáskor frissíti a dokumentum nyelvét és elmenti a választást', () => {
    localStorage.setItem('lang', 'hu');
    const service = TestBed.inject(LanguageService);
    service.toggle();
    TestBed.tick();
    expect(service.lang()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('lang')).toBe('en');
  });
});
