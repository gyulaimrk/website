import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { Education } from './education';

describe('Education', () => {
  function render() {
    const fixture = TestBed.createComponent(Education);
    fixture.detectChanges();
    const cards = [...fixture.nativeElement.querySelectorAll('app-card')] as HTMLElement[];
    return {
      cards,
      titles: (card: HTMLElement) =>
        [...card.querySelectorAll('li strong')].map((e) => e.textContent),
    };
  }

  it('renders three cards: studies, Anthropic certificates, further certificates', () => {
    expect(render().cards.length).toBe(3);
  });

  it('every entry appears on exactly one card', () => {
    const { cards, titles } = render();
    const shown = cards.flatMap(titles);
    expect(shown.sort()).toEqual(contentHu.studies.map((s) => s.title).sort());
  });

  it('the Anthropic card is featured and contains all four Anthropic certificates', () => {
    const { cards, titles } = render();
    expect(cards[1].classList).toContain('featured');
    expect(titles(cards[1])).toEqual(
      contentHu.studies.filter((s) => s.where === 'Anthropic').map((s) => s.title),
    );
    expect(titles(cards[1]).length).toBe(4);
  });

  it('next to the certificates the issuer and the date are shown too', () => {
    const { cards } = render();
    expect(cards[1].textContent).toContain('Anthropic, 2026. március');
  });

  it('where there is no issuer and date, it does not write an empty comma (language exam)', () => {
    const { cards } = render();
    const exam = [...cards[0].querySelectorAll('li')].find((li) => li.textContent?.includes('B2'));
    expect(exam?.querySelector('span')).toBeNull();
    expect(exam?.querySelector('strong')?.textContent).toBe('Angol nyelvvizsga, B2');
    expect(exam?.querySelector('p')?.textContent).toBe('Középfokú, B2 szintű angol nyelvvizsga.');
  });

  it('shows a description for the mentor programme, but not for the other entries', () => {
    const { cards } = render();
    const items = [...cards[0].querySelectorAll('li')];
    const program = items.find((li) => li.textContent?.includes('Java Mentored Education Program'));
    expect(program?.querySelector('p')?.textContent).toContain('Spring');
    const withDescription = items.filter((li) => li.querySelector('p'));
    expect(withDescription.length).toBe(contentHu.studies.filter((s) => s.description).length);
  });

  it('also has a link to the LinkedIn profile’s certificate list', () => {
    const fixture = TestBed.createComponent(Education);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a[appButton]') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe(`${contentHu.profile.linkedin}/details/certifications/`);
    expect(link.textContent).toContain(contentHu.ui.education.allCertificates);
  });
});
