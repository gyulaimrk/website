import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { contentEn, contentHu } from '../../data/content';
import { PortfolioPage } from './portfolio-page';

describe('PortfolioPage', () => {
  beforeEach(() => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
  });
  afterEach(() => vi.unstubAllGlobals());

  function render() {
    const fixture = TestBed.createComponent(PortfolioPage);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('builds every section of the page', () => {
    const { el } = render();
    [
      'app-nav',
      'app-hero',
      'app-about',
      'app-skills',
      'app-ai-workflow',
      'app-experience',
      'app-side-projects',
      'app-education',
      'app-contact',
      'app-footer',
      'app-back-to-top',
    ].forEach((selector) => expect(el.querySelector(selector), selector).not.toBeNull());
    expect(el.querySelectorAll('h1').length).toBe(1);
  });

  it('puts the experience between the about and the skills sections, as the menu lists them', () => {
    const { el } = render();
    const order = [...el.querySelectorAll('main > *')].map((section) =>
      section.tagName.toLowerCase(),
    );
    expect(order).toEqual([
      'app-hero',
      'app-about',
      'app-experience',
      'app-skills',
      'app-ai-workflow',
      'app-side-projects',
      'app-education',
      'app-contact',
    ]);
    const fragments = contentHu.ui.nav.links.map((link) => link.fragment);
    expect(fragments).toEqual([
      'rolam',
      'tapasztalat',
      'eszkoztar',
      'ai',
      'mellekprojektek',
      'tanulmanyok',
    ]);
  });

  it('has a skip-to-content link, and main is its target', () => {
    const { el } = render();
    expect(el.querySelector('.skip')?.getAttribute('href')).toBe('/hu#main');
    expect(el.querySelector('main')?.id).toBe('main');
  });

  it('the title changes together with the language', () => {
    const { fixture } = render();
    TestBed.tick();
    expect(TestBed.inject(Title).getTitle()).toBe(contentHu.ui.meta.title);
    TestBed.inject(LanguageService).use('en');
    fixture.detectChanges();
    TestBed.tick();
    expect(TestBed.inject(Title).getTitle()).toBe(contentEn.ui.meta.title);
  });
});
