import { TestBed } from '@angular/core/testing';
import { profile } from '../../data/content';
import { About } from './about';

describe('About', () => {
  it('kirajzolja a levél minden bekezdését és az e-mail címet', () => {
    const fixture = TestBed.createComponent(About);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('.paragraph').length).toBe(profile.letter.length);
    expect(el.querySelector('.stub')?.textContent).toContain(profile.email);
  });
});
