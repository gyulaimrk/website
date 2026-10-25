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

  it('megmutatja a szerepet és a statisztikákat', () => {
    const { el } = render();
    expect(el.querySelector('app-typewriter')?.textContent).toContain(contentHu.profile.roles[0]);
    expect(el.querySelectorAll('.stats li').length).toBe(contentHu.stats.length);
  });

  it('a kódablakban két fül van: a Developer data class és a belőle épített példány', () => {
    const { fixture, el } = render();
    const tabs = () => [...el.querySelectorAll('[role="tab"]')] as HTMLButtonElement[];
    expect(tabs().map((t) => t.textContent?.trim())).toEqual(['Developer.kt', 'Main.kt']);
    expect(el.querySelector('app-code-window code')?.textContent).toContain(
      'data class Developer(',
    );

    tabs()[1].click();
    fixture.detectChanges();
    const code = el.querySelector('app-code-window code')?.textContent ?? '';
    expect(code).toContain(`name = "${contentHu.profile.name}"`);
    expect(code).toContain(`role = "${contentHu.profile.role}"`);
    contentHu.profile.stack.forEach((item) => expect(code).toContain(`"${item}"`));
  });

  it('a Munkáim gomb a tapasztalathoz, az önéletrajz gomb a PDF-re, a LinkedIn gomb a profilra visz', () => {
    const hrefs = [...render().el.querySelectorAll('a[appButton]')].map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toEqual(['#tapasztalat', contentHu.profile.cv, contentHu.profile.linkedin]);
  });

  it('nyelvváltáskor angolra vált', () => {
    const { fixture, el } = render();
    TestBed.inject(LanguageService).use('en');
    fixture.detectChanges();
    expect(el.querySelector('.greeting')?.textContent).toBe(contentEn.ui.hero.greeting);
    expect(el.querySelector('h1')?.textContent).toContain(contentEn.profile.name);
  });
});
