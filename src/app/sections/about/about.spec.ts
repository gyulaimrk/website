import { TestBed } from '@angular/core/testing';
import { profile } from '../../data/content';
import { About } from './about';

describe('About', () => {
  it('a levél minden bekezdését és a négy tényt kirajzolja', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.story p').length).toBe(profile.letter.length);
    expect(el.querySelectorAll('dl > div').length).toBe(4);
    expect(el.querySelector('dl')?.textContent).toContain(profile.email);
  });
});
