import { TestBed } from '@angular/core/testing';
import { profile } from '../../data/content';
import { Footer } from './footer';

describe('Footer', () => {
  it('az elérhetőségeket és az aktuális évet mutatja', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const hrefs = [...el.querySelectorAll('address a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([profile.linkedin, `mailto:${profile.email}`, profile.github]);
    expect(el.querySelector('.imprint')?.textContent).toContain(String(new Date().getFullYear()));
  });
});
