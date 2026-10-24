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
    expect(exam?.textContent?.trim()).toBe('Angol nyelvvizsga, B2');
  });
});
