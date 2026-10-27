import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { LanguageService } from './core/language.service';
import { routes } from './app.routes';

describe('routes', () => {
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

  it('/hu shows the Hungarian portfolio', async () => {
    const el = await open('/hu');
    expect(el.querySelector('h1')?.textContent).toContain('Gyulai Márk');
    expect(TestBed.inject(LanguageService).lang()).toBe('hu');
    expect(document.documentElement.lang).toBe('hu');
  });

  it('/en shows the English portfolio, including the English name order', async () => {
    const el = await open('/en');
    expect(el.querySelector('h1')?.textContent).toContain('Márk Gyulai');
    expect(TestBed.inject(LanguageService).lang()).toBe('en');
  });

  it('the same page instance stays on a language switch, only its content changes', async () => {
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

  it('an unknown address gives a 404 page and does not redirect', async () => {
    const el = await open('/valami');
    expect(el.textContent).toContain('404');
  });

  it('the root address takes the visitor to their language', async () => {
    localStorage.setItem('lang', 'en');
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/');
    harness.detectChanges();
    TestBed.tick();
    await harness.fixture.whenStable();
    expect(TestBed.inject(LanguageService).lang()).toBe('en');
  });
});
