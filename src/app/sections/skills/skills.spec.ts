import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { Skills } from './skills';

describe('Skills', () => {
  it('renders a card for every skill, the featured one wider and with a border', () => {
    const fixture = TestBed.createComponent(Skills);
    fixture.detectChanges();
    const cards = [...fixture.nativeElement.querySelectorAll('app-card')] as HTMLElement[];
    expect(cards.length).toBe(contentHu.skills.length);
    cards.forEach((card, i) => {
      const highlighted = Boolean(contentHu.skills[i].highlight);
      expect(card.classList.contains('wide')).toBe(highlighted);
      expect(card.classList.contains('featured')).toBe(highlighted);
    });
  });

  it('renders every paragraph of the cards as a separate paragraph', () => {
    const fixture = TestBed.createComponent(Skills);
    fixture.detectChanges();
    const cards = [...fixture.nativeElement.querySelectorAll('app-card')] as HTMLElement[];
    cards.forEach((card, i) => {
      const texts = [...card.querySelectorAll('.text')].map((p) => p.textContent);
      expect(texts).toEqual(contentHu.skills[i].paragraphs);
    });
  });

  it('shows the chips below the text, if the card has any', () => {
    const fixture = TestBed.createComponent(Skills);
    fixture.detectChanges();
    const cards = [...fixture.nativeElement.querySelectorAll('app-card')] as HTMLElement[];
    cards.forEach((card, i) => {
      const chips = [...card.querySelectorAll('app-chip-list li')].map((li) =>
        li.textContent?.trim(),
      );
      expect(chips).toEqual(contentHu.skills[i].chips ?? []);
    });
  });
});
