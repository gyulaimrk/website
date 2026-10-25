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

  it('három kártyát rajzol: tanulmányok, Anthropic-tanúsítványok, további tanúsítványok', () => {
    expect(render().cards.length).toBe(3);
  });

  it('minden bejegyzés pontosan egy kártyán jelenik meg', () => {
    const { cards, titles } = render();
    const shown = cards.flatMap(titles);
    expect(shown.sort()).toEqual(contentHu.studies.map((s) => s.title).sort());
  });

  it('az Anthropic-kártya kiemelt, és mind a négy Anthropic-tanúsítványt tartalmazza', () => {
    const { cards, titles } = render();
    expect(cards[1].classList).toContain('featured');
    expect(titles(cards[1])).toEqual(
      contentHu.studies.filter((s) => s.where === 'Anthropic').map((s) => s.title),
    );
    expect(titles(cards[1]).length).toBe(4);
  });

  it('a tanúsítványok mellett a kiállító és a dátum is látszik', () => {
    const { cards } = render();
    expect(cards[1].textContent).toContain('Anthropic, 2026. március');
  });

  it('ahol nincs kiállító és dátum, ott nem ír üres vesszőt (nyelvvizsga)', () => {
    const { cards } = render();
    const exam = [...cards[0].querySelectorAll('li')].find((li) => li.textContent?.includes('B2'));
    expect(exam?.querySelector('span')).toBeNull();
    expect(exam?.querySelector('strong')?.textContent).toBe('Angol nyelvvizsga, B2');
    expect(exam?.querySelector('p')?.textContent).toBe('Középfokú, B2 szintű angol nyelvvizsga.');
  });

  it('a mentorprogramnál leírást is mutat, a többi bejegyzésnél nem', () => {
    const { cards } = render();
    const items = [...cards[0].querySelectorAll('li')];
    const program = items.find((li) => li.textContent?.includes('Java Mentored Education Program'));
    expect(program?.querySelector('p')?.textContent).toContain('Spring');
    const withDescription = items.filter((li) => li.querySelector('p'));
    expect(withDescription.length).toBe(contentHu.studies.filter((s) => s.description).length);
  });

  it('a LinkedIn-profil tanúsítványlistájára is mutat egy link', () => {
    const fixture = TestBed.createComponent(Education);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a[appButton]') as HTMLAnchorElement;
    expect(link.getAttribute('href')).toBe(`${contentHu.profile.linkedin}/details/certifications/`);
    expect(link.textContent).toContain(contentHu.ui.education.allCertificates);
  });
});
