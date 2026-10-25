import { TestBed } from '@angular/core/testing';
import { contentHu } from '../../data/content';
import { Skills } from './skills';

describe('Skills', () => {
  it('minden képességhez kártyát rajzol, a kiemeltet szélesebben és keretesen', () => {
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

  it('a kártyák minden bekezdését külön bekezdésként kirajzolja', () => {
    const fixture = TestBed.createComponent(Skills);
    fixture.detectChanges();
    const cards = [...fixture.nativeElement.querySelectorAll('app-card')] as HTMLElement[];
    cards.forEach((card, i) => {
      const texts = [...card.querySelectorAll('.text')].map((p) => p.textContent);
      expect(texts).toEqual(contentHu.skills[i].paragraphs);
    });
  });
});
