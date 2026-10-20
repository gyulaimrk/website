import { TestBed } from '@angular/core/testing';
import { profile } from '../../data/content';
import { Hero } from './hero';

describe('Hero', () => {
  it('egyetlen h1 a profil címe, és a Java és a Kotlin szigete látszik', () => {
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toBe(profile.headline);
    expect(el.querySelectorAll('app-island').length).toBe(2);
  });

  it('az elsődleges gomb a LinkedInre vezet', () => {
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a[appButton]').getAttribute('href')).toBe(
      profile.linkedin,
    );
  });
});
