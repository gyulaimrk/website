import { TestBed } from '@angular/core/testing';
import { studies } from '../../data/content';
import { Education } from './education';

describe('Education', () => {
  it('a tanulmányokat és a tanúsítványokat külön kártyán, hiánytalanul listázza', () => {
    const fixture = TestBed.createComponent(Education);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('app-card') as NodeListOf<HTMLElement>;
    expect(cards.length).toBe(2);
    const counts = [...cards].map((c) => c.querySelectorAll('li').length);
    expect(counts[0] + counts[1]).toBe(studies.length);
    expect(counts[0]).toBe(studies.filter((s) => s.kind === 'education').length);
  });
});
