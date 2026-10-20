import { TestBed } from '@angular/core/testing';
import { profile } from '../../data/content';
import { Hero } from './hero';

describe('Hero', () => {
  it('egyetlen h1-ben a nevet és a szakmát mutatja, és van elsődleges gomb', () => {
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const h1 = el.querySelectorAll('h1');
    expect(h1.length).toBe(1);
    expect(h1[0].textContent).toBe('Gyulai Márk, senior Java fejlesztő');
    expect(el.querySelector('a[appButton]')?.getAttribute('href')).toBe(profile.linkedin);
  });
});
