import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { contentHu } from './data/content';
import { App } from './app';

describe('App', () => {
  beforeEach(() => vi.stubGlobal('matchMedia', () => ({ matches: true })));
  afterEach(() => vi.unstubAllGlobals());

  function render() {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('az oldal minden szekcióját felépíti', () => {
    const el = render();
    [
      'app-nav',
      'app-hero',
      'app-about',
      'app-skills',
      'app-experience',
      'app-side-projects',
      'app-education',
      'app-contact',
      'app-footer',
      'app-back-to-top',
    ].forEach((selector) => expect(el.querySelector(selector), selector).not.toBeNull());
    expect(el.querySelectorAll('h1').length).toBe(1);
  });

  it('van tartalomra ugró link, és a main a célja', () => {
    const el = render();
    expect(el.querySelector('.skip')?.getAttribute('href')).toBe('#main');
    expect(el.querySelector('main')?.id).toBe('main');
  });

  it('beállítja az oldal címét', () => {
    render();
    TestBed.tick();
    expect(TestBed.inject(Title).getTitle()).toBe(contentHu.ui.meta.title);
  });
});
