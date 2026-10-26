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

  it('greets in a single h1 and shows the name', () => {
    const { el } = render();
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toContain(contentHu.profile.name);
    expect(el.querySelector('.greeting')?.textContent).toBe(contentHu.ui.hero.greeting);
  });

  it('the screen reader gets the typewriter roles as a full list, the animated part is hidden', () => {
    const { el } = render();
    expect(el.querySelector('.role .sr-only')?.textContent).toBe(
      contentHu.profile.roles.join(', '),
    );
    expect(el.querySelector('.role [aria-hidden="true"] app-typewriter')).not.toBeNull();
  });

  it('shows the role and the statistics', () => {
    const { el } = render();
    expect(el.querySelector('app-typewriter')?.textContent).toContain(contentHu.profile.roles[0]);
    expect(el.querySelectorAll('.stats li').length).toBe(contentHu.stats.length);
  });

  it('the code window has two tabs, by default Main.kt: the instance built from the profile', () => {
    const { el } = render();
    const tabs = [...el.querySelectorAll('[role="tab"]')] as HTMLButtonElement[];
    expect(tabs.map((t) => t.textContent?.trim())).toEqual(['Main.kt', 'Developer.kt']);
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    const code = el.querySelector('app-code-window code')?.textContent ?? '';
    expect(code).toContain(`name = "${contentHu.profile.name}"`);
    contentHu.profile.roleConstants.forEach((constant) =>
      expect(code).toContain(`Role.${constant}`),
    );
    contentHu.profile.stack.forEach((item) => expect(code).toContain(`"${item}"`));
  });

  it('the second tab is the Developer data class', () => {
    const { fixture, el } = render();
    (el.querySelectorAll('[role="tab"]')[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(el.querySelector('app-code-window code')?.textContent).toContain(
      'data class Developer(',
    );
  });

  it('the My work button leads to the experience, the résumé button to the PDF, the LinkedIn button to the profile', () => {
    const hrefs = [...render().el.querySelectorAll('a[appButton]')].map((a) =>
      a.getAttribute('href'),
    );
    expect(hrefs).toEqual(['/hu#tapasztalat', contentHu.profile.cv, contentHu.profile.linkedin]);
  });

  it('switches to English on a language switch', () => {
    const { fixture, el } = render();
    TestBed.inject(LanguageService).use('en');
    fixture.detectChanges();
    expect(el.querySelector('.greeting')?.textContent).toBe(contentEn.ui.hero.greeting);
    expect(el.querySelector('h1')?.textContent).toContain(contentEn.profile.name);
  });
});
