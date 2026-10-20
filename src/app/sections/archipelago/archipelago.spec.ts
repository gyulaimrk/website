import { TestBed } from '@angular/core/testing';
import { skills } from '../../data/content';
import { Archipelago } from './archipelago';

describe('Archipelago', () => {
  it('minden képességhez szigetet rajzol, a kiemelt nagyobb és korall színű', () => {
    const fixture = TestBed.createComponent(Archipelago);
    fixture.detectChanges();
    const islets = [...fixture.nativeElement.querySelectorAll('.islet')] as HTMLElement[];
    expect(islets.length).toBe(skills.length);
    islets.forEach((islet, i) => {
      const highlighted = Boolean(skills[i].highlight);
      expect(islet.classList.contains('big')).toBe(highlighted);
      expect(islet.classList.contains('tone-coral')).toBe(highlighted);
    });
  });
});
