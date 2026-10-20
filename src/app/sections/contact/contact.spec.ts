import { TestBed } from '@angular/core/testing';
import { profile } from '../../data/content';
import { Contact } from './contact';

describe('Contact', () => {
  it('e-mail és LinkedIn elérhetőséget ad', () => {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('p a')?.getAttribute('href')).toBe(`mailto:${profile.email}`);
    expect(el.querySelector('a[appButton]')?.getAttribute('href')).toBe(profile.linkedin);
  });
});
