import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  it('az oldal minden szekcióját felépíti', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    [
      'app-nav',
      'app-hero',
      'app-about',
      'app-skills',
      'app-experience',
      'app-education',
      'app-contact',
      'app-footer',
    ].forEach((selector) => expect(el.querySelector(selector), selector).not.toBeNull());
    expect(el.querySelectorAll('h1').length).toBe(1);
    vi.unstubAllGlobals();
  });
});
