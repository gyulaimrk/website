import { TestBed } from '@angular/core/testing';
import { LanguageService } from '../../core/language.service';
import { contentEn, contentHu } from '../../data/content';
import { About } from './about';

describe('About', () => {
  function render() {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('a levél minden bekezdését és a négy tényt kirajzolja', () => {
    const { el } = render();
    expect(el.querySelectorAll('.story p').length).toBe(contentHu.profile.letter.length);
    expect(el.querySelectorAll('dl > div').length).toBe(4);
    expect(el.querySelector('dl')?.textContent).toContain(contentHu.profile.email);
  });

  it('a cím és a tények feliratai a nyelvet követik', () => {
    const { fixture, el } = render();
    expect(el.querySelector('h2')?.textContent).toBe(contentHu.ui.about.title);
    TestBed.inject(LanguageService).lang.set('en');
    fixture.detectChanges();
    expect(el.querySelector('h2')?.textContent).toBe(contentEn.ui.about.title);
    expect(el.querySelector('dt')?.textContent).toBe(contentEn.ui.about.facts.location);
  });
});
