import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { LanguageService } from './core/language.service';
import { routes } from './app.routes';

describe('útvonalak', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });
  afterEach(() => vi.unstubAllGlobals());

  async function open(url: string) {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(url);
    harness.detectChanges();
    return harness.routeNativeElement as HTMLElement;
  }

  it('a /hu a magyar portfóliót mutatja', async () => {
    const el = await open('/hu');
    expect(el.querySelector('h1')?.textContent).toContain('Gyulai Márk');
    expect(TestBed.inject(LanguageService).lang()).toBe('hu');
    expect(document.documentElement.lang).toBe('hu');
  });

  it('az /en az angol portfóliót mutatja, a név sorrendje is az angolé', async () => {
    const el = await open('/en');
    expect(el.querySelector('h1')?.textContent).toContain('Márk Gyulai');
    expect(TestBed.inject(LanguageService).lang()).toBe('en');
  });

  it('nyelvváltáskor ugyanaz az oldalpéldány marad, csak a tartalma változik', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/hu');
    harness.detectChanges();
    const page =
      harness.routeNativeElement?.querySelector('app-portfolio-page') ?? harness.routeNativeElement;
    await harness.navigateByUrl('/en');
    harness.detectChanges();
    const after =
      harness.routeNativeElement?.querySelector('app-portfolio-page') ?? harness.routeNativeElement;
    expect(after).toBe(page);
    expect(TestBed.inject(LanguageService).lang()).toBe('en');
  });

  it('ismeretlen cím 404-es oldalt ad, nem irányít át', async () => {
    const el = await open('/valami');
    expect(el.textContent).toContain('404');
  });

  it('a gyökércím a látogató nyelvére viszi', async () => {
    localStorage.setItem('lang', 'en');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/');
    harness.detectChanges();
    TestBed.tick();
    await harness.fixture.whenStable();
    expect(TestBed.inject(LanguageService).lang()).toBe('en');
  });
});
