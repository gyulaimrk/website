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

  it('beállításkor frissíti a dokumentum nyelvét, de nem jegyzi meg', () => {
    const service = TestBed.inject(LanguageService);
    service.use('en');
    TestBed.tick();
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem('lang')).toBeNull();
  });

  it('az útvonal és az átirányítás nem írja felül a megjegyzett nyelvet', async () => {
    localStorage.setItem('lang', 'en');
    const service = TestBed.inject(LanguageService);
    vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    service.use('hu');
    await service.navigateTo('hu', { replaceUrl: true });
    TestBed.tick();
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('a tudatos váltást megjegyzi', async () => {
    const service = TestBed.inject(LanguageService);
    vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    await service.toggle();
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
