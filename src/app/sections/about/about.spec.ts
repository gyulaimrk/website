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

  it('renders every paragraph of the letter and the five facts', () => {
    const { el } = render();
    expect(el.querySelectorAll('.story p').length).toBe(contentHu.profile.letter.length);
    expect(el.querySelectorAll('dl > div').length).toBe(5);
    expect(el.querySelector('dl')?.textContent).toContain(contentHu.profile.email);
  });

  it('lists the languages on separate lines', () => {
    const { el } = render();
    const fact = [...el.querySelectorAll('dl > div')].find(
      (div) => div.querySelector('dt')?.textContent === contentHu.ui.about.facts.languages,
    )!;
    expect([...fact.querySelectorAll('dd')].map((dd) => dd.textContent)).toEqual(
      contentHu.profile.languages,
    );
  });

  it('shows the portrait photo with a descriptive caption', () => {
    const { fixture, el } = render();
    const photo = el.querySelector('img.photo') as HTMLImageElement;
    expect(photo.getAttribute('src')).toBe(contentHu.profile.photo.src);
    expect(photo.alt).toBe(contentHu.profile.photo.alt);
    TestBed.inject(LanguageService).use('en');
    fixture.detectChanges();
    expect(photo.alt).toBe(contentEn.profile.photo.alt);
  });

  it('the heading and the labels of the facts follow the language', () => {
    const { fixture, el } = render();
    expect(el.querySelector('h2')?.textContent).toBe(contentHu.ui.about.title);
    TestBed.inject(LanguageService).use('en');
    fixture.detectChanges();
    expect(el.querySelector('h2')?.textContent).toBe(contentEn.ui.about.title);
    expect(el.querySelector('dt')?.textContent).toBe(contentEn.ui.about.facts.location);
  });
});
