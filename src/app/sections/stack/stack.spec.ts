import { TestBed } from '@angular/core/testing';
import { skills } from '../../data/content';
import { Stack } from './stack';

describe('Stack', () => {
  it('minden képességhez kártyát rajzol, az elsőt teljes szélességben', () => {
    const fixture = TestBed.createComponent(Stack);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll(
      'app-skill-card',
    ) as NodeListOf<HTMLElement>;
    expect(cards.length).toBe(skills.length);
    expect(cards[0].classList).toContain('wide');
  });
});
