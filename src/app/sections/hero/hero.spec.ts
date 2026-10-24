import { TestBed } from '@angular/core/testing';
import { profile, stats } from '../../data/content';
import { Hero } from './hero';

describe('Hero', () => {
  function render() {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    const fixture = TestBed.createComponent(Hero);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }
  afterEach(() => vi.unstubAllGlobals());

  it('egyetlen h1-ben köszön és a nevet mutatja', () => {
    const el = render();
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('h1')?.textContent).toContain(profile.name);
  });

  it('megmutatja a szerepet, a kódablakot és a statisztikákat', () => {
    const el = render();
    expect(el.querySelector('app-typewriter')?.textContent).toContain(profile.roles[0]);
    expect(el.querySelector('app-code-window code')?.textContent).toContain(profile.role);
    expect(el.querySelectorAll('.stats li').length).toBe(stats.length);
  });

  it('a Munkáim gomb a tapasztalathoz, a LinkedIn gomb a profilra visz', () => {
    const hrefs = [...render().querySelectorAll('a[appButton]')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['#tapasztalat', profile.linkedin]);
  });
});
