import { TestBed } from '@angular/core/testing';
import { profile, studies } from '../../data/content';
import { About } from './about';

describe('About', () => {
  it('a levél minden bekezdését és az összes tanulmányt kirajzolja', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.letter > p').length).toBe(profile.letter.length);
    expect(el.querySelectorAll('.studies li').length).toBe(studies.length);
  });
});
