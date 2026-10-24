import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([{ path: '**', children: [] }])] });
  });
  afterEach(() => vi.unstubAllGlobals());

  it('alapból magyar, amíg az útvonal nem állít be nyelvet', () => {
    expect(TestBed.inject(LanguageService).lang()).toBe('hu');
  });

  it('a megjegyzett nyelv előnyt élvez a böngészőnyelvvel szemben', () => {
    localStorage.setItem('lang', 'en');
    vi.stubGlobal('navigator', { language: 'hu-HU' });
    expect(TestBed.inject(LanguageService).preferred()).toBe('en');
  });

  it('mentés nélkül a magyar böngészőnyelvnél magyar, egyébként angol', () => {
    const service = TestBed.inject(LanguageService);
    vi.stubGlobal('navigator', { language: 'hu-HU' });
    expect(service.preferred()).toBe('hu');
    vi.stubGlobal('navigator', { language: 'de-DE' });
    expect(service.preferred()).toBe('en');
  });

  it('beállításkor frissíti a dokumentum nyelvét és megjegyzi a választást', () => {
    const service = TestBed.inject(LanguageService);
    service.use('en');
    TestBed.tick();
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('amíg az útvonal nem választott nyelvet, nem írja felül a megjegyzettet', () => {
    localStorage.setItem('lang', 'en');
    TestBed.inject(LanguageService);
    TestBed.tick();
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('a váltó a másik nyelv címére navigál', async () => {
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
