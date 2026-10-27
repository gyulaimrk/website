import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { RootRedirect } from './root-redirect';

describe('RootRedirect', () => {
  let navigate: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
  });

  it('contains links to both languages for visitors without scripting', () => {
    const fixture = TestBed.createComponent(RootRedirect);
    fixture.detectChanges();
    const hrefs = [...fixture.nativeElement.querySelectorAll('a')].map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toEqual(['/hu', '/en']);
  });

  it('after the first render it navigates to the visitor’s language, without history', () => {
    localStorage.setItem('lang', 'en');
    TestBed.createComponent(RootRedirect).detectChanges();
    TestBed.tick();
    expect(navigate).toHaveBeenCalledWith('/en', expect.objectContaining({ replaceUrl: true }));
    expect(TestBed.inject(LanguageService).preferred()).toBe('en');
  });
});
