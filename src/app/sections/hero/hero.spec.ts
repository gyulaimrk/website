import { TestBed } from '@angular/core/testing';
import { LanguageService } from '../../core/language.service';
import { contentEn, contentHu } from '../../data/content';
import { Hero } from './hero';

describe('Hero', () => {
  beforeEach(() => vi.stubGlobal('matchMedia', () => ({ matches: true })));
  afterEach(() => vi.unstubAllGlobals());

  function render() {
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('egyetlen h1-ben köszön és a nevet mutatja', () => {
    const { el } = render();
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toContain(contentHu.profile.name);
    expect(el.querySelector('.greeting')?.textContent).toBe(contentHu.ui.hero.greeting);
  });

  it('megmutatja a szerepet, a kódablakot és a statisztikákat', () => {
    const { el } = render();
    expect(el.querySelector('app-typewriter')?.textContent).toContain(contentHu.profile.roles[0]);
    expect(el.querySelector('app-code-window code')?.textContent).toContain(contentHu.profile.role);
    expect(el.querySelectorAll('.stats li').length).toBe(contentHu.stats.length);
  });

  it('a Munkáim gomb a tapasztalathoz, a LinkedIn gomb a profilra visz', () => {
    const hrefs = [...render().el.querySelectorAll('a[appButton]')].map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toEqual(['#tapasztalat', contentHu.profile.linkedin]);
  });

  it('nyelvváltáskor angolra vált', () => {
    const { fixture, el } = render();
    TestBed.inject(LanguageService).lang.set('en');
    fixture.detectChanges();
    expect(el.querySelector('.greeting')?.textContent).toBe(contentEn.ui.hero.greeting);
    expect(el.querySelector('h1')?.textContent).toContain(contentEn.profile.name);
  });
});
