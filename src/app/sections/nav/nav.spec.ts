import { TestBed } from '@angular/core/testing';
import { profile } from '../../data/content';
import { Nav } from './nav';

describe('Nav', () => {
  it('megjeleníti a nevet, a menüpontokat és a LinkedIn gombot', () => {
    const fixture = TestBed.createComponent(Nav);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.mark')?.textContent).toContain(profile.name);
    expect(el.querySelectorAll('nav a').length).toBe(3);
    expect(el.querySelector('a[appButton]')?.getAttribute('href')).toBe(profile.linkedin);
  });
});
