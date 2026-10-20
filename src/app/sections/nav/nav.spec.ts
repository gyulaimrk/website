import { TestBed } from '@angular/core/testing';
import { profile } from '../../data/content';
import { Nav } from './nav';

describe('Nav', () => {
  it('a nevet és a négy menüpontot mutatja', () => {
    const fixture = TestBed.createComponent(Nav);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.mark')?.textContent).toBe(profile.name);
    expect(el.querySelectorAll('nav a').length).toBe(4);
  });
});
