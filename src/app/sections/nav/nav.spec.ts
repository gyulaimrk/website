import { TestBed } from '@angular/core/testing';
import { profile } from '../../data/content';
import { Nav } from './nav';

describe('Nav', () => {
  it('a monogramot, a nevet, a menüpontokat és a kapcsolat gombot mutatja', () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    const fixture = TestBed.createComponent(Nav);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.logo')?.textContent).toBe('GM');
    expect(el.querySelector('.name')?.textContent).toBe(profile.name);
    expect(el.querySelectorAll('nav a').length).toBe(4);
    expect(el.querySelector('a[appButton]')?.getAttribute('href')).toBe('#kapcsolat');
    vi.unstubAllGlobals();
  });
});
